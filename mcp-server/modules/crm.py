# ═══════════════════════════════════════════
#  Модуль 7: CRM-ИНТЕГРАЦИЯ
#  Создание лидов в AmoCRM / Битрикс24.
#  Статус: 🔧 ЗАГЛУШКА (нужен Webhook URL)
# ═══════════════════════════════════════════

import logging
from config import CRM_WEBHOOK_URL, CRM_API_KEY

logger = logging.getLogger(__name__)


def create_lead(
    name: str,
    email: str = "",
    phone: str = "",
    test_id: str = "",
    scores: dict = None,
    tags: list[str] = None
) -> dict:
    """
    Создаёт карточку лида в CRM с психологическим профилем.

    Когда будет реализован:
    - Автосоздание контакта в AmoCRM/Битрикс
    - Прикрепление результатов теста как примечание
    - Установка тегов: «Тревога», «Выгорание»
    - Постановка задачи менеджеру
    """
    if not CRM_WEBHOOK_URL:
        return {
            "status": "not_configured",
            "module": "crm",
            "message": "CRM не настроен. Установите DEEP_CRM_WEBHOOK_URL.",
        }

    logger.info(f"CRM: Создание лида для {name}")

    # TODO: Реализовать через requests.post(CRM_WEBHOOK_URL, ...)

    return {
        "status": "not_implemented",
        "module": "crm",
        "message": "Модуль CRM подготовлен. Webhook обнаружен, ожидается активация.",
        "lead_preview": {
            "name": name,
            "email": email,
            "test": test_id,
            "tags": tags or []
        }
    }
