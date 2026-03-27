# ═══════════════════════════════════════════
#  Модуль 12: КОНВЕРТЕР ТЕСТОВ
#  Автоматическое преобразование текста в JSON.
#  Статус: 🔧 ЗАГЛУШКА (нужен LLM API)
# ═══════════════════════════════════════════

import logging
from config import LLM_API_KEY, LLM_MODEL

logger = logging.getLogger(__name__)


def convert_text_to_test(
    raw_text: str,
    test_id_suggestion: str = "",
    category_hint: str = ""
) -> dict:
    """
    Принимает сырой текст (скопированный из PDF/Word/интернета)
    и конвертирует в готовый JSON-объект теста.

    Когда будет реализован:
    - Парсинг структуры вопросов и вариантов ответа
    - Определение типа шкалы (Ликерт 5, бинарная, и т.д.)
    - Генерация шкал и диапазонов интерпретации
    - Автоопределение категории
    - Генерация JS-файла в формате window.DEEP_TESTS[...]
    """
    if not raw_text or len(raw_text) < 50:
        return {
            "status": "error",
            "message": "Текст слишком короткий для конвертации."
        }

    if not LLM_API_KEY:
        return {
            "status": "not_configured",
            "module": "test_converter",
            "message": "LLM API не настроен. Установите DEEP_LLM_API_KEY для автоматической конвертации.",
            "text_length": len(raw_text),
            "hint": "Без LLM конвертация невозможна — структура тестов слишком разнообразна для жёстких правил."
        }

    # TODO: Отправить raw_text в LLM с промптом-шаблоном
    # prompt = f"Преобразуй следующий психологический тест в JSON-формат...\n{raw_text}"

    return {
        "status": "not_implemented",
        "module": "test_converter",
        "message": "Модуль конвертера подготовлен. LLM-ключ обнаружен, ожидается активация.",
        "text_preview": raw_text[:300],
        "suggested_id": test_id_suggestion
    }
