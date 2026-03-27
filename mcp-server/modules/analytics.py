# ═══════════════════════════════════════════
#  Модуль 20: АНАЛИТИКА ВОПРОСОВ
#  Статистика: где люди бросают тест.
#  Статус: ✅ ЧАСТИЧНО РАБОТАЕТ
# ═══════════════════════════════════════════

import logging

logger = logging.getLogger(__name__)

# In-memory analytics (для прототипа)
_question_stats = {}


def record_event(test_id: str, question_id: str, event: str = "answered") -> dict:
    """
    Записывает событие взаимодействия с вопросом.

    События:
    - 'viewed': вопрос отображён
    - 'answered': на вопрос дан ответ
    - 'skipped': вопрос пропущен/квиз закрыт

    Когда полностью на бэкенде:
    - Хранение в БД
    - Вычисление drop-off rate по каждому вопросу
    - Тепловая карта «сложных» вопросов
    """
    key = f"{test_id}:{question_id}"
    if key not in _question_stats:
        _question_stats[key] = {"viewed": 0, "answered": 0, "skipped": 0}

    if event in _question_stats[key]:
        _question_stats[key][event] += 1

    return {"status": "success", "recorded": key, "event": event}


def get_drop_off_report(test_id: str) -> dict:
    """
    Возвращает отчёт: на каком вопросе люди чаще всего бросают тест.
    """
    relevant = {
        k.split(":")[1]: v
        for k, v in _question_stats.items()
        if k.startswith(f"{test_id}:")
    }

    if not relevant:
        return {
            "status": "no_data",
            "module": "analytics",
            "message": f"Нет данных аналитики для теста '{test_id}'."
        }

    # Вычисляем drop-off rate
    drop_offs = []
    for qid, stats in relevant.items():
        viewed = stats.get("viewed", 0)
        answered = stats.get("answered", 0)
        rate = round((1 - answered / viewed) * 100, 1) if viewed > 0 else 0
        drop_offs.append({
            "question_id": qid,
            "viewed": viewed,
            "answered": answered,
            "drop_off_pct": rate
        })

    drop_offs.sort(key=lambda x: x["drop_off_pct"], reverse=True)

    return {
        "status": "success",
        "module": "analytics",
        "test_id": test_id,
        "worst_questions": drop_offs[:5],
        "total_questions_tracked": len(drop_offs)
    }
