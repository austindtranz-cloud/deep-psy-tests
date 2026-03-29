# ═══════════════════════════════════════════
#  DEEP PSY ENGINE — ЦЕНТРАЛЬНАЯ КОНФИГУРАЦИЯ
#  Все API-ключи читаются из переменных среды.
#  Ни один ключ НЕ хранится в коде напрямую.
#  Обновлено: 2026-03-27 (МСК+2)
# ═══════════════════════════════════════════

import os

# ── Пути проекта ──
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY_PATH = os.path.join(ROOT_DIR, "data", "test_registry.js")
TESTS_DIR = os.path.join(ROOT_DIR, "data", "tests")
DOCS_DIR = os.path.join(ROOT_DIR, "ДОКУМЕНТАЦИЯ")

# ── Telegram ──
TELEGRAM_BOT_TOKEN = os.environ.get("DEEP_TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("DEEP_TELEGRAM_CHAT_ID", "")

# ── Email (SMTP) ──
SMTP_HOST = os.environ.get("DEEP_SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("DEEP_SMTP_PORT", "587"))
SMTP_USER = os.environ.get("DEEP_SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("DEEP_SMTP_PASSWORD", "")
EMAIL_FROM_NAME = os.environ.get("DEEP_EMAIL_FROM_NAME", "DEEP Tests")

# ── CRM ──
CRM_WEBHOOK_URL = os.environ.get("DEEP_CRM_WEBHOOK_URL", "")
CRM_API_KEY = os.environ.get("DEEP_CRM_API_KEY", "")

# ── Google Calendar ──
GOOGLE_CALENDAR_CREDENTIALS = os.environ.get("DEEP_GCAL_CREDENTIALS_PATH", "")
GOOGLE_CALENDAR_ID = os.environ.get("DEEP_GCAL_CALENDAR_ID", "")

# ── AI / LLM (для персональных советов) ──
LLM_API_KEY = os.environ.get("DEEP_LLM_API_KEY", "")
LLM_MODEL = os.environ.get("DEEP_LLM_MODEL", "gemini-2.5-pro")

# ── Брендинг (White-Label) ──
DEFAULT_BRAND_NAME = "DEEP"
DEFAULT_BRAND_COLOR = "#E8D6B3"
DEFAULT_BRAND_LOGO_URL = ""

# ── Версионирование ──
MCP_VERSION = "3.0.0"
MCP_SERVER_NAME = "deep_psy_mcp"
