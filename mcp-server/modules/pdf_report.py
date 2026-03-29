import os
import tempfile
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from playwright.sync_api import sync_playwright
import logging

logger = logging.getLogger("mcp_server.pdf")

def render_html_template(template_name: str, context: dict) -> str:
    """
    Рендеринг Jinja2 шаблона из папки templates
    """
    # Вычисляем путь к папке mcp-server/templates
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    templates_dir = os.path.join(base_dir, "templates")
    
    env = Environment(loader=FileSystemLoader(templates_dir))
    
    # Добавляем кастомный фильтр для экранирования кавычек в JS
    env.filters['escapejs'] = lambda x: x.replace("'", "\\'").replace('"', '\\"')
    
    template = env.get_template(template_name)
    return template.render(**context)

def generate_pdf_report(test_id: str, scores: dict, insights: str, output_path: str = None) -> str:
    """
    Создает премиальный PDF-отчет с использованием Jinja2 + Playwright.
     Возвращает абсолютный путь к созданному файлу.
    """
    if not output_path:
        # По умолчанию сохраняем в корень (на Рабочий стол/Тесты DPS)
        root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        output_path = os.path.join(root_dir, f"Premium_Report_{test_id}_{int(datetime.now().timestamp())}.pdf")

    # 1. Готовим контекст для Jinja2
    context = {
        "test_title": f"Результаты теста: {test_id.upper()}",
        "user_id": "Анонимный клиент",
        "date": datetime.now().strftime("%d %B %Y %H:%M"),
        "scores": scores,
        "insights": insights
    }
    
    # 2. Рендерим HTML
    html_content = render_html_template("report.html", context)
    
    # Сохраняем во временный файл, чтобы скормить его браузеру
    fd, temp_html_path = tempfile.mkstemp(suffix=".html")
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        f.write(html_content)
        
    print(f"[PDF Engine] Временный HTML создан: {temp_html_path}")
    
    # 3. Делаем PDF-слепок через Playwright
    try:
        with sync_playwright() as p:
            # Запускаем Chromium без интерфейса
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            # Конвертируем путь в локальный URL (file://)
            file_url = f"file:///{temp_html_path.replace(os.path.sep, '/')}"
            print(f"[PDF Engine] Загрузка шаблона в браузер...")
            
            # margin: 0 чтобы Tailwind `p-8` на <body> работал корректно
            page.goto(file_url, wait_until="load")
            
            # Явное ожидание в 2 секунды для 100% отрисовки Chart.js и Tailwind CDN
            page.wait_for_timeout(2000)
            
            print(f"[PDF Engine] Рендеринг PDF (Print to PDF)...")
            page.pdf(
                path=output_path,
                format="A4",
                print_background=True,
                margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
            )
            
            browser.close()
    finally:
        # 4. Уборка мусора
        if os.path.exists(temp_html_path):
            os.remove(temp_html_path)
            
    print(f"[PDF Engine] Премиальный PDF успешно сохранен: {output_path}")
    return output_path
