# ═══════════════════════════════════════════
#  Модуль 6: TELEGRAM-УВЕДОМЛЕНИЯ
#  Мгновенная отправка алертов в Telegram.
#  Статус: 🔧 ЗАГЛУШКА (нужен бот-токен)
# ═══════════════════════════════════════════

import logging
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

logger = logging.getLogger(__name__)

# TODO: Создать бота через @BotFather, получить токен,
#       записать в переменную среды DEEP_TELEGRAM_BOT_TOKEN


def send_notification(
    message: str,
    chat_id: str = "",
    parse_mode: str = "HTML"
) -> dict:
    """
    Отправляет текстовое уведомление в Telegram.

    Когда будет реализован:
    - Алерт психологу: «Клиент прошёл PHQ-9, результат: тяжёлая депрессия»
    - Форматирование в HTML (жирный, ссылки)
    - Кнопка «Связаться» в сообщении
    """
    target_chat = chat_id or TELEGRAM_CHAT_ID

    if not TELEGRAM_BOT_TOKEN:
        return {
            "status": "not_configured",
            "module": "telegram",
            "message": "Telegram-бот не настроен. Установите DEEP_TELEGRAM_BOT_TOKEN и DEEP_TELEGRAM_CHAT_ID.",
        }

    logger.info(f"TELEGRAM: Подготовка отправки в чат {target_chat}")

    # TODO: Реализовать через requests
    # import requests
    # url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    # requests.post(url, json={"chat_id": target_chat, "text": message, "parse_mode": parse_mode})

    return {
        "status": "not_implemented",
        "module": "telegram",
        "message": "Модуль Telegram готов к активации. Осталось подключить бот-токен.",
        "preview": message[:200]
    }


def send_critical_alert(test_id: str, scores: dict, contact_info: str = "") -> dict:
    """
    Специальный алерт: красный уровень результата теста.
    Формирует тревожное сообщение для психолога/менеджера.
    """
    msg = (
        f"🔴 <b>КРИТИЧЕСКИЙ РЕЗУЛЬТАТ</b>\n\n"
        f"Тест: <b>{test_id}</b>\n"
        f"Результаты: {scores}\n"
    )
    if contact_info:
        msg += f"Контакт клиента: {contact_info}\n"
    msg += "\nТребуется внимание специалиста."

    return send_notification(msg)
