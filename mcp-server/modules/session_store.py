# ═══════════════════════════════════════════
#  Модуль 19: БЕЗОПАСНОЕ ХРАНЕНИЕ СЕССИЙ
#  Серверное хранение прогресса через токены.
#  Статус: 🔧 ЗАГЛУШКА
# ═══════════════════════════════════════════

import hashlib
import json
import time
import logging

logger = logging.getLogger(__name__)

# In-memory store (для прототипа; в продакшене → Redis/SQLite)
_sessions = {}


def create_session(test_id: str, user_fingerprint: str = "") -> dict:
    """
    Создаёт серверную сессию и возвращает токен.
    Пользователь хранит только токен, не ответы.

    Когда будет полностью реализован:
    - Хранение в Redis / SQLite (не in-memory)
    - TTL (время жизни сессии: 7 дней)
    - Шифрование ответов at-rest
    """
    token = hashlib.sha256(
        f"{test_id}:{user_fingerprint}:{time.time()}".encode()
    ).hexdigest()[:32]

    _sessions[token] = {
        "test_id": test_id,
        "answers": {},
        "created_at": int(time.time()),
        "fingerprint": user_fingerprint
    }

    return {
        "status": "success",
        "module": "session_store",
        "token": token,
        "message": "Сессия создана. Этот токен нужно передавать при каждом сохранении ответа.",
        "note": "⚠️ In-memory хранение. При перезапуске сервера сессии теряются."
    }


def save_answer(token: str, question_id: str, value) -> dict:
    """Сохраняет ответ в серверной сессии."""
    if token not in _sessions:
        return {"status": "error", "message": "Сессия не найдена или истекла."}

    _sessions[token]["answers"][question_id] = value
    return {
        "status": "success",
        "answers_count": len(_sessions[token]["answers"])
    }


def get_session(token: str) -> dict:
    """Возвращает данные сессии по токену."""
    if token not in _sessions:
        return {"status": "error", "message": "Сессия не найдена."}
    return {"status": "success", "data": _sessions[token]}


def delete_session(token: str) -> dict:
    """Удаляет сессию (кнопка «Удалить мои данные»)."""
    if token in _sessions:
        del _sessions[token]
        return {"status": "success", "message": "Сессия удалена."}
    return {"status": "error", "message": "Сессия не найдена."}
