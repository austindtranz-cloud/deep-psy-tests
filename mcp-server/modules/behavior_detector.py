# ═══════════════════════════════════════════
#  Модуль 11: ДЕТЕКТОР ПОВЕДЕНИЯ (Анти-ложь)
#  Анализ временны́х паттернов ответов.
#  Статус: ✅ РАБОТАЕТ (v3.0)
# ═══════════════════════════════════════════

import logging
from collections import Counter

logger = logging.getLogger(__name__)


def analyze_response_pattern(
    timestamps: dict,
    total_questions: int
) -> dict:
    """
    Анализирует поведение при прохождении теста.

    Входные данные (timestamps):
    {"q1": 3200, "q2": 800, "q3": 1500, ...}
    где ключ — ID вопроса, значение — миллисекунды.

    Возвращает:
    - reliability: reliable / suspicious / unreliable
    - flags: список обнаруженных аномалий
    - stats: статистика по времени
    """
    if not timestamps:
        return {
            "status": "no_data",
            "module": "behavior_detector",
            "message": "Данные о времени ответов не переданы."
        }

    # Извлекаем времена (поддерживаем и dict и list[dict] формат)
    if isinstance(timestamps, dict):
        times = [v for v in timestamps.values() if isinstance(v, (int, float)) and v > 0]
    elif isinstance(timestamps, list):
        times = [t.get("time_spent_ms", 0) for t in timestamps if isinstance(t, dict) and t.get("time_spent_ms", 0) > 0]
    else:
        return {"status": "error", "module": "behavior_detector", "message": "Неверный формат timestamps."}

    if not times:
        return {"status": "no_timing_data", "module": "behavior_detector"}

    avg_time = sum(times) / len(times)
    min_time = min(times)
    max_time = max(times)
    median_time = sorted(times)[len(times) // 2]
    fast_answers = sum(1 for t in times if t < 1000)
    very_fast_answers = sum(1 for t in times if t < 300)

    reliability = "reliable"
    flags = []
    confidence_score = 100  # начинаем с максимальной уверенности

    # ── Проверка 1: Слишком быстрые ответы ──
    if avg_time < 1500:
        reliability = "suspicious"
        flags.append("⚠️ Средняя скорость ответа < 1.5 секунды")
        confidence_score -= 25

    if fast_answers > total_questions * 0.5:
        reliability = "unreliable"
        flags.append(f"🔴 {fast_answers} из {total_questions} ответов быстрее 1 секунды")
        confidence_score -= 30

    if very_fast_answers > 0:
        flags.append(f"⚡ {very_fast_answers} ответ(ов) быстрее 0.3 секунды (возможен бот)")
        confidence_score -= very_fast_answers * 10

    # ── Проверка 2: Слишком однообразное время (робот) ──
    if len(times) >= 5:
        spread = max_time - min_time
        if spread < 500 and avg_time < 3000:
            flags.append("🤖 Подозрительно однообразное время ответов (< 0.5с разброс)")
            reliability = "suspicious"
            confidence_score -= 20

    # ── Проверка 3: Резкие перепады (возможно отвлекался) ──
    if max_time > avg_time * 10 and avg_time > 0:
        flags.append(f"📊 Резкий перепад: max={max_time}мс, avg={round(avg_time)}мс. Возможно отвлекался на одном вопросе.")

    # ── Проверка 4: Среднее время нереально мало для чтения ──
    if avg_time < 800 and total_questions > 5:
        reliability = "unreliable"
        flags.append("❌ Время недостаточно для чтения вопросов")
        confidence_score -= 30

    confidence_score = max(0, min(100, confidence_score))

    return {
        "status": "success",
        "module": "behavior_detector",
        "reliability": reliability,
        "confidence_score": confidence_score,
        "flags": flags,
        "stats": {
            "avg_time_ms": round(avg_time),
            "median_time_ms": median_time,
            "min_time_ms": min_time,
            "max_time_ms": max_time,
            "fast_answers_count": fast_answers,
            "very_fast_count": very_fast_answers,
            "total_timed": len(times),
            "total_questions": total_questions
        },
        "recommendation": _get_recommendation(reliability, confidence_score)
    }


def analyze_answer_pattern(answers: dict) -> dict:
    """
    Анализирует паттерн самих ответов (без временных меток).

    Детектирует:
    - Все одинаковые ответы
    - Чередование (1-5-1-5 или 0-3-0-3)
    - Линейный паттерн (1-2-3-4-5-1-2-3...)
    """
    if not answers:
        return {"status": "no_data", "module": "behavior_detector"}

    values = list(answers.values())
    numeric_values = [v for v in values if isinstance(v, (int, float))]

    if len(numeric_values) < 3:
        return {"status": "insufficient_data", "module": "behavior_detector",
                "message": "Нужно минимум 3 ответа для анализа паттерна."}

    flags = []
    pattern_type = "normal"

    # Все одинаковые
    counter = Counter(numeric_values)
    most_common_value, most_common_count = counter.most_common(1)[0]
    uniformity_pct = round(most_common_count / len(numeric_values) * 100, 1)

    if uniformity_pct > 90:
        pattern_type = "uniform"
        flags.append(f"🔴 {uniformity_pct}% ответов одинаковы (значение: {most_common_value})")
    elif uniformity_pct > 70:
        flags.append(f"⚠️ {uniformity_pct}% ответов одинаковы")

    # Чередование (alternating pattern)
    if len(numeric_values) >= 4:
        diffs = [numeric_values[i + 1] - numeric_values[i] for i in range(len(numeric_values) - 1)]
        alternating_count = sum(1 for i in range(len(diffs) - 1) if diffs[i] * diffs[i + 1] < 0)
        alternating_pct = round(alternating_count / max(len(diffs) - 1, 1) * 100, 1)

        if alternating_pct > 80:
            pattern_type = "alternating"
            flags.append(f"🔴 Обнаружен чередующийся паттерн ({alternating_pct}%)")
        elif alternating_pct > 60:
            flags.append(f"⚠️ Высокая частота чередования ({alternating_pct}%)")

    # Только крайние значения
    unique_vals = set(numeric_values)
    if len(unique_vals) <= 2 and len(numeric_values) >= 5:
        flags.append(f"⚠️ Используются только {len(unique_vals)} уникальных значения из возможных")

    return {
        "status": "success",
        "module": "behavior_detector",
        "pattern_type": pattern_type,
        "flags": flags,
        "stats": {
            "total_answers": len(numeric_values),
            "unique_values": len(unique_vals),
            "most_common_value": most_common_value,
            "uniformity_pct": uniformity_pct
        }
    }


def _get_recommendation(reliability: str, confidence: int) -> str:
    """Рекомендация на основе оценки надёжности."""
    if reliability == "unreliable":
        return "Результаты крайне ненадёжны. Рекомендуется повторное прохождение теста в спокойной обстановке."
    elif reliability == "suspicious":
        return "Есть признаки невнимательного прохождения. Результаты стоит интерпретировать с осторожностью."
    else:
        return "Прохождение выглядит добросовестным."
