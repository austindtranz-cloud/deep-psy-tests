# ═══════════════════════════════════════════
#  Модуль 15: МУЛЬТИЯЗЫЧНОСТЬ (Translator)
#  Перевод тестов и интерпретаций на лету.
#  Статус: 🔧 ЗАГЛУШКА (нужен LLM API)
# ═══════════════════════════════════════════

import logging
from config import LLM_API_KEY

logger = logging.getLogger(__name__)

SUPPORTED_LANGUAGES = {
    "ru": "Русский",
    "en": "English",
    "kk": "Қазақ тілі",
    "uz": "Oʻzbek tili",
    "de": "Deutsch",
}


def translate_test(test_data: dict, target_lang: str = "en") -> dict:
    """
    Переводит все текстовые поля теста на указанный язык.

    Когда будет реализован:
    - Перевод вопросов, вариантов ответов, интерпретаций
    - Сохранение психологических нюансов терминов
    - Кеширование переводов чтобы не переводить повторно
    """
    if target_lang not in SUPPORTED_LANGUAGES:
        return {
            "status": "error",
            "message": f"Язык '{target_lang}' не поддерживается. Доступные: {list(SUPPORTED_LANGUAGES.keys())}"
        }

    if not LLM_API_KEY:
        return {
            "status": "not_configured",
            "module": "translator",
            "message": "LLM API не настроен для перевода.",
        }

    return {
        "status": "not_implemented",
        "module": "translator",
        "message": f"Модуль перевода подготовлен. Целевой язык: {SUPPORTED_LANGUAGES[target_lang]}",
        "target_lang": target_lang,
        "fields_to_translate": ["questions.text", "questions.options.text", "scales.*.ranges.*.label"]
    }
