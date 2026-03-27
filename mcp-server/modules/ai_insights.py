# ═══════════════════════════════════════════
#  Модуль 14: ИИ-СОВЕТЫ (AI Insights)
#  Персональные рекомендации на основе результатов.
#  Статус: 🔧 ЗАГЛУШКА (нужен LLM API)
# ═══════════════════════════════════════════

import logging
from config import LLM_API_KEY, LLM_MODEL

logger = logging.getLogger(__name__)


def generate_personal_insight(
    test_id: str,
    scores: dict,
    user_context: str = ""
) -> dict:
    """
    Генерирует уникальный, поддерживающий текст для клиента
    на основе его результатов (не шаблонный!).

    Когда будет реализован:
    - Отправка результатов в LLM с терапевтическим промптом
    - Тон: тёплый, поддерживающий, безоценочный
    - Без диагнозов — только мягкие рекомендации
    - Адаптация под возраст/контекст (если передан user_context)
    """
    if not LLM_API_KEY:
        return {
            "status": "not_configured",
            "module": "ai_insights",
            "message": "LLM API не настроен. Установите DEEP_LLM_API_KEY.",
        }

    # TODO: Реализовать вызов API
    # prompt = f"""Ты — мягкий психолог-консультант. На основе результатов теста
    # {test_id} с баллами {scores} напиши персональный абзац поддержки..."""

    return {
        "status": "not_implemented",
        "module": "ai_insights",
        "message": "Модуль ИИ-советов подготовлен. LLM-ключ обнаружен, ожидается активация.",
        "model": LLM_MODEL,
        "test_id": test_id
    }
