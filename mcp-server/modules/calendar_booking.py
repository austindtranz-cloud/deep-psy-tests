# ═══════════════════════════════════════════
#  Модуль 8: ЗАПИСЬ В КАЛЕНДАРЬ
#  Автоматическое бронирование слотов.
#  Статус: 🔧 ЗАГЛУШКА (нужны Google Calendar API credentials)
# ═══════════════════════════════════════════

import logging
from config import GOOGLE_CALENDAR_CREDENTIALS, GOOGLE_CALENDAR_ID

logger = logging.getLogger(__name__)


def get_available_slots(days_ahead: int = 7) -> dict:
    """
    Возвращает свободные слоты специалиста на ближайшие N дней.

    Когда будет реализован:
    - Подключение к Google Calendar API
    - Поиск свободных окон в расписании
    - Учёт часового пояса клиента
    """
    if not GOOGLE_CALENDAR_CREDENTIALS:
        return {
            "status": "not_configured",
            "module": "calendar_booking",
            "message": "Google Calendar не настроен. Установите DEEP_GCAL_CREDENTIALS_PATH.",
        }

    return {
        "status": "not_implemented",
        "module": "calendar_booking",
        "message": "Модуль календаря подготовлен. Ожидается подключение Google Calendar API.",
        "days_ahead": days_ahead
    }


def book_slot(
    client_name: str,
    client_email: str,
    slot_datetime: str,
    test_id: str = "",
    urgency: str = "normal"
) -> dict:
    """
    Бронирует конкретный слот в календаре специалиста.
    urgency: 'normal' | 'high' (критический результат теста)
    """
    return {
        "status": "not_implemented",
        "module": "calendar_booking",
        "message": "Бронирование слота подготовлено, но ещё не активировано.",
        "booking_preview": {
            "client": client_name,
            "datetime": slot_datetime,
            "urgency": urgency
        }
    }
