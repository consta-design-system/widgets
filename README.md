# [Дизайн-система Consta](https://consta.design/) | Библиотека графиков

> Эта версия библиотеки поддерживается, но больше не развивается
> [Посмотреть актуальную библиотеку графиков](https://github.com/consta-design-system/consta-charts)

Библиотека графиков: линейные, столбчатые, круговые диаграммы и другие компоненты, с помощью которых удобно показывать статистику. Библиотека сделана на основе [D3.js](https://d3js.org/).

[NPM](https://www.npmjs.com/package/@consta/widgets) | [Документация и стенд](http://widgets.consta.design) | [Макеты в Figma](https://www.figma.com/community/file/955853026322123186)

Следите за новостями и релизами в [телеграм-канале дизайн-системы](https://t.me/consta_ui_releases)

## Как использовать

### Установите пакет

```sh
# NPM
$ npm i @consta/widgets
# Yarn
$ yarn add @consta/widgets
```

### Подключите зависимости

Чтобы начать работу, установите библиотеку [@consta/uikit](https://www.npmjs.com/package/@consta/uikit) и [настройте тему](https://consta.design/libs/portal/theme-themeabout)

### Можно использовать компоненты

Пример импорта:

```tsx
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { BarChart } from '@consta/widgets/Barchart';
```

## Документация и стенд

На стенде можно менять параметры и смотреть, как меняются компоненты. Документация — во вкладке у каждого компонента.

[Вперёд, к стенду](https://consta.design/libs/charts)

## Разработка

### Подготовка окружения

Рабочее окружение должно содержать NodeJS и Yarn.

Чтобы установить зависимости, выполните команду:

```sh
$ yarn install
```

### Основные команды

```sh
# Запуск локального сервера для разработки
$ yarn start

# Сборка пакета
$ yarn build

# Сборка стенда
$ yarn stand:build

# Запуск тестов
$ yarn test
```

## Контрибьюторам

Будем рады, если вы захотите принять участие в разработке дизайн-системы =) Но сначала прочитайте [инструкцию для контрибьюторов](https://consta.design/libs/portal/contributers-code).

## Лицензия

Дизайн-систему можно использовать бесплатно, она распространяется на условиях [открытой лицензии MIT](https://consta.design/static/licence_mit.pdf).
