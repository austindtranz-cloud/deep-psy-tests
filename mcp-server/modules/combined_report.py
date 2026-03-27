# ═══════════════════════════════════════════
#  Модуль 5: ОБЪЕДИНЁННЫЙ ПСИХО-ПОРТРЕТ
#  Анализ нескольких тестов в единый профиль.
#  Статус: 🔧 ЗАГЛУШКА
# ═══════════════════════════════════════════

import logging
from modules.scoring import calculate_for_test

logger = logging.getLogger(__name__)


def build_combined_profile(test_results: list[dict]) -> dict:
    """
    Объединяет результаты нескольких тестов в один профиль.

    Пример входных данных:
    [
        {"test_id": "phq9", "answers": {"p1": 2, "p2": 1, ...}},
        {"test_id": "gad7", "answers": {"g1": 3, "g2": 2, ...}},
        {"test_id": "tipi", "answers": {"t1": 5, "t2": 3, ...}}
    ]

    Когда будет реализован:
    - Сводная таблица всех шкал
    - Перекрёстный анализ (тревога + депрессия = ?)
    - Рекомендация типа терапии
    - Генерация единого PDF
    """
    if not test_results:
        return {"status": "error", "message": "Список тестов пуст."}

    all_scores = {}
    for entry in test_results:
        tid = entry.get("test_id", "unknown")
        answers = entry.get("answers", {})
        result = calculate_for_test(tid, answers)
        all_scores[tid] = result

    return {
        "status": "not_implemented",
        "module": "combined_report",
        "message": "Модуль объединённого портрета подготовлен. Баллы по каждому тесту собраны, ожидается логика перекрёстного анализа.",
        "tests_processed": len(all_scores),
        "raw_scores": all_scores
    }
