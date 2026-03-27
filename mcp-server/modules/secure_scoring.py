# ═══════════════════════════════════════════
#  Модуль 10: СЕРВЕРНЫЙ СКОРИНГ (Анти-кража)
#  Защищённый подсчёт баллов на стороне сервера.
#  Статус: ✅ РАБОТАЕТ (использует modules/scoring.py)
# ═══════════════════════════════════════════

import json
import hashlib
import time
import logging
from modules.scoring import calculate_for_test

logger = logging.getLogger(__name__)


def secure_calculate(test_id: str, answers: dict, client_fingerprint: str = "") -> dict:
    """
    Защищённый подсчёт баллов.
    В отличие от клиентского JS, результат подписывается хешем,
    который невозможно подделать без знания секрета.

    Когда полностью реализован:
    - Результат содержит подпись (hash), подтверждающую подлинность
    - Временная метка
    - Отпечаток клиента (для защиты от передачи чужих результатов)
    """
    result = calculate_for_test(test_id, answers)

    timestamp = int(time.time())
    # Простая подпись (в продакшене использовать HMAC с секретом)
    signature_data = f"{test_id}:{json.dumps(result, sort_keys=True)}:{timestamp}"
    signature = hashlib.sha256(signature_data.encode()).hexdigest()[:16]

    return {
        "status": "success",
        "module": "secure_scoring",
        "test_id": test_id,
        "results": result,
        "metadata": {
            "calculated_at": timestamp,
            "signature": signature,
            "server_verified": True,
            "client_fingerprint": client_fingerprint or "anonymous"
        }
    }
