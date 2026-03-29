import subprocess
import sys
import os

def install_and_import(package):
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install_and_import('reportlab')

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

# 16:9 Presentation size
WIDTH, HEIGHT = 960, 540

def draw_background(c):
    # Dark background
    c.setFillColor(HexColor("#1A1A1A"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Accent bar at the bottom
    c.setFillColor(HexColor("#E8D6B3"))
    c.rect(0, 0, WIDTH, 10, fill=1, stroke=0)
    
def draw_title_slide(c):
    draw_background(c)
    
    # Title
    c.setFillColor(HexColor("#E8D6B3"))
    c.setFont("Helvetica-Bold", 48)
    c.drawCentredString(WIDTH/2, HEIGHT/2 + 40, "DEEP PSY TESTS")
    
    # Subtitle
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica", 24)
    c.drawCentredString(WIDTH/2, HEIGHT/2 - 20, "Professional Psychometric System")
    
    # Version
    c.setFillColor(HexColor("#AAAAAA"))
    c.setFont("Helvetica", 16)
    c.drawCentredString(WIDTH/2, HEIGHT/2 - 80, "v16 (Modular Architecture + Design System v4.1)")
    
    c.showPage()

def draw_overview_slide(c):
    draw_background(c)
    
    c.setFillColor(HexColor("#E8D6B3"))
    c.setFont("Helvetica-Bold", 36)
    c.drawString(60, HEIGHT - 80, "Project Overview")
    
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica", 20)
    
    lines = [
        "What is DEEP PSY TESTS?",
        "",
        "A lead generation psychometric system designed for DEEP.",
        "It functions seamlessly on Tilda via GitHub Pages.",
        "",
        "Key Features:",
        "- Optimized for simple embedding in Tilda and Webflow",
        "- Provides a premium UX / UI experience",
        "- High performance with lazy loading of tests",
        "- Consists of 80+ psychological tests across 10 categories"
    ]
    
    y = HEIGHT - 140
    for line in lines:
        if line.startswith("Key Features:") or line.startswith("What is DEEP PSY TESTS?"):
            c.setFont("Helvetica-Bold", 20)
        elif line.startswith("-"):
            c.setFont("Helvetica", 18)
        else:
            c.setFont("Helvetica", 20)
        c.drawString(60, y, line)
        y -= 30
    
    c.showPage()

def draw_architecture_slide(c):
    draw_background(c)
    
    c.setFillColor(HexColor("#E8D6B3"))
    c.setFont("Helvetica-Bold", 36)
    c.drawString(60, HEIGHT - 80, "Modular Architecture")
    
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica", 18)
    
    lines_left = [
        "The system consists of 10 clear JS modules:",
        "",
        "1. Templates: HTML structures, SVG icons, colors",
        "2. UI Controller: Orchestrator, shell, modal logic",
        "3. Nav Controller: Sidebar, accordion menus",
        "4. Grid Controller: Content rendering (tests, categories)",
        "5. Router: URL routing and states",
        "6. Quiz Core: Session and answers management",
        "7. Results (Engine): Score calculation and parsing",
        "8. Engine: Main bootstrap and globals",
        "9. Sidebar: Results history display",
        "10. Integrations: Webhooks for CRM and Telegram"
    ]
    
    y = HEIGHT - 140
    for line in lines_left:
        c.drawString(60, y, line)
        y -= 25
        
    c.showPage()

def draw_backend_slide(c):
    draw_background(c)
    
    c.setFillColor(HexColor("#E8D6B3"))
    c.setFont("Helvetica-Bold", 36)
    c.drawString(60, HEIGHT - 80, "MCP Server (Backend)")
    
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica", 20)
    
    lines = [
        "The Python-based MCP Server provides powerful backend integrations.",
        "",
        "Key Modules:",
        "- Analytics & Behavior Detection",
        "- Test Validations & Registration",
        "- Combined Reports & Secure Scoring",
        "- PDF/Excel Export mechanisms",
        "- Telegram notifications & CRM Integration",
        "",
        "The server is structured via 'mcp-server/modules/' to",
        "ensure scalability and future-proofing."
    ]
    
    y = HEIGHT - 140
    for line in lines:
        c.drawString(60, y, line)
        y -= 30
        
    c.showPage()

def draw_next_steps_slide(c):
    draw_background(c)
    
    c.setFillColor(HexColor("#E8D6B3"))
    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(WIDTH/2, HEIGHT/2 + 40, "Thank You!")
    
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica", 20)
    c.drawCentredString(WIDTH/2, HEIGHT/2 - 20, "DEEP Psychometric System")
    
    c.showPage()

def main():
    output_filename = "Deep_Psy_Tests_Presentation.pdf"
    output_path = os.path.join(os.getcwd(), output_filename)
    
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    draw_title_slide(c)
    draw_overview_slide(c)
    draw_architecture_slide(c)
    draw_backend_slide(c)
    draw_next_steps_slide(c)
    
    c.save()
    print(f"Presentation generated at: {output_path}")

if __name__ == "__main__":
    main()
