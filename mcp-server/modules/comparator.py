# ═══════════════════════════════════════════
#  Модуль 18: СРАВНЕНИЕ ПРОФИЛЕЙ (Comparator)
#  Сравнение двух людей/команды по результатам.
#  Статус: 🔧 ЗАГЛУШКА
# ═══════════════════════════════════════════

import logging
from modules.scoring import calculate_for_test

logger = logging.getLogger(__name__)


def compare_profiles(
    profile_a: dict,
    profile_b: dict,
    test_id: str
) -> dict:
    """
    Сравнивает результаты двух людей по одному тесту.

    Входные данные:
    profile_a = {"name": "Партнёр A", "answers": {"q1": 3, ...}}
    profile_b = {"name": "Партнёр B", "answers": {"q1": 1, ...}}

    Когда будет реализован:
    - Поиск точек согласия и конфликта
    - Расчёт «индекса совместимости»
    - Виз. Радарный график (spider chart) наложения профилей
    - Рекомендации для пар / бизнес-партнёров
    """
    result_a = calculate_for_test(test_id, profile_a.get("answers", {}))
    result_b = calculate_for_test(test_id, profile_b.get("answers", {}))

    return {
        "status": "not_implemented",
        "module": "comparator",
        "message": "Модуль сравнения подготовлен. Баллы обоих профилей рассчитаны, ожидается логика анализа совместимости.",
        "profile_a": {
            "name": profile_a.get("name", "A"),
            "scores": result_a
        },
        "profile_b": {
            "name": profile_b.get("name", "B"),
            "scores": result_b
        }
    }


def compare_team(team_results: list[dict], test_id: str) -> dict:
    """
    Сравнивает профили всей команды, ищет лидеров и «слабые звенья».
    """
    return {
        "status": "not_implemented",
        "module": "comparator",
        "message": "Командное сравнение подготовлено.",
        "team_size": len(team_results)
    }
