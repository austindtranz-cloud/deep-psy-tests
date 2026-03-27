# ═══════════════════════════════════════════
#  Модуль 3: ГЕНЕРАТОР PDF-ОТЧЁТОВ
#  Создаёт красивый PDF с результатами теста.
#  Статус: 🔧 ЗАГЛУШКА (нужна библиотека reportlab или weasyprint)
# ═══════════════════════════════════════════

import logging

logger = logging.getLogger(__name__)

# TODO: pip install reportlab  (или weasyprint для HTML→PDF)


def generate_pdf_report(
    test_title: str,
    scores: dict,
    brand_name: str = "DEEP",
    brand_color: str = "#E8D6B3"
) -> dict:
    """
    Генерирует PDF-файл с результатами теста в фирменном стиле.

    Когда будет реализован:
    - Шапка с логотипом бренда
    - Графики (барчарты) по шкалам
    - Текстовые интерпретации
    - QR-код для повторного доступа

    Возвращает dict с путём к файлу или ошибкой.
    """
    logger.info(f"PDF REPORT: Запрос на генерацию для '{test_title}'")

    return {
        "status": "not_implemented",
        "module": "pdf_report",
        "message": "Модуль PDF-отчётов подготовлен, но ещё не активирован.",
        "required": "pip install reportlab   # или weasyprint",
        "input_received": {
            "test_title": test_title,
            "scales_count": len(scores) if isinstance(scores, dict) else 0,
            "brand": brand_name
        }
    }


def generate_combined_pdf(test_results: list[dict], user_name: str = "") -> dict:
    """
    Генерирует объединённый PDF-портрет из нескольких тестов.
    """
    return {
        "status": "not_implemented",
        "module": "pdf_report",
        "message": "Объединённый PDF-портрет — планируется.",
        "tests_received": len(test_results)
    }
