import os
import re
import json
import logging
from mcp.server.fastmcp import FastMCP

# Setup paths
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY_PATH = os.path.join(ROOT_DIR, "data", "test_registry.js")
TESTS_DIR = os.path.join(ROOT_DIR, "data", "tests")

# Initialize MCP Server
mcp = FastMCP("Deep Psy Engine")
logger = logging.getLogger(__name__)

# --- Logic Port: Psychometric Evaluators ---

def extract_json_from_js(content: str) -> dict:
    """
    Extracts the test data object from a .js file by converting 
    the JS object literal to valid JSON.
    """
    try:
        # Find the object passed to Object.assign(..., { ... })
        match = re.search(r"Object\.assign\([\s\S]*?,\s*(\{[\s\S]*\})\s*\);", content)
        if not match:
            # Fallback: find the first { and last }
            match = re.search(r"(\{[\s\S]*\})", content)
            
        if not match:
            return None
            
        js_obj = match.group(1)
        
        # 1. Clean comments
        js_obj = re.sub(r"//.*$", "", js_obj, flags=re.MULTILINE)
        
        # 2. Quote unquoted keys (e.g., id: -> "id":)
        # Handles keys like selfesteem: and "selfesteem":
        js_obj = re.sub(r'(\s+)([a-zA-Z0-9_]+):', r'\1"\2":', js_obj)
        
        # 3. Handle single quotes for strings (riskier but needed for JS)
        # We only replace quotes that are at the start/end of a value
        js_obj = re.sub(r":\s*'([^']*)'", r': "\1"', js_obj)
        js_obj = re.sub(r"'\s*([,}])", r'"\1', js_obj)
        
        # 4. Remove trailing commas
        js_obj = re.sub(r",\s*([\]}])", r"\1", js_obj)
        
        return json.loads(js_obj)
    except Exception as e:
        logger.error(f"Failed to parse JS to JSON: {str(e)}")
        return None

def evaluate_sum_single_scale(answers, test_data):
    """Implementation of window.DEEP_EVALUATORS.sum_single_scale"""
    total = sum(answers.values())
    scales = test_data.get('scales', {})
    
    # Check if scales is a dict (v15.1 format) or list (old format)
    interpretation = "No interpretation found."
    
    if isinstance(scales, dict):
        # New format: scales: { selfesteem: { ranges: [...] } }
        for scale_id, scale_data in scales.items():
            ranges = scale_data.get('ranges', [])
            for res in sorted(ranges, key=lambda x: x.get('min', 0), reverse=True):
                if total >= res.get('min', 0):
                    interpretation = res.get('label', interpretation)
                    break
            break # Only handle first scale for now
    elif isinstance(scales, list) and len(scales) > 0:
        results = scales[0].get('results', [])
        for res in sorted(results, key=lambda x: x.get('min', 0), reverse=True):
            if total >= res.get('min', 0):
                interpretation = res.get('text', interpretation)
                break
                
    return {
        "score": total,
        "interpretation": interpretation,
        "max_possible": len(test_data.get('questions', [])) * 3 # Assuming 0-3 Likert for Rosenberg
    }

# --- Tools ---

@mcp.tool()
def list_tests() -> str:
    """Get the full list of available psychological tests and their metadata."""
    try:
        with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
            content = f.read()
            # Extract categories and test IDs
            # Broadest possible regex for debugging
            all_ids = re.findall(r'id\s*:\s*[\'"]([^\'"]+)[\'"]', content)
            # Filter out categoryId matches
            tests = [i for i in all_ids if i not in ["personality", "mental_functions", "adaptation", "psychiatry", "relationships", "career", "team", "organization", "psychoanalytic", "therapy_efficacy"]]
            
            categories = re.findall(r'categoryTitle\s*:\s*[\'"]([^\'"]+)[\'"]', content)
            
            return json.dumps({
                "status": "success",
                "tests_found": list(set(tests)),
                "categories": list(set(categories)),
                "registry_path": REGISTRY_PATH
            }, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Error: {str(e)}"

@mcp.tool()
def get_test_details(test_id: str) -> str:
    """Read the full content of a test file including questions and scoring scales."""
    test_file = os.path.join(TESTS_DIR, f"{test_id}.js")
    if not os.path.exists(test_file):
        test_file = os.path.join(ROOT_DIR, "data", f"{test_id}.js")
    
    if not os.path.exists(test_file):
        return f"Test '{test_id}' not found."

    with open(test_file, "r", encoding="utf-8") as f:
        return f.read()

@mcp.tool()
def calculate_results(test_id: str, answers_json: str) -> str:
    """
    Calculate psychometric results for a specific test. 
    answers_json: A JSON string mapping question IDs to numeric values.
    """
    try:
        answers = json.loads(answers_json)
        # Load test data to get scales
        test_js_content = get_test_details(test_id)
        
        test_data = extract_json_from_js(test_js_content)
        
        if not test_data:
            return f"Error: Could not parse test data for '{test_id}'."
        
        # Basic Sum Evaluator
        result = evaluate_sum_single_scale(answers, test_data)
        
        return json.dumps({
            "test_id": test_id,
            "calculated_at": "MCP Server (Static Parser)",
            "results": result
        }, indent=2, ensure_ascii=False)
        
    except Exception as e:
        return f"Calculation error: {str(e)}"

# --- Resources ---

@mcp.resource("file://registry")
def get_registry_resource():
    """Access the master test registry as a resource."""
    with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
        return f.read()

# --- Prompts ---

@mcp.prompt()
def analyze_test_logic(test_id: str):
    """Generate a prompt to analyze if a test's scoring logic is mathematically consistent."""
    return f"Please read the details for test '{test_id}' using get_test_details and analyze if the scoring scales cover all possible point ranges without gaps."

if __name__ == "__main__":
    mcp.run()
