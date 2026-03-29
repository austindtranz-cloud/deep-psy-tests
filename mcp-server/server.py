# ═══════════════════════════════════════════════════════════════
#  DEEP PSY ENGINE — MCP SERVER v3.0 (Модульная архитектура)
#  Оркестратор: регистрирует все модули как MCP-инструменты.
#  Обновлено: 2026-03-30 — MCP Best Practices, Pydantic, Annotations
# ═══════════════════════════════════════════════════════════════

import sys
import os
import json
import logging
from typing import Any

# Гарантируем, что корень mcp-server в sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from mcp.server.fastmcp import FastMCP
from config import MCP_SERVER_NAME, MCP_VERSION, REGISTRY_PATH, TESTS_DIR

# ── Импорт модулей ──
from modules.registry import (
    list_all_tests, get_test_file_content, get_test_data, get_available_test_files, search_tests
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

# Заглушки (пока не активированы полностью, но доступны для вызова)
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

logger.info(f"═══ {MCP_SERVER_NAME} v{MCP_VERSION} — Запуск с 23 модулями ═══")


def error_response(msg: str, err: Exception, suggestion: str = "") -> dict:
    """Стандартный формат ответа об ошибке с рекомендациями."""
    response = {
        "status": "error",
        "message": msg,
        "error_type": type(err).__name__,
        "details": str(err)
    }
    if suggestion:
        response["suggestion"] = suggestion
    return response


# ════════════════════════════════════════════
#  ГРУППА 1: ЯДРО (Реестр и Скоринг)
# ════════════════════════════════════════════

@mcp.tool(
    name="deep_psy_list_tests",
    annotations={
        "title": "Список всех тестов",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def list_tests() -> dict:
    """
    Возвращает список всех доступных психологических тестов и категорий из реестра.
    Позволяет агенту узнать доступные ID тестов (test_id) для дальнейшего использования.
    
    Returns:
        dict: JSON с массивом 'tests_found' (все test_id) и 'categories'.
    """
    return list_all_tests()


@mcp.tool(
    name="deep_psy_search_tests",
    annotations={
        "title": "Поиск тестов по запросу",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def search_tests_tool(query: str, category: str = "") -> dict:
    """
    Ищет тесты по ключевому слову в названии, описании или категории.
    Используйте этот инструмент, когда нужно найти подходящий тест (например, "депрессия").
    
    Args:
        query: Поисковая строка.
        category: Опциональный фильтр по категории.
        
    Returns:
        dict: Выборка тестов с их test_id, названием и описанием.
    """
    return search_tests(query, category)


@mcp.tool(
    name="deep_psy_get_test",
    annotations={
        "title": "Получить полную структуру теста",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def get_test_details(test_id: str) -> dict | str:
    """
    Получает полное содержимое файла теста, включая вопросы, шкалы и логику интерпретации.
    
    Args:
        test_id: Уникальный идентификатор теста (например, "phq9", "bfq").
        
    Returns:
        dict: Полный JSON с объектами 'questions' и 'scales'.
    """
    content = get_test_file_content(test_id)
    if content is None:
        return {"status": "error", "message": f"Тест '{test_id}' не найден."}
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return content


@mcp.tool(
    name="deep_psy_calculate",
    annotations={
        "title": "Подсчёт результатов теста",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def calculate_results(test_id: str, answers: dict[str, Any]) -> dict:
    """
    Подсчитывает баллы по тесту на основе ответов пользователя.
    
    Args:
        test_id: Уникальный идентификатор теста.
        answers: Объект (словарь), где ключ — ID вопроса, а значение — выбранный балл. 
                 Пример: {"q1": 3, "q2": 1, "q3": 0}
                 
    Returns:
        dict: Результаты скоринга ('score', 'interpretation' или разбивка по 'scales').
    """
    try:
        return calculate_for_test(test_id, answers)
    except Exception as e:
        return error_response(
            "Ошибка расчёта результатов теста.", 
            e,
            "Убедитесь, что ID теста верный и ответы переданы в формате {\"q1\": 1}"
        )


# ════════════════════════════════════════════
#  ГРУППА 2: ОТЧЁТЫ И ДОКУМЕНТЫ
# ════════════════════════════════════════════

@mcp.tool(
    name="deep_psy_generate_pdf",
    annotations={
        "title": "Генерация PDF отчёта",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True
    }
)
def generate_pdf(test_id: str, answers: dict[str, Any], brand_id: str = "deep") -> dict | str:
    """
    Создаёт красивый PDF-отчёт с результатами пройденного теста.
    
    Args:
        test_id: ID теста.
        answers: Ответы пользователя.
        brand_id: Идентификатор бренда (whitelabel).
    """
    try:
        scores = calculate_for_test(test_id, answers)
        brand = get_brand_config(brand_id)
        return generate_pdf_report(test_id, scores, brand.get("brand", {}).get("name", "DEEP"))
    except Exception as e:
        return error_response("Ошибка при генерации PDF отчёта.", e)


@mcp.tool(
    name="deep_psy_send_email",
    annotations={
        "title": "Отправка email с результатами",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True
    }
)
def send_email(to_email: str, test_id: str, answers: dict[str, Any]) -> dict | str:
    """
    Считает баллы и отправляет результаты теста на email клиента.
    
    Args:
        to_email: Электронная почта клиента.
        test_id: ID пройденного теста.
        answers: Ответы пользователя.
    """
    try:
        scores = calculate_for_test(test_id, answers)
        return send_results_email(to_email, test_id, scores)
    except Exception as e:
        return error_response("Ошибка при отправке email.", e)


@mcp.tool(
    name="deep_psy_build_profile",
    annotations={
        "title": "Сборный психологический профиль",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def build_profile(test_results: list[dict[str, Any]]) -> dict | str:
    """
    Строит объединённый психологический портрет человека на основе сразу нескольких тестов,
    выполняя перекрестный анализ между шкалами разных опросников.
    
    Args:
        test_results: Массив словарей прохождений. Каждый элемент: {'test_id': '...', 'answers': {...}}
    """
    try:
        return build_combined_profile(test_results)
    except Exception as e:
        return error_response("Ошибка объединения профилей.", e)


# ════════════════════════════════════════════
#  ГРУППА 3: БИЗНЕС-ИНТЕГРАЦИИ
# ════════════════════════════════════════════

@mcp.tool(
    name="deep_psy_notify_telegram",
    annotations={
        "title": "Отправка уведомления в Telegram",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True
    }
)
def notify_telegram(message: str, chat_id: str = "") -> dict:
    """Отправляет сервисное уведомление администратору или психологу в Telegram."""
    return send_notification(message, chat_id)


@mcp.tool(
    name="deep_psy_alert_critical",
    annotations={
        "title": "Критический алерт специалисту",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True
    }
)
def alert_critical(test_id: str, scores: dict[str, Any], contact: str = "") -> dict:
    """Отправляет критический алерт в Telegram (например, при высоком суицидальном риске)."""
    try:
        return send_critical_alert(test_id, scores, contact)
    except Exception as e:
        return error_response("Ошибка при отправке алерта.", e)


@mcp.tool(
    name="deep_psy_create_lead",
    annotations={
        "title": "Создание лида в CRM",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True
    }
)
def create_crm_lead(name: str, email: str = "", phone: str = "", test_id: str = "") -> dict:
    """Создает карточку нового лида (потенциального клиента) в CRM системе."""
    return create_lead(name, email, phone, test_id)


@mcp.tool(
    name="deep_psy_calendar_slots",
    annotations={
        "title": "Доступные слоты календаря",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True
    }
)
def get_calendar_slots_tool(days_ahead: int = 7) -> dict | list:
    """Получает свободные слоты в расписании для записи на консультацию."""
    return get_available_slots(days_ahead)


@mcp.tool(
    name="deep_psy_export_hr",
    annotations={
        "title": "Экспорт HR-отчёта",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def export_hr_report_tool(team_data: list[dict[str, Any]], output_format: str = "csv") -> dict | str:
    """Формирует и выгружает сводную таблицу результатов для команды."""
    try:
        return export_team_results(team_data, output_format)
    except Exception as e:
        return error_response("Ошибка при выгрузке HR-отчёта.", e)


# ════════════════════════════════════════════
#  ГРУППА 4: БЕЗОПАСНОСТЬ
# ════════════════════════════════════════════

@mcp.tool(
    name="deep_psy_secure_calc",
    annotations={
        "title": "Защищенный подсчет баллов",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def secure_calculate_scores(test_id: str, answers: dict[str, Any], fingerprint: str = "") -> dict:
    """Защищённый (серверный) подсчёт баллов с проверкой подлинности по отпечатку клиента."""
    try:
        return secure_calculate(test_id, answers, fingerprint)
    except Exception as e:
        return error_response("Ошибка защищенного серверного скоринга.", e)


@mcp.tool(
    name="deep_psy_detect_behavior",
    annotations={
        "title": "Анализ паттерна поведения (Anti-cheat)",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def detect_behavior(timestamps: dict[str, Any], total_questions: int) -> dict:
    """
    Анализирует паттерн ответов и время на каждый вопрос для выявления "random clickers"
    
    Args:
        timestamps: Словарь {"q1": 2500, "q2": 1500} - время ответа в мс
        total_questions: Всего вопросов в тесте
    """
    try:
        return analyze_response_pattern(timestamps, total_questions)
    except Exception as e:
        return error_response("Ошибка детектора поведения.", e)


# ════════════════════════════════════════════
#  ГРУППА 5: УМНЫЙ ПОМОЩНИК & ИНСТРУМЕНТЫ
# ════════════════════════════════════════════

@mcp.tool(
    name="deep_psy_convert_test",
    annotations={
        "title": "Конвертер текста в JSON",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def convert_test(raw_text: str, test_id_suggestion: str = "") -> dict:
    """Конвертирует сырой текст теста (word/pdf) в рабочий JSON-формат."""
    return convert_text_to_test(raw_text, test_id_suggestion)


@mcp.tool(
    name="deep_psy_validate",
    annotations={
        "title": "Линтинг библиотеки тестов",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def validate_tests() -> dict | list:
    """Выполняет аудит библиотеки тестов на ошибки."""
    return validate_library()


@mcp.tool(
    name="deep_psy_ai_insight",
    annotations={
        "title": "Генерация ИИ-рекомендаций",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True
    }
)
def get_ai_insight(test_id: str, scores: dict[str, Any]) -> dict | str:
    """Генерирует персональные советы LLM на основе посчитанных результатов."""
    try:
        return generate_personal_insight(test_id, scores)
    except Exception as e:
        return error_response("Ошибка генерации ИИ-советов.", e)


@mcp.tool(
    name="deep_psy_translate",
    annotations={
        "title": "Перевод теста",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True
    }
)
def translate(test_id: str, target_lang: str = "en") -> dict | str:
    """Переводит тест (вопросы, опции, интерпретации) на другой язык с сохранением структуры JSON."""
    test_data = get_test_data(test_id)
    if not test_data:
        return {"status": "error", "message": f"Тест '{test_id}' не найден."}
    return translate_test(test_data, target_lang)


@mcp.tool(
    name="deep_psy_recommend",
    annotations={
        "title": "Рекомендатор следующих тестов",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def recommend_next(test_id: str) -> dict | list:
    """Рекомендует следующие тесты для клиента на основе дерева зависимостей."""
    return get_recommendations(test_id)


# ════════════════════════════════════════════
#  ГРУППА 6: ТЕХНИЧЕСКИЕ СПОСОБНОСТИ
# ════════════════════════════════════════════

@mcp.tool(
    name="deep_psy_compare",
    annotations={
        "title": "Сравнение психологических профилей",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def compare(profile_a: dict[str, Any], profile_b: dict[str, Any], test_id: str) -> dict:
    """Производит кросс-сравнение психологических профилей двух людей по одному конкретному тесту."""
    try:
        return compare_profiles(profile_a, profile_b, test_id)
    except Exception as e:
        return error_response("Ошибка выполнения сравнения профилей.", e)


@mcp.tool(
    name="deep_psy_session_create",
    annotations={
        "title": "Создать серверную сессию",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": False
    }
)
def session_create_tool(test_id: str, fingerprint: str = "") -> dict:
    """Создаёт защищённую серверную сессию для пошагового прохождения теста."""
    return create_session(test_id, fingerprint)


@mcp.tool(
    name="deep_psy_session_save",
    annotations={
        "title": "Сохранить ответ в сессии",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": False
    }
)
def session_save_tool(token: str, question_id: str, value: int) -> dict:
    """Сохраняет отдельный ответ клиента в защищенную сессию по токену."""
    return save_answer(token, question_id, value)


@mcp.tool(
    name="deep_psy_session_delete",
    annotations={
        "title": "Удалить сессию",
        "readOnlyHint": False,
        "destructiveHint": True,
        "idempotentHint": False,
        "openWorldHint": False
    }
)
def session_delete_tool(token: str) -> dict:
    """Очищает сессию тестирования."""
    return delete_session(token)


@mcp.tool(
    name="deep_psy_analytics",
    annotations={
        "title": "Аналитика прерываний теста",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def question_analytics(test_id: str) -> dict | str:
    """Собирает список вопросов, на которых пользователи чаще всего бросают (drop-off) тест."""
    return get_drop_off_report(test_id)


@mcp.tool(
    name="deep_psy_adaptive_check",
    annotations={
        "title": "Адаптивное ветвление",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False
    }
)
def adaptive_check(test_id: str, answers: dict[str, Any], current_index: int = 0) -> dict:
    """Рассчитывает логику адаптивного IRT тестирования на лету (заглушка)."""
    return calculate_adaptive_path(test_id, current_index, answers)


@mcp.tool(
    name="deep_psy_watermark",
    annotations={
        "title": "Защита PDF ватермаркой",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": False
    }
)
def watermark_pdf(pdf_path: str, watermark_text: str) -> dict:
    """Накладывает водяной знак на PDF отчет с результатами."""
    return add_watermark_to_pdf(pdf_path, watermark_text)


# ════════════════════════════════════════════
#  РЕСУРСЫ MCP
# ════════════════════════════════════════════

@mcp.resource("file://registry")
def get_registry_resource() -> str:
    """Доступ к JSON-реестру всех тестов как к единому файлу-справочнику."""
    with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
        return f.read()

@mcp.resource("config://server")
def get_server_config_resource() -> str:
    """Статус сервера, версия и список активных модулей."""
    return json.dumps({
        "server_name": MCP_SERVER_NAME,
        "version": MCP_VERSION,
        "registry_path": REGISTRY_PATH,
        "modules_active": 23
    }, indent=2)

@mcp.resource("test://{test_id}")
def get_test_direct_resource(test_id: str) -> str:
    """Прямой доступ к исходному файлу конкретного теста."""
    content = get_test_file_content(test_id)
    if not content:
        return json.dumps({"error": f"Тест '{test_id}' не найден"})
    return content


# ════════════════════════════════════════════
#  ПРОМПТЫ MCP
# ════════════════════════════════════════════

@mcp.prompt()
def analyze_test_logic(test_id: str) -> str:
    """Шаблон для агента по глубокому математическому аудиту теста."""
    return (
        f"Прочитай тест '{test_id}' через ресурс test://{test_id} и проверь его логику подсчёта:\n"
        f"1. Покрывают ли ranges все возможные числовые значения балла?\n"
        f"2. Нет ли накладок (overlapping) между интервалами?\n"
    )

@mcp.prompt()
def full_audit() -> str:
    """Промпт для ревью всей библиотеки тестов."""
    return (
        "Запусти инструмент deep_psy_validate и предложи решения для всех ошибок (errors).\n"
        "Затем проверь warnings и оцени, какие из них критичны.\n"
    )


# ════════════════════════════════════════════
#  ЗАПУСК
# ════════════════════════════════════════════

if __name__ == "__main__":
    mcp.run()
