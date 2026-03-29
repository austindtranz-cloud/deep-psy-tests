# ═══════════════════════════════════════════
#  Модуль 5: ОБЪЕДИНЁННЫЙ ПСИХО-ПОРТРЕТ
#  Анализ нескольких тестов в единый профиль.
#  Статус: ✅ РАБОТАЕТ (v3.0)
# ═══════════════════════════════════════════

import logging
from modules.scoring import calculate_for_test

logger = logging.getLogger(__name__)

# Матрица перекрёстного анализа: какие пары шкал усиливают друг друга
CROSS_ANALYSIS_RULES = {
    ("phq9", "gad7"): {
        "condition": lambda a, b: a.get("results", {}).get("score", 0) >= 10 and b.get("results", {}).get("score", 0) >= 10,
        "note": "Коморбидность: депрессия + тревога. Часто встречаются вместе и усиливают друг друга.",
        "severity": "high"
    },
    ("phq9", "pss10"): {
        "condition": lambda a, b: a.get("results", {}).get("score", 0) >= 10 and b.get("results", {}).get("score", 0) >= 20,
        "note": "Высокий стресс может быть триггером депрессии. Рекомендуется работа с копинг-стратегиями.",
        "severity": "medium"
    },
    ("cbi", "uwes"): {
        "condition": lambda a, b: True,
        "note": "Выгорание и вовлечённость — противоположные полюса. Сопоставление показывает баланс.",
        "severity": "info"
    },
    ("rosenberg", "phq9"): {
        "condition": lambda a, b: True,
        "note": "Низкая самооценка часто сопутствует депрессии. Полезно рассматривать вместе.",
        "severity": "info"
    },
    ("gad7", "pss10"): {
        "condition": lambda a, b: a.get("results", {}).get("score", 0) >= 10 and b.get("results", {}).get("score", 0) >= 20,
        "note": "Тревожность и стресс — высокие по обоим шкалам. Рекомендуются релаксационные техники.",
        "severity": "medium"
    },
}


def build_combined_profile(test_results: list[dict]) -> dict:
    """
    Объединяет результаты нескольких тестов в один профиль.

    Возвращает:
    - Баллы по каждому тесту
    - Перекрёстные заметки (cross-analysis)
    - Список зон внимания (attention_zones)
    - Общую оценку профиля
    """
    if not test_results:
        return {"status": "error", "message": "Список тестов пуст."}

    # 1. Собираем баллы по каждому тесту
    all_scores = {}
    errors = []
    for entry in test_results:
        tid = entry.get("test_id", "unknown")
        answers = entry.get("answers", {})
        try:
            result = calculate_for_test(tid, answers)
            all_scores[tid] = result
        except Exception as e:
            errors.append({"test_id": tid, "error": str(e)})

    if not all_scores:
        return {"status": "error", "message": "Ни один тест не удалось обработать.", "errors": errors}

    # 2. Перекрёстный анализ
    cross_notes = []
    test_ids = list(all_scores.keys())
    for i, tid_a in enumerate(test_ids):
        for tid_b in test_ids[i + 1:]:
            # Проверяем оба направления пары
            for pair in [(tid_a, tid_b), (tid_b, tid_a)]:
                rule = CROSS_ANALYSIS_RULES.get(pair)
                if rule:
                    try:
                        if rule["condition"](all_scores[pair[0]], all_scores[pair[1]]):
                            cross_notes.append({
                                "pair": f"{pair[0]} + {pair[1]}",
                                "note": rule["note"],
                                "severity": rule["severity"]
                            })
                    except Exception:
                        pass

    # 3. Зоны внимания
    attention_zones = []
    for tid, result in all_scores.items():
        res = result.get("results", {})
        # Одношкальный тест
        if isinstance(res, dict) and "score" in res:
            interpretation = res.get("interpretation", "")
            score = res.get("score", 0)
            max_p = res.get("max_possible", 1)
            pct = round(score / max_p * 100) if max_p > 0 else 0
            if pct >= 60:
                attention_zones.append({
                    "test_id": tid,
                    "score_pct": pct,
                    "interpretation": interpretation,
                    "priority": "high" if pct >= 80 else "medium"
                })
        # Многошкальный тест
        elif isinstance(res, dict):
            for scale_id, scale_data in res.items():
                if isinstance(scale_data, dict):
                    score = scale_data.get("score", 0)
                    max_s = scale_data.get("max", 1)
                    pct = round(score / max_s * 100) if max_s > 0 else 0
                    if pct >= 60:
                        attention_zones.append({
                            "test_id": tid,
                            "scale": scale_id,
                            "title": scale_data.get("title", scale_id),
                            "score_pct": pct,
                            "label": scale_data.get("label", ""),
                            "priority": "high" if pct >= 80 else "medium"
                        })

    attention_zones.sort(key=lambda x: x["score_pct"], reverse=True)

    return {
        "status": "success",
        "module": "combined_report",
        "tests_processed": len(all_scores),
        "scores": all_scores,
        "cross_analysis": cross_notes,
        "attention_zones": attention_zones[:10],
        "summary": _generate_summary(all_scores, cross_notes, attention_zones),
        "errors": errors if errors else None
    }


def _generate_summary(scores: dict, cross_notes: list, attention_zones: list) -> str:
    """Формирует текстовое резюме профиля."""
    parts = [f"Обработано тестов: {len(scores)}."]

    high_zones = [z for z in attention_zones if z.get("priority") == "high"]
    medium_zones = [z for z in attention_zones if z.get("priority") == "medium"]

    if high_zones:
        parts.append(f"Выявлено {len(high_zones)} зон высокого внимания.")
    if medium_zones:
        parts.append(f"Зон умеренного внимания: {len(medium_zones)}.")

    high_cross = [n for n in cross_notes if n.get("severity") in ("high", "medium")]
    if high_cross:
        parts.append(f"Обнаружено {len(high_cross)} значимых перекрёстных паттернов.")

    if not high_zones and not high_cross:
        parts.append("Критических зон не выявлено.")

    return " ".join(parts)
