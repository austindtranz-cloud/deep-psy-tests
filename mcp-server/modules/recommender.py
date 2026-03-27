# ═══════════════════════════════════════════
#  Модуль 16: РЕКОМЕНДАТОР (Recommender)
#  Подбор статей, тестов и кейсов по результатам.
#  Статус: ✅ ЧАСТИЧНО РАБОТАЕТ
# ═══════════════════════════════════════════

import logging
from modules.registry import list_all_tests

logger = logging.getLogger(__name__)

# Матрица связей: какие тесты рекомендовать после какого
RECOMMENDATION_MAP = {
    "phq9":      ["gad7", "dass21", "pss10"],        # Депрессия → тревога, стресс
    "gad7":      ["phq9", "dass21", "pss10"],        # Тревога → депрессия, стресс
    "dass21":    ["phq9", "gad7", "resilience14"],   # Стресс → депрессия, устойчивость
    "pss10":     ["dass21", "cope", "resilience14"],  # Стресс → копинг
    "rosenberg": ["tipi", "ipip50"],                  # Самооценка → личность
    "tipi":      ["ipip50", "sd3"],                   # Экспресс Big5 → полная версия
    "leongard":  ["tipi", "sd3", "epi"],             # Акцентуации → темперамент
    "sd3":       ["leongard", "tipi"],                # Тёмная триада → акцентуации
    "audit":     ["dast", "eat26"],                   # Алкоголь → зависимости
    "cbi":       ["uwes", "pss10"],                   # Выгорание → вовлечённость
    "uwes":      ["cbi", "cope"],                     # Вовлечённость → выгорание
}


def get_recommendations(test_id: str, scores: dict = None) -> dict:
    """
    Рекомендует следующие тесты на основе пройденного.
    Если переданы scores — учитывает уровень тревожности для приоритизации.
    """
    recommended_ids = RECOMMENDATION_MAP.get(test_id, [])

    if not recommended_ids:
        # Базовая рекомендация: предложить что-то из другой категории
        all_info = list_all_tests()
        all_tests = all_info.get("tests_found", [])
        recommended_ids = [t for t in all_tests if t != test_id][:3]

    recommendations = []
    for rid in recommended_ids:
        recommendations.append({
            "test_id": rid,
            "reason": _get_reason(test_id, rid)
        })

    return {
        "status": "success",
        "module": "recommender",
        "after_test": test_id,
        "recommendations": recommendations
    }


def _get_reason(from_test: str, to_test: str) -> str:
    """Генерирует причину рекомендации."""
    reasons = {
        ("phq9", "gad7"): "Депрессия и тревога часто идут вместе — стоит проверить оба аспекта.",
        ("gad7", "phq9"): "Тревожность может маскировать депрессию. Рекомендуем проверить.",
        ("cbi", "uwes"): "После оценки выгорания полезно измерить уровень вовлечённости в работу.",
        ("rosenberg", "tipi"): "Дополните оценку самооценки портретом личности Big Five.",
    }
    return reasons.get((from_test, to_test), "Рекомендуется для более полной картины.")
