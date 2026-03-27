# 📊 Coverage: Test Coverage & Mapping

**Цель**: Сопоставить тесты из `data/test_registry.js` с файлами в `data/tests/`, чтобы выявить пробелы.

## Сводка покрытия (по runnable тестам)

| Категория | ID теста | Название | Статус | Файл |
| --- | --- | --- | --- | --- |
| Personality | `tipi` | TIPI-RU | Готов | `data/tests/tipi.js` |
| Personality | `leongard` | Карты скрытых конфликтов | Готов | `data/tests/leongard.js` |
| Personality | `sd3` | Dark Triad | Готов | `data/tests/sd3.js` |
| Personality | `rosenberg` | Индекс Самоценности | Готов | `data/tests/rosenberg.js` |
| Personality | `pid5bf` | PID-5-BF | В работе / Untracked | `data/tests/pid5bf.js` |
| Mental Functions | `schulte` | Таблицы Шульте | Готов | `data/tests/schulte.js` |
| Mental Functions | `stroop` | Тест Струпа | Готов | `data/tests/stroop.js` |
| Mental Functions | `bourdon` | Корректурная проба (Бурдон) | 🔴 Отсутствует | `data/tests/bourdon.js` |
| Mental Functions | `luria_memory` | Методика Лурия '10 слов' | 🔴 Отсутствует | `data/tests/luria_memory.js` |
| Adaptation | `holmes_rahe` | Шкала стрессовых событий | Готов | `data/tests/holmes_rahe.js` |
| Adaptation | `pss10` | PSS-10 | Готов | `data/tests/pss10.js` |
| Adaptation | `cbi` | CBI (Выгорание) | Готов | `data/tests/cbi.js` |
| Adaptation | `uwes` | UWES | Готов | `data/tests/uwes.js` |
| Adaptation | `cope` | COPE / Brief-COPE | Готов | `data/tests/cope.js` |
| Adaptation | `wocq` | Опросник совладания (Lazarus) | Готов | `data/tests/wocq.js` |
| Adaptation | `resilience14` | RS-14 | Готов | `data/tests/resilience14.js` |
| Psychiatry | `phq9` | PHQ-9 | Готов | `data/tests/phq9.js` |
| Psychiatry | `gad7` | GAD-7 | Готов | `data/tests/gad7.js` |
| Psychiatry | `mdq` | MDQ | Готов | `data/tests/mdq.js` |
| Psychiatry | `audit` | AUDIT | Готов | `data/tests/audit.js` |
| Psychiatry | `dast` | DAST | Готов | `data/tests/dast.js` |
| Psychiatry | `eat26` | EAT-26 | Готов | `data/tests/eat26.js` |
| Psychiatry | `scoff` | SCOFF | Готов | `data/tests/scoff.js` |
| Psychiatry | `aq` | AQ (Аутизм) | Готов | `data/tests/aq.js` |
| Relationships | `ecrr` | ECR-R | 🔴 Отсутствует | `data/tests/ecrr.js` |
| Relationships | `ras` | RAS | Готов | `data/tests/ras.js` |
| Relationships | `asex` | ASEX | 🔴 Отсутствует | `data/tests/asex.js` |
| Relationships | `fsfi` | FSFI | 🔴 Отсутствует | `data/tests/fsfi.js` |
| Relationships | `iief` | IIEF | 🔴 Отсутствует | `data/tests/iief.js` |
| Career | `holland` | Опросник Холланда | 🔴 Отсутствует | `data/tests/holland.js` |
| Career | `schein_anchors` | Якоря карьеры | 🔴 Отсутствует | `data/tests/schein_anchors.js` |
| Career | `savickas` | CAAS | 🔴 Отсутствует | `data/tests/savickas.js` |
| Team | `wleis` | WLEIS | 🔴 Отсутствует | `data/tests/wleis.js` |
| Team | `via_character` | VIA Character Strengths | 🔴 Отсутствует | `data/tests/via_character.js` |
| Team | `roci2` | ROCI-II | 🔴 Отсутствует | `data/tests/roci2.js` |
| Organization | `ocai` | OCAI | 🔴 Отсутствует | `data/tests/ocai.js` |
| Organization | `enps` | Employee NPS | 🔴 Отсутствует | `data/tests/enps.js` |
| Organization | `jss` | Job Satisfaction Survey | 🔴 Отсутствует | `data/tests/jss.js` |
| Psychoanalytic | `lsi_plutchik` | LSI (Плутчик–Келлерман) | 🔴 Отсутствует | `data/tests/lsi_plutchik.js` |
| Psychoanalytic | `dsq40` | DSQ-40 (Defense Style) | 🔴 Отсутствует | `data/tests/dsq40.js` |
| Psychoanalytic | `ipo_kernberg` | IPO (Кернберг) | 🔴 Отсутствует | `data/tests/ipo_kernberg.js` |
| Psychoanalytic | `rfq` | RFQ | 🔴 Отсутствует | `data/tests/rfq.js` |
| Psychoanalytic | `sct` | SCT | 🔴 Отсутствует | `data/tests/sct.js` |
| Therapy | `core10` | CORE-10 | 🔴 Отсутствует | `data/tests/core10.js` |
| Therapy | `whodas2` | WHODAS 2.0 | 🔴 Отсутствует | `data/tests/whodas2.js` |
| Therapy | `wai` | WAI | 🔴 Отсутствует | `data/tests/wai.js` |
| Therapy | `seq` | SEQ | 🔴 Отсутствует | `data/tests/seq.js` |

*Тесты с флагом `isRunnable: false` скрыты в списке, так как используются как прокси и не требуют запускаемого js-файла, либо требуют специализированной разработки.*

## Незаявленные тесты

Предыдущий агент планировал добавить:

- `hexaco60.js`
- `bis11.js`
- `oejts.js`
- `opd_sqs.js`
- `ipip16.js` (уже есть прокси в реестре)

Они пока не добавлены ни в реестр `isRunnable: true`, ни в виде файлов.
