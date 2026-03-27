# ═══════════════════════════════════════════
#  Модуль 11: ДЕТЕКТОР ПОВЕДЕНИЯ (Анти-ложь)
#  Анализ временны́х паттернов ответов.
#  Статус: 🔧 ЗАГЛУШКА
# ═══════════════════════════════════════════

import logging

logger = logging.getLogger(__name__)


def analyze_response_pattern(
    timestamps: list[dict],
    total_questions: int
) -> dict:
    """
    Анализирует поведение при прохождении теста.

    Входные данные (timestamps):
    [
        {"question_id": "q1", "answered_at": 1711556400, "time_spent_ms": 3200},
        {"question_id": "q2", "answered_at": 1711556403, "time_spent_ms": 800},
        ...
    ]

    Когда будет реализован:
    - Средняя скорость ответа (если < 1 сек → подозрительно)
    - Паттерн «все одинаковые ответы» (кликер наугад)
    - Паттерн «слишком идеальные» ответы (социальная желательность)
    - Итоговый флаг достоверности: reliable / suspicious / unreliable
    """
    if not timestamps:
        return {
            "status": "no_data",
            "module": "behavior_detector",
            "message": "Данные о времени ответов не переданы."
        }

    # Базовый анализ (уже работает)
    times = [t.get("time_spent_ms", 0) for t in timestamps if t.get("time_spent_ms")]
    if not times:
        return {"status": "no_timing_data", "module": "behavior_detector"}

    avg_time = sum(times) / len(times)
    min_time = min(times)
    fast_answers = sum(1 for t in times if t < 1000)  # < 1 секунды

    reliability = "reliable"
    flags = []

    if avg_time < 1500:
        reliability = "suspicious"
        flags.append("Слишком быстрые ответы в среднем")
    if fast_answers > total_questions * 0.5:
        reliability = "unreliable"
        flags.append(f"{fast_answers} из {total_questions} ответов быстрее 1 секунды")
    if min_time < 300:
        flags.append("Есть ответы быстрее 0.3 секунды (бот?)")

    return {
        "status": "success",
        "module": "behavior_detector",
        "reliability": reliability,
        "flags": flags,
        "stats": {
            "avg_time_ms": round(avg_time),
            "min_time_ms": min_time,
            "fast_answers_count": fast_answers,
            "total_questions": total_questions
        }
    }
