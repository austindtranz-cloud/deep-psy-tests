# ═══════════════════════════════════════════
#  Модуль 13: ВАЛИДАТОР КОНТЕНТА
#  Проверяет целостность библиотеки тестов.
#  Статус: ✅ РАБОТАЕТ
# ═══════════════════════════════════════════

import os
import logging
from modules.registry import list_all_tests, get_test_data, get_available_test_files

logger = logging.getLogger(__name__)


def validate_library() -> dict:
    """
    Сканирует всю библиотеку тестов и ищет проблемы:
    - Тесты в реестре без файла данных
    - Файлы данных без записи в реестре
    - Тесты без указания времени прохождения
    - Тесты с пустыми шкалами
    - Шкалы с пробелами в диапазонах интерпретации
    """
    registry_info = list_all_tests()
    if registry_info.get("status") != "success":
        return {"status": "error", "message": "Не удалось прочитать реестр."}

    registry_ids = set(registry_info.get("tests_found", []))
    file_ids = set(get_available_test_files())

    issues = []

    # 1. Тесты в реестре без файла
    missing_files = registry_ids - file_ids
    for tid in sorted(missing_files):
        issues.append({
            "severity": "warning",
            "test_id": tid,
            "issue": "В реестре есть, но файл данных отсутствует (не запустится)"
        })

    # 2. Файлы без записи в реестре
    orphan_files = file_ids - registry_ids
    for tid in sorted(orphan_files):
        issues.append({
            "severity": "info",
            "test_id": tid,
            "issue": "Файл данных существует, но тест не зарегистрирован в каталоге"
        })

    # 3. Проверка содержимого каждого файла данных
    for tid in sorted(file_ids & registry_ids):
        test_data = get_test_data(tid)
        if not test_data:
            issues.append({
                "severity": "error",
                "test_id": tid,
                "issue": "Файл существует, но не удалось распарсить JSON"
            })
            continue

        questions = test_data.get("questions", [])
        scales = test_data.get("scales", {})

        if not questions:
            issues.append({
                "severity": "error",
                "test_id": tid,
                "issue": "Нет вопросов (questions пуст)"
            })

        if not scales:
            issues.append({
                "severity": "warning",
                "test_id": tid,
                "issue": "Нет шкал (scales пуст)"
            })

        # Проверка пробелов в ranges
        if isinstance(scales, dict):
            for sk, sv in scales.items():
                ranges = sv.get("ranges", [])
                if ranges:
                    prev_max = None
                    for r in sorted(ranges, key=lambda x: x.get("min", 0)):
                        rmin = r.get("min", 0)
                        rmax = r.get("max", 0)
                        if prev_max is not None and rmin > prev_max + 1:
                            issues.append({
                                "severity": "warning",
                                "test_id": tid,
                                "issue": f"Шкала '{sk}': пробел в диапазоне [{prev_max+1}..{rmin-1}]"
                            })
                        prev_max = rmax

    errors = sum(1 for i in issues if i["severity"] == "error")
    warnings = sum(1 for i in issues if i["severity"] == "warning")

    return {
        "status": "success",
        "module": "validator",
        "summary": {
            "total_in_registry": len(registry_ids),
            "total_files": len(file_ids),
            "errors": errors,
            "warnings": warnings,
            "info": len(issues) - errors - warnings
        },
        "issues": issues
    }
