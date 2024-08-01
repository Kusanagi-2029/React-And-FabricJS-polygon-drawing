# Рисование Многоугольников с React, TypeScript и FabricJS

## Оглавление

- [Описание проекта](#описание-проекта)
- [Технологии](#технологии)
- [Установка и запуск](#установка-и-запуск)
- [Доступные скрипты](#доступные-скрипты)
- [Архитектура проекта](#архитектура-проекта)
- [Дополнительная информация](#дополнительная-информация)

## Описание проекта

> [!TIP]
> Этот проект позволяет пользователям рисовать многоугольники, кликая на canvas-холст.
> Рисование начинается, когда нажата кнопка "Начать".
> Первый клик устанавливает начальную точку, а последующие клики добавляют точки к многоугольнику.
> Рисование завершается, когда пользователь кликает рядом с начальной точкой, завершая многоугольник.
> Площадь многоугольника отображается по завершении.

> [!CAUTION]
> СТОИТ ЗАМЕТИТЬ, что площадь пересекающихся внутренних отрезков не учитывается - расчёт идёт по Гауссу с определением центра масс многоугольника.

**Видео/Gif с DEMO**:
- https://github.com/user-attachments/assets/b361d995-08dd-42c7-8ae5-07a0d10d7cb1

Или на YouTube:
- https://youtu.be/hwm06ZQ0akI

**Скриншот пройденных тестов**:
![Тесты пройдены](https://github.com/user-attachments/assets/7e9d2376-9a9c-4ded-8d4b-6ef8b1942bb8)

## Технологии

- React с хуками
- TypeScript
- Jest для unit-тестирования
- FabricJS для работы с canvas-холстом
- Модульная архитектура с Feature Sliced Design
- SCSS для стилизации
- Webpack для сборки
- Линтер ESLint с конфигурацией Airbnb
- Prettier для форматирования
- Yarn

## Установка и запуск

1. Клонируйте репозиторий.
2. Выполните команду `yarn install` для установки зависимостей.
3. Запустите команду `yarn start` для запуска сервера разработки.
4. Выполните `yarn test` для запуска модульных тестов.
5. Выполните `yarn format` для форматирования кода с помощью Prettier.

## Доступные скрипты

В корневой директории проекта вы можете выполнять следующие команды:

### `yarn start`

Запускает приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

Страница перезагрузится, если вы внесете изменения.\
Также будут отображены все ошибки линтинга в консоли.

### `yarn test`

Запускает тесты в интерактивном режиме наблюдения.\

### `yarn build`

Собирает приложение для продакшена в папку `build`.\
Приложение корректно упаковывается в режиме продакшена и оптимизирует сборку для наилучшей производительности.

Сборка минимизирована, а имена файлов включают хеши.\
Ваше приложение готово к развертыванию!

### `yarn eject`

**Внимание: это необратимая операция. После выполнения `eject` вернуться назад уже нельзя!**

Если вы не удовлетворены выбором инструментов сборки и конфигурации, вы можете выполнить `eject в любое время. Эта команда удалит единую зависимость сборки из вашего проекта.

Вместо этого она скопирует все конфигурационные файлы и транзитивные зависимости (webpack, Babel, ESLint и т.д.) непосредственно в ваш проект, чтобы вы могли полностью контролировать их. Все команды, кроме `eject`, будут продолжать работать, но они будут ссылаться на скопированные скрипты, так что вы сможете их настроить. На этом этапе вы будете полностью ответственны за настройку.

Не обязательно использовать `eject`. Курсивный набор функций подходит для небольших и средних развертываний, и вы не должны чувствовать себя обязанным использовать эту функцию. Однако мы понимаем, что этот инструмент будет бесполезен, если вы не сможете его настроить, когда будете готовы.

## Архитектура проекта

Проект организован в соответствии с принципами **модульной архитектуры** попытка организации по Feature Sliced Design.
Осуществляется инкапсуляция модуля в проект через `index.js` - _PUBLIC API_

Структура директорий:

```
├───.idea
│   └───codeStyles
├───public
└───src
    ├───app
    ├───modules
    │   └───PolygonDrawer
    │       ├───components
    │       │   ├───ControlPanel
    │       │   └───PolygonDrawer
    │       ├───helpers
    │       ├───hooks
    │       └───tests
    └───shared
        ├───assets
        ├───types
        └───ui
            └───ControlButton
// конфиги
```

### Модульная архитектура - попытка в Feature Sliced Design

**Feature Sliced Design** (или **Feature-Based Architecture**) — это метод структурирования проекта, который фокусируется на разделении кода по функциональным частям. Основные принципы включают:

1. **Функциональная модульность**: Код разбивается на модули, где каждый модуль представляет собой независимую функциональность. Это позволяет легче поддерживать и расширять функционал приложения.

2. **Изоляция компонентов**: Компоненты и функции, относящиеся к определенной функциональной области, сгруппированы вместе. Это помогает избежать путаницы между различными частями кода.

3. **Масштабируемость**: Упрощает добавление нового функционала, так как новые функции добавляются в отдельные модули, не затрагивая существующие.

4. **Упрощенное тестирование**: Модули можно тестировать отдельно, что делает процесс тестирования более управляемым и эффективным.

### Преимущества подхода

- **Четкая структура**: Позволяет легко ориентироваться в коде и быстро находить нужные компоненты и модули.
- **Модульность**: Облегчает масштабирование и добавление новых функций.
- **Упрощенное тестирование и поддержка**: Каждый модуль можно тестировать и поддерживать отдельно от других.

Этот подход обеспечивает хорошую организацию и гибкость для роста и изменения проекта, делая его более устойчивым к изменениям и легче поддерживаемым.
