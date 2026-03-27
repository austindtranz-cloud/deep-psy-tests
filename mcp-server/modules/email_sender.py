# ═══════════════════════════════════════════
#  Модуль 4: EMAIL-РАССЫЛКА
#  Отправка результатов и PDF на почту клиента.
#  Статус: 🔧 ЗАГЛУШКА (нужны SMTP-данные в config.py)
# ═══════════════════════════════════════════

import logging
from config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM_NAME

logger = logging.getLogger(__name__)

# TODO: Заполнить DEEP_SMTP_USER и DEEP_SMTP_PASSWORD в переменных среды


def send_results_email(
    to_email: str,
    test_title: str,
    scores: dict,
    pdf_path: str = ""
) -> dict:
    """
    Отправляет письмо с результатами теста.

    Когда будет реализован:
    - HTML-письмо в фирменном стиле DEEP
    - Приложенный PDF-отчёт (если есть)
    - Кнопка «Записаться на консультацию»
    """
    if not SMTP_USER:
        return {
            "status": "not_configured",
            "module": "email_sender",
            "message": "SMTP не настроен. Установите переменные среды: DEEP_SMTP_USER, DEEP_SMTP_PASSWORD",
        }

    logger.info(f"EMAIL: Попытка отправки на {to_email}")

    # TODO: Реализовать через smtplib
    # import smtplib
    # from email.mime.multipart import MIMEMultipart
    # ...

    return {
        "status": "not_implemented",
        "module": "email_sender",
        "message": "Модуль email подготовлен. SMTP-данные обнаружены, осталось активировать код отправки.",
        "to": to_email,
        "test": test_title
    }
