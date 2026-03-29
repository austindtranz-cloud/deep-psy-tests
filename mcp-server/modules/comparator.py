# ═══════════════════════════════════════════
#  Модуль 18: СРАВНЕНИЕ ПРОФИЛЕЙ (Comparator)
#  Сравнение двух людей/команды по результатам.
#  Статус: ✅ РАБОТАЕТ (v3.0)
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
    profile_a = {"name": "Персона A", "answers": {"q1": 3, ...}}
    profile_b = {"name": "Персона B", "answers": {"q1": 1, ...}}

    Возвращает:
    - Баллы обоих профилей
    - Расхождения по шкалам
    - Точки согласия и конфликта
    - Индекс совместимости (0-100)
    """
    result_a = calculate_for_test(test_id, profile_a.get("answers", {}))
    result_b = calculate_for_test(test_id, profile_b.get("answers", {}))

    name_a = profile_a.get("name", "Персона A")
    name_b = profile_b.get("name", "Персона B")

    # Определяем тип теста и считаем расхождения
    res_a = result_a.get("results", {})
    res_b = result_b.get("results", {})

    if isinstance(res_a, dict) and "score" in res_a:
        # Одношкальный тест
        divergences, agreements, conflicts = _compare_single_scale(res_a, res_b)
    elif isinstance(res_a, dict):
        # Многошкальный тест
        divergences, agreements, conflicts = _compare_multi_scale(res_a, res_b)
    else:
        return {
            "status": "error",
            "message": "Не удалось определить тип шкал для сравнения."
        }

    # Индекс совместимости
    compatibility = _calculate_compatibility(divergences)

    return {
        "status": "success",
        "module": "comparator",
        "test_id": test_id,
        "profile_a": {"name": name_a, "scores": result_a},
        "profile_b": {"name": name_b, "scores": result_b},
        "divergences": divergences,
        "agreements": agreements,
        "conflicts": conflicts,
        "compatibility_index": compatibility,
        "compatibility_label": _compatibility_label(compatibility),
        "summary": _generate_comparison_summary(name_a, name_b, compatibility, agreements, conflicts)
    }


def _compare_single_scale(res_a: dict, res_b: dict) -> tuple:
    """Сравнивает одношкальные результаты."""
    score_a = res_a.get("score", 0)
    score_b = res_b.get("score", 0)
    max_p = max(res_a.get("max_possible", 1), res_b.get("max_possible", 1), 1)

    abs_diff = abs(score_a - score_b)
    rel_diff = round(abs_diff / max_p * 100, 1)

    divergence = {
        "scale": "total",
        "score_a": score_a,
        "score_b": score_b,
        "abs_diff": abs_diff,
        "rel_diff_pct": rel_diff,
        "interpretation_a": res_a.get("interpretation", ""),
        "interpretation_b": res_b.get("interpretation", "")
    }

    agreements = [divergence] if rel_diff < 10 else []
    conflicts = [divergence] if rel_diff > 30 else []

    return [divergence], agreements, conflicts


def _compare_multi_scale(res_a: dict, res_b: dict) -> tuple:
    """Сравнивает многошкальные результаты."""
    all_scales = set(list(res_a.keys()) + list(res_b.keys()))
    divergences = []
    agreements = []
    conflicts = []

    for scale_id in sorted(all_scales):
        sa = res_a.get(scale_id, {})
        sb = res_b.get(scale_id, {})

        if not isinstance(sa, dict) or not isinstance(sb, dict):
            continue

        score_a = sa.get("score", 0)
        score_b = sb.get("score", 0)
        max_s = max(sa.get("max", 1), sb.get("max", 1), 1)

        abs_diff = abs(score_a - score_b)
        rel_diff = round(abs_diff / max_s * 100, 1)

        entry = {
            "scale": scale_id,
            "title": sa.get("title", sb.get("title", scale_id)),
            "score_a": score_a,
            "score_b": score_b,
            "abs_diff": abs_diff,
            "rel_diff_pct": rel_diff,
            "label_a": sa.get("label", ""),
            "label_b": sb.get("label", "")
        }

        divergences.append(entry)

        if rel_diff < 10:
            agreements.append(entry)
        elif rel_diff > 30:
            conflicts.append(entry)

    return divergences, agreements, conflicts


def _calculate_compatibility(divergences: list) -> int:
    """Рассчитывает индекс совместимости (0-100)."""
    if not divergences:
        return 50

    total_diff = sum(d.get("rel_diff_pct", 0) for d in divergences)
    avg_diff = total_diff / len(divergences)

    # Инвертируем: чем меньше расхождение, тем выше совместимость
    compatibility = max(0, min(100, round(100 - avg_diff)))
    return compatibility


def _compatibility_label(index: int) -> str:
    """Текстовая метка совместимости."""
    if index >= 85:
        return "Высокая совместимость"
    elif index >= 65:
        return "Хорошая совместимость"
    elif index >= 45:
        return "Умеренная совместимость"
    elif index >= 25:
        return "Низкая совместимость"
    else:
        return "Значительные расхождения"


def _generate_comparison_summary(name_a: str, name_b: str, compat: int, agreements: list, conflicts: list) -> str:
    """Генерирует текстовое резюме."""
    parts = [f"Сравнение {name_a} и {name_b}: индекс совместимости {compat}/100."]

    if agreements:
        parts.append(f"Точки согласия: {len(agreements)} шкал(ы) с расхождением < 10%.")
    if conflicts:
        parts.append(f"Зоны конфликта: {len(conflicts)} шкал(ы) с расхождением > 30%.")

    if compat >= 65:
        parts.append("Профили хорошо совместимы.")
    elif compat < 45:
        parts.append("Рекомендуется обсудить выявленные расхождения с психологом.")

    return " ".join(parts)


def compare_team(team_results: list[dict], test_id: str) -> dict:
    """
    Сравнивает профили всей команды.
    Находит лидеров, слабые звенья и кластеры похожих профилей.
    """
    if len(team_results) < 2:
        return {"status": "error", "message": "Нужно минимум 2 участника для сравнения."}

    # Считаем баллы для всех
    scored = []
    for entry in team_results:
        name = entry.get("name", f"Участник {len(scored) + 1}")
        answers = entry.get("answers", {})
        result = calculate_for_test(test_id, answers)
        scored.append({"name": name, "scores": result})

    # Попарные совместимости
    pairs = []
    for i in range(len(scored)):
        for j in range(i + 1, len(scored)):
            compat = _quick_compatibility(scored[i]["scores"], scored[j]["scores"])
            pairs.append({
                "pair": f"{scored[i]['name']} ↔ {scored[j]['name']}",
                "compatibility": compat
            })

    pairs.sort(key=lambda x: x["compatibility"], reverse=True)

    return {
        "status": "success",
        "module": "comparator",
        "test_id": test_id,
        "team_size": len(scored),
        "members": scored,
        "best_pairs": pairs[:3],
        "worst_pairs": pairs[-3:] if len(pairs) >= 3 else pairs,
        "avg_compatibility": round(sum(p["compatibility"] for p in pairs) / len(pairs)) if pairs else 0
    }


def _quick_compatibility(scores_a: dict, scores_b: dict) -> int:
    """Быстрый подсчёт совместимости для командного отчёта."""
    res_a = scores_a.get("results", {})
    res_b = scores_b.get("results", {})

    if isinstance(res_a, dict) and "score" in res_a:
        max_p = max(res_a.get("max_possible", 1), res_b.get("max_possible", 1), 1)
        diff = abs(res_a.get("score", 0) - res_b.get("score", 0))
        return max(0, min(100, round(100 - diff / max_p * 100)))

    if isinstance(res_a, dict) and isinstance(res_b, dict):
        diffs = []
        for k in res_a:
            if k in res_b and isinstance(res_a[k], dict) and isinstance(res_b[k], dict):
                sa = res_a[k].get("score", 0)
                sb = res_b[k].get("score", 0)
                mx = max(res_a[k].get("max", 1), res_b[k].get("max", 1), 1)
                diffs.append(abs(sa - sb) / mx * 100)
        if diffs:
            return max(0, min(100, round(100 - sum(diffs) / len(diffs))))

    return 50
