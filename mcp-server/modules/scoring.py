# ═══════════════════════════════════════════
#  Модуль 2: СКОРИНГ (Scoring Engine)
#  Подсчёт баллов по шкалам тестов.
#  Статус: ✅ РАБОТАЕТ
# ═══════════════════════════════════════════

import json
import logging
from modules.registry import get_test_data

logger = logging.getLogger(__name__)


def evaluate_sum_single_scale(answers: dict, test_data: dict) -> dict:
    """Подсчёт для тестов с одной шкалой (sum_single_scale)."""
    total = 0
    for qid, val in answers.items():
        num = _safe_number(val)
        if num is not None:
            total += num

    scales = test_data.get("scales", {})
    interpretation = "Интерпретация не найдена."
    max_possible = 0

    if isinstance(scales, dict):
        for scale_id, scale_data in scales.items():
            max_possible = scale_data.get("max", 0)
            ranges = scale_data.get("ranges", [])
            for r in sorted(ranges, key=lambda x: x.get("min", 0), reverse=True):
                if total >= r.get("min", 0):
                    interpretation = r.get("label", interpretation)
                    break
            break  # Первая шкала
    elif isinstance(scales, list) and scales:
        results = scales[0].get("results", [])
        for r in sorted(results, key=lambda x: x.get("min", 0), reverse=True):
            if total >= r.get("min", 0):
                interpretation = r.get("text", interpretation)
                break

    return {
        "score": total,
        "max_possible": max_possible or len(test_data.get("questions", [])) * 3,
        "interpretation": interpretation
    }


def evaluate_sum_multi_scale(answers: dict, test_data: dict) -> dict:
    """Подсчёт для тестов с несколькими шкалами (sum_multi_scale)."""
    scales = test_data.get("scales", {})
    questions = test_data.get("questions", [])
    raw_scores = {k: 0 for k in scales}

    for q in questions:
        if q.get("isIntro"):
            continue
        qid = q.get("id")
        ans_val = answers.get(qid)
        if ans_val is None:
            continue

        num = _safe_number(ans_val)
        if num is None:
            continue

        # Если ответ — объект с разбивкой по шкалам
        options = q.get("options", [])
        matched_opt = None
        for i, opt in enumerate(options):
            opt_val = opt.get("score", opt.get("value", i))
            if opt_val == ans_val:
                matched_opt = opt
                break

        if matched_opt and isinstance(matched_opt.get("score"), dict):
            for sk, sv in matched_opt["score"].items():
                safe_sv = _safe_number(sv)
                if safe_sv is not None and sk in raw_scores:
                    raw_scores[sk] += safe_sv
        else:
            target_scale = q.get("scale", list(scales.keys())[0] if scales else "default")
            if target_scale in raw_scores:
                raw_scores[target_scale] += num

    # Формируем результат по каждой шкале
    results = {}
    for sk, sv in raw_scores.items():
        scale_meta = scales.get(sk, {})
        coeff = scale_meta.get("coefficient", 1)
        final = sv * coeff
        results[sk] = {
            "title": scale_meta.get("title", sk),
            "score": final,
            "max": scale_meta.get("max", 100),
            "label": _get_label(final, scale_meta.get("ranges", []))
        }

    return results


def calculate_for_test(test_id: str, answers: dict) -> dict:
    """
    Главная точка входа: определяет тип подсчёта и запускает нужный evaluator.
    """
    test_data = get_test_data(test_id)
    if not test_data:
        return {"error": f"Нет данных для теста '{test_id}'"}

    scales = test_data.get("scales", {})

    if isinstance(scales, dict) and len(scales) > 1:
        return {
            "test_id": test_id,
            "evaluator": "sum_multi_scale",
            "results": evaluate_sum_multi_scale(answers, test_data)
        }
    else:
        return {
            "test_id": test_id,
            "evaluator": "sum_single_scale",
            "results": evaluate_sum_single_scale(answers, test_data)
        }


# ── Вспомогательные функции ──

def _safe_number(val) -> float | None:
    """Безопасное преобразование в число с защитой от NaN."""
    try:
        n = float(val)
        if n != n:  # NaN check
            return None
        return n
    except (TypeError, ValueError):
        return None


def _get_label(score: float, ranges: list) -> str:
    """Находит текстовую метку для числового балла."""
    for r in ranges:
        if score >= r.get("min", 0) and score <= r.get("max", float("inf")):
            return r.get("label", "")
    return "Норма"
