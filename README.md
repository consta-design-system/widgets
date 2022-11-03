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

Чтобы начать работу, установите библиотеку [@consta/uikit](https://www.npmjs.com/package/@consta/uikit) и [настройте тему](https://portal.consta.design/libs/portal/theme-themeabout)

### Можно использовать компоненты

Пример импорта:

```tsx
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { BarChart } from '@consta/widgets/Barchart';
```

## Разработка

### Подготовка окружения

Рабочее окружение должно содержать NodeJS и Yarn, необходимые версии можно узнать в файле [package.json](./package.json) в блоке **engines**.

Чтобы установить зависимости, выполните команду:

```sh
$ yarn install
```

### Основные команды

```sh
# Сборка и старт
$ yarn start

# Сборка для production
$ yarn build

# Линтинг всех файлов
$ yarn lint

# Форматирование всех файлов prettier
$ yarn format

# Запуск юнит-тестов
$ yarn unit

# Запуск юнит-тестов, тестирование TS, линтинг файлов
$ yarn test
```

## Документация и стенд

На стенде можно менять параметры и смотреть, как меняются компоненты. Документация — во вкладке у каждого компонента.

[Вперёд, к стенду](https://charts.consta.design/)

## Лицензия

Дизайн-систему можно использовать бесплатно, она распространяется на условиях [открытой лицензии MIT](https://consta.design/static/licence_mit.pdf).
