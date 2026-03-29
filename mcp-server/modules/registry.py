# ═══════════════════════════════════════════
#  Модуль 1: РЕЕСТР ТЕСТОВ (Registry)
#  Парсинг JS-файлов реестра и отдельных тестов.
#  Статус: ✅ РАБОТАЕТ
# ═══════════════════════════════════════════

import os
import re
import json
import logging

from config import REGISTRY_PATH, TESTS_DIR

logger = logging.getLogger(__name__)


def extract_json_from_js(content: str) -> dict | None:
    """
    Извлекает объект данных теста из .js файла,
    конвертируя JS-литерал в валидный JSON.
    """
    try:
        # Ищем объект внутри Object.assign(..., { ... })
        match = re.search(r"Object\.assign\([\s\S]*?,\s*(\{[\s\S]*\})\s*\);", content)
        if not match:
            match = re.search(r"(\{[\s\S]*\})", content)
        if not match:
            return None

        js_obj = match.group(1)

        # Очистка комментариев
        js_obj = re.sub(r"//.*$", "", js_obj, flags=re.MULTILINE)
        # Кавычки для ключей
        js_obj = re.sub(r'(\s+)([a-zA-Z0-9_]+):', r'\1"\2":', js_obj)
        # Одинарные кавычки → двойные
        js_obj = re.sub(r":\s*'([^']*)'", r': "\1"', js_obj)
        js_obj = re.sub(r"'\s*([,}])", r'"\1', js_obj)
        # Trailing commas
        js_obj = re.sub(r",\s*([\]}])", r"\1", js_obj)

        return json.loads(js_obj)
    except Exception as e:
        logger.error(f"Ошибка парсинга JS → JSON: {e}")
        return None


def list_all_tests() -> dict:
    """Возвращает список всех тестов и категорий из реестра."""
    try:
        with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        all_ids = re.findall(r'id\s*:\s*[\'"]([^\'"]+)[\'"]', content)
        category_ids = {
            "personality", "mental_functions", "adaptation", "psychiatry",
            "relationships", "career", "team", "organization",
            "psychoanalytic", "therapy_efficacy"
        }
        tests = [i for i in all_ids if i not in category_ids]
        categories = re.findall(r'categoryTitle\s*:\s*[\'"]([^\'"]+)[\'"]', content)

        return {
            "status": "success",
            "tests_found": list(set(tests)),
            "total_count": len(set(tests)),
            "categories": list(set(categories)),
            "registry_path": REGISTRY_PATH
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_test_file_content(test_id: str) -> str | None:
    """Читает содержимое JS-файла конкретного теста."""
    test_file = os.path.join(TESTS_DIR, f"{test_id}.js")
    if not os.path.exists(test_file):
        test_file = os.path.join(os.path.dirname(TESTS_DIR), f"{test_id}.js")
    if not os.path.exists(test_file):
        return None

    with open(test_file, "r", encoding="utf-8") as f:
        return f.read()


def get_test_data(test_id: str) -> dict | None:
    """Читает и парсит данные теста в Python-словарь."""
    content = get_test_file_content(test_id)
    if not content:
        return None
    return extract_json_from_js(content)


def get_available_test_files() -> list[str]:
    """Возвращает список ID тестов, для которых есть файлы данных."""
    if not os.path.isdir(TESTS_DIR):
        return []
    return [
        f.replace(".js", "")
        for f in os.listdir(TESTS_DIR)
        if f.endswith(".js")
    ]


def search_tests(query: str, category: str = "") -> dict:
    """
    Ищет тесты по ключевому слову в названии, описании или категории.

    Args:
        query: Поисковая строка (например, "депрессия", "anxiety", "Big Five").
        category: Фильтр по категории (опционально).

    Returns:
        Список тестов, соответствующих запросу.
    """
    try:
        with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        return {"status": "error", "message": str(e)}

    query_lower = query.lower()
    category_lower = category.lower() if category else ""

    # Извлекаем блоки тестов из реестра
    # Ищем паттерн id: "...", title: "..."
    test_blocks = re.findall(
        r'(?:id\s*:\s*[\'"]([^\'"]+)[\'"]'
        r'[\s\S]*?title\s*:\s*[\'"]([^\'"]+)[\'"]'
        r'(?:[\s\S]*?description\s*:\s*[\'"]([^\'"]*)[\'"])?'
        r'(?:[\s\S]*?categoryTitle\s*:\s*[\'"]([^\'"]*)[\'"])?)',
        content
    )

    results = []
    seen = set()
    category_ids = {
        "personality", "mental_functions", "adaptation", "psychiatry",
        "relationships", "career", "team", "organization",
        "psychoanalytic", "therapy_efficacy"
    }

    for match in test_blocks:
        tid = match[0]
        title = match[1] if len(match) > 1 else ""
        desc = match[2] if len(match) > 2 else ""
        cat = match[3] if len(match) > 3 else ""

        if tid in category_ids or tid in seen:
            continue

        # Проверяем совпадение с запросом
        searchable = f"{tid} {title} {desc} {cat}".lower()
        if query_lower not in searchable:
            continue

        # Фильтр по категории
        if category_lower and category_lower not in cat.lower():
            continue

        seen.add(tid)
        results.append({
            "test_id": tid,
            "title": title,
            "description": desc[:200] if desc else "",
            "category": cat,
            "has_data_file": os.path.exists(os.path.join(TESTS_DIR, f"{tid}.js"))
        })

    return {
        "status": "success",
        "query": query,
        "category_filter": category or None,
        "results": results,
        "total_found": len(results)
    }

