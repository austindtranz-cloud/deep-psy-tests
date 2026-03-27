# ═══════════════════════════════════════════
#  Модуль 22: ВОДЯНЫЕ ЗНАКИ (Watermark)
#  Защита PDF и изображений от копирования.
#  Статус: 🔧 ЗАГЛУШКА (нужна библиотека Pillow)
# ═══════════════════════════════════════════

import logging

logger = logging.getLogger(__name__)

# TODO: pip install Pillow


def add_watermark_to_pdf(
    pdf_path: str,
    watermark_text: str = "DEEP Tests — Confidential"
) -> dict:
    """
    Накладывает невидимый/полупрозрачный водяной знак на PDF.

    Когда будет реализован:
    - Полупрозрачный текст по диагонали
    - Уникальный ID отчёта (привязка к клиенту)
    - Стеганография (невидимый для глаза маркер)
    """
    return {
        "status": "not_implemented",
        "module": "watermark",
        "message": "Модуль водяных знаков подготовлен. Требуется: pip install Pillow (или PyMuPDF)",
        "target": pdf_path,
        "watermark_preview": watermark_text
    }


def generate_unique_report_id(test_id: str, user_email: str = "") -> str:
    """
    Генерирует уникальный ID отчёта для отслеживания утечек.
    Если PDF появится где-то в интернете — можно определить, кто его слил.
    """
    import hashlib
    import time
    raw = f"{test_id}:{user_email}:{time.time()}"
    return hashlib.sha256(raw.encode()).hexdigest()[:12].upper()
