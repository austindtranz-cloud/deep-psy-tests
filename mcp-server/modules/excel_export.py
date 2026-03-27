# ═══════════════════════════════════════════
#  Модуль 9: EXCEL/CSV ВЫГРУЗКА (HR)
#  Формирование сводных таблиц для HR-директоров.
#  Статус: 🔧 ЗАГЛУШКА (нужна библиотека openpyxl)
# ═══════════════════════════════════════════

import json
import logging

logger = logging.getLogger(__name__)

# TODO: pip install openpyxl


def export_team_results(
    team_data: list[dict],
    output_format: str = "csv"
) -> dict:
    """
    Формирует сводную таблицу по команде.

    Входные данные:
    [
        {"name": "Иванов", "test_id": "phq9", "scores": {"depression": 14}},
        {"name": "Петрова", "test_id": "phq9", "scores": {"depression": 6}},
    ]

    Когда будет реализован:
    - CSV/XLSX файл с колонками: Имя, Тест, Шкала, Балл, Интерпретация
    - Цветная разметка (красный = критический)
    - Средние показатели по отделу
    - Возможность фильтрации
    """
    if not team_data:
        return {"status": "error", "message": "Данные команды пусты."}

    return {
        "status": "not_implemented",
        "module": "excel_export",
        "message": "Модуль HR-выгрузки подготовлен. Ожидается: pip install openpyxl",
        "format": output_format,
        "employees_count": len(team_data)
    }
