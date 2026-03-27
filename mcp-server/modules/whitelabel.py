# ═══════════════════════════════════════════
#  Модуль 21: WHITE-LABEL (Кастомный брендинг)
#  Перекраска отчётов под бренд клиента.
#  Статус: 🔧 ЗАГЛУШКА
# ═══════════════════════════════════════════

import logging
from config import DEFAULT_BRAND_NAME, DEFAULT_BRAND_COLOR, DEFAULT_BRAND_LOGO_URL

logger = logging.getLogger(__name__)

# Реестр брендов (в продакшене — из БД)
_brands = {
    "deep": {
        "name": DEFAULT_BRAND_NAME,
        "color": DEFAULT_BRAND_COLOR,
        "logo_url": DEFAULT_BRAND_LOGO_URL,
        "footer_text": "© DEEP Psy Solutions"
    }
}


def register_brand(
    brand_id: str,
    name: str,
    primary_color: str,
    logo_url: str = "",
    footer_text: str = ""
) -> dict:
    """
    Регистрирует новый бренд для White-Label отчётов.

    Когда будет реализован:
    - Хранение брендов в БД
    - Валидация цвета (hex)
    - Загрузка логотипа
    """
    _brands[brand_id] = {
        "name": name,
        "color": primary_color,
        "logo_url": logo_url,
        "footer_text": footer_text or f"© {name}"
    }

    return {
        "status": "success",
        "module": "whitelabel",
        "message": f"Бренд '{name}' зарегистрирован.",
        "brand_id": brand_id
    }


def get_brand_config(brand_id: str = "deep") -> dict:
    """Возвращает конфигурацию бренда для отчёта."""
    brand = _brands.get(brand_id)
    if not brand:
        brand = _brands.get("deep", {})

    return {
        "status": "success",
        "module": "whitelabel",
        "brand": brand
    }


def list_brands() -> dict:
    """Список всех зарегистрированных брендов."""
    return {
        "status": "success",
        "module": "whitelabel",
        "brands": {k: v["name"] for k, v in _brands.items()}
    }
