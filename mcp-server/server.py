# ═══════════════════════════════════════════════════════════════
#  DEEP PSY ENGINE — MCP SERVER v2.0 (Модульная архитектура)
#  Оркестратор: регистрирует все модули как MCP-инструменты.
#  Обновлено: 2026-03-27 (МСК+2)
# ═══════════════════════════════════════════════════════════════

import sys
import os
import json
import logging

# Гарантируем, что корень mcp-server в sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from mcp.server.fastmcp import FastMCP
from config import MCP_SERVER_NAME, MCP_VERSION, REGISTRY_PATH

# ── Импорт модулей ──
from modules.registry import (
    list_all_tests, get_test_file_content, get_test_data, get_available_test_files
)
from modules.scoring import calculate_for_test
from modules.secure_scoring import secure_calculate
from modules.validator import validate_library
from modules.recommender import get_recommendations
from modules.behavior_detector import analyze_response_pattern
from modules.analytics import record_event, get_drop_off_report
from modules.session_store import create_session, save_answer, get_session, delete_session
from modules.comparator import compare_profiles, compare_team
from modules.combined_report import build_combined_profile
from modules.whitelabel import register_brand, get_brand_config, list_brands

# Заглушки (пока не активированы, но доступны для вызова)
from modules.pdf_report import generate_pdf_report
from modules.email_sender import send_results_email
from modules.telegram import send_notification, send_critical_alert
from modules.crm import create_lead
from modules.calendar_booking import get_available_slots, book_slot
from modules.excel_export import export_team_results
from modules.test_converter import convert_text_to_test
from modules.ai_insights import generate_personal_insight
from modules.translator import translate_test
from modules.adaptive import get_control_questions, calculate_adaptive_path
from modules.watermark import add_watermark_to_pdf

# ── Инициализация ──
mcp = FastMCP(MCP_SERVER_NAME)
logger = logging.getLogger(__name__)

logger.info(f"═══ {MCP_SERVER_NAME} v{MCP_VERSION} — Запуск с {20} модулями ═══")


# ════════════════════════════════════════════
#  ГРУППА 1: ЯДРО (Реестр и Скоринг)
# ════════════════════════════════════════════

@mcp.tool()
def list_tests() -> str:
    """Список всех психологических тестов и категорий из реестра."""
    return json.dumps(list_all_tests(), indent=2, ensure_ascii=False)


@mcp.tool()
def get_test_details(test_id: str) -> str:
    """Полное содержимое файла теста (вопросы, шкалы, интерпретации)."""
    content = get_test_file_content(test_id)
    if content is None:
        return f"Тест '{test_id}' не найден."
    return content


@mcp.tool()
def calculate_results(test_id: str, answers_json: str) -> str:
    """
    Подсчёт результатов теста.
    answers_json: JSON-строка {questionId: числовое_значение}.
    """
    try:
        answers = json.loads(answers_json)
        result = calculate_for_test(test_id, answers)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка расчёта: {e}"


# ════════════════════════════════════════════
#  ГРУППА 2: ОТЧЁТЫ И ДОКУМЕНТЫ
# ════════════════════════════════════════════

@mcp.tool()
def generate_pdf(test_id: str, answers_json: str, brand_id: str = "deep") -> str:
    """Генерация красивого PDF-отчёта с результатами теста."""
    try:
        answers = json.loads(answers_json)
        scores = calculate_for_test(test_id, answers)
        brand = get_brand_config(brand_id)
        result = generate_pdf_report(test_id, scores, brand.get("brand", {}).get("name", "DEEP"))
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка генерации PDF: {e}"


@mcp.tool()
def send_email(to_email: str, test_id: str, answers_json: str) -> str:
    """Отправка результатов теста на email клиента."""
    try:
        answers = json.loads(answers_json)
        scores = calculate_for_test(test_id, answers)
        result = send_results_email(to_email, test_id, scores)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка отправки email: {e}"


@mcp.tool()
def build_profile(test_results_json: str) -> str:
    """
    Объединённый психологический портрет из нескольких тестов.
    test_results_json: [{"test_id": "phq9", "answers": {...}}, ...]
    """
    try:
        data = json.loads(test_results_json)
        result = build_combined_profile(data)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка построения профиля: {e}"


# ════════════════════════════════════════════
#  ГРУППА 3: БИЗНЕС-ИНТЕГРАЦИИ
# ════════════════════════════════════════════

@mcp.tool()
def notify_telegram(message: str, chat_id: str = "") -> str:
    """Отправить уведомление в Telegram специалисту."""
    result = send_notification(message, chat_id)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def alert_critical(test_id: str, scores_json: str, contact: str = "") -> str:
    """Критический алерт в Telegram: результат на красном уровне."""
    try:
        scores = json.loads(scores_json)
        result = send_critical_alert(test_id, scores, contact)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка алерта: {e}"


@mcp.tool()
def create_crm_lead(name: str, email: str = "", phone: str = "", test_id: str = "") -> str:
    """Создать карточку лида в CRM с результатами теста."""
    result = create_lead(name, email, phone, test_id)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def get_calendar_slots(days_ahead: int = 7) -> str:
    """Получить свободные слоты для записи на консультацию."""
    result = get_available_slots(days_ahead)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def export_hr_report(team_data_json: str, output_format: str = "csv") -> str:
    """Сформировать сводку по команде в Excel/CSV для HR."""
    try:
        data = json.loads(team_data_json)
        result = export_team_results(data, output_format)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка HR-выгрузки: {e}"


# ════════════════════════════════════════════
#  ГРУППА 4: БЕЗОПАСНОСТЬ
# ════════════════════════════════════════════

@mcp.tool()
def secure_calculate_scores(test_id: str, answers_json: str, fingerprint: str = "") -> str:
    """Защищённый (серверный) подсчёт баллов с подписью подлинности."""
    try:
        answers = json.loads(answers_json)
        result = secure_calculate(test_id, answers, fingerprint)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка серверного скоринга: {e}"


@mcp.tool()
def detect_behavior(timestamps_json: str, total_questions: int) -> str:
    """Анализ паттерна ответов: не кликал ли юзер наугад?"""
    try:
        timestamps = json.loads(timestamps_json)
        result = analyze_response_pattern(timestamps, total_questions)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка детектора: {e}"


# ════════════════════════════════════════════
#  ГРУППА 5: УМНЫЙ ПОМОЩНИК
# ════════════════════════════════════════════

@mcp.tool()
def convert_test(raw_text: str, test_id_suggestion: str = "") -> str:
    """Автоконвертация текста (из Word/PDF) в JSON-тест."""
    result = convert_text_to_test(raw_text, test_id_suggestion)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def validate_tests() -> str:
    """Полный аудит библиотеки: ищет ошибки, пробелы и «сирот»."""
    result = validate_library()
    return json.dumps(result, indent=2, ensure_ascii=False)


# ════════════════════════════════════════════
#  ГРУППА 6: КЛИЕНТСКОЕ ВЗАИМОДЕЙСТВИЕ
# ════════════════════════════════════════════

@mcp.tool()
def get_ai_insight(test_id: str, scores_json: str) -> str:
    """Персональные ИИ-рекомендации на основе результатов."""
    try:
        scores = json.loads(scores_json)
        result = generate_personal_insight(test_id, scores)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка ИИ-советов: {e}"


@mcp.tool()
def translate(test_id: str, target_lang: str = "en") -> str:
    """Перевод теста на другой язык."""
    test_data = get_test_data(test_id)
    if not test_data:
        return f"Тест '{test_id}' не найден."
    result = translate_test(test_data, target_lang)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def recommend_next(test_id: str) -> str:
    """Какой тест пройти следующим? Умный подбор."""
    result = get_recommendations(test_id)
    return json.dumps(result, indent=2, ensure_ascii=False)


# ════════════════════════════════════════════
#  ГРУППА 7: ТЕХНИЧЕСКИЕ СПОСОБНОСТИ
# ════════════════════════════════════════════

@mcp.tool()
def compare(profile_a_json: str, profile_b_json: str, test_id: str) -> str:
    """Сравнить профили двух людей по одному тесту."""
    try:
        a = json.loads(profile_a_json)
        b = json.loads(profile_b_json)
        result = compare_profiles(a, b, test_id)
        return json.dumps(result, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Ошибка сравнения: {e}"


@mcp.tool()
def session_create(test_id: str, fingerprint: str = "") -> str:
    """Создать защищённую серверную сессию для прохождения теста."""
    result = create_session(test_id, fingerprint)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def session_save(token: str, question_id: str, value: int) -> str:
    """Сохранить ответ на вопрос в серверной сессии."""
    result = save_answer(token, question_id, value)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def session_delete(token: str) -> str:
    """Удалить сессию (кнопка «Удалить мои данные»)."""
    result = delete_session(token)
    return json.dumps(result, indent=2, ensure_ascii=False)


@mcp.tool()
def question_analytics(test_id: str) -> str:
    """Отчёт: на каком вопросе люди чаще бросают тест?"""
    result = get_drop_off_report(test_id)
    return json.dumps(result, indent=2, ensure_ascii=False)


# ════════════════════════════════════════════
#  РЕСУРСЫ И ПРОМПТЫ
# ════════════════════════════════════════════

@mcp.resource("file://registry")
def get_registry_resource():
    """Доступ к реестру тестов как ресурсу."""
    with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
        return f.read()


@mcp.prompt()
def analyze_test_logic(test_id: str):
    """Промпт для анализа математической целостности шкал теста."""
    return (
        f"Прочитай тест '{test_id}' через get_test_details и проверь:\n"
        f"1. Покрывают ли ranges все возможные значения баллов?\n"
        f"2. Нет ли пробелов между диапазонами?\n"
        f"3. Совпадает ли max шкалы с реальным максимумом?"
    )


@mcp.prompt()
def full_audit():
    """Промпт для полного аудита всей библиотеки тестов."""
    return (
        "Запусти validate_tests() и проанализируй результат.\n"
        "Для каждой ошибки уровня 'error' предложи конкретное решение.\n"
        "Для 'warning' — оцени критичность."
    )


# ════════════════════════════════════════════
#  ЗАПУСК
# ════════════════════════════════════════════

if __name__ == "__main__":
    mcp.run()
