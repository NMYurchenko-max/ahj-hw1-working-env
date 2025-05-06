# Домашнее задание к занятию "1. Рабочее окружение"

**Важно**: все задачи к данной лекции можно выполнить в виде одного репозитория (т.е. допускается не делать отдельные репозитории на каждую задачу).

## Continuous Deployment

### Описание

Воспользуйтесь пошаговой инструкцией ниже, чтобы развернуть тестирование, сборку и deployment на GitHub Actions и GitHub Pages.

В качестве шаблона для развёртывания используйте [проект](https://github.com/netology-code/ahj-code/tree/master/env).

Не забудьте поставить бейджик со статусом в `README.md`.

**В качестве результата пришлите проверяющему ссылку на ваш GitHub-проект.**

### Инструкция

1. Скачать [репозиторий](https://github.com/netology-code/ahj-code/tree/master/env)

2. Создать новый репозиторий на github
3. Скопировать в новый репозиторий папку `env`
4. Настроить новый репозиторий. Указать в нём использование GitHub Action для публикации приложения, вместо публикации из ветки (gh-pages)
   ![alt text](./github-setup.png)

5. В файле `REAME.md` в строке

```md
![CI](https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/web.yml/badge.svg)
```

Заменить `<OWNER>` на ваш ник на github;

Заменить `<REPOSITORY>` на название вашего репозитория;

## Реализация задания (пошаговое выполнение)

### Cоздание package.json

с менеджером пакетов yarn

1. Создать файл package.json в корне проекта: `yarn init`?
2. Ответы на вопросы:
3. Ввести имя проекта: `ahj-hw1-working-env`
4. Ввести описание проекта: `Домашнее задание к занятию 'Рабочее окружение'`
5. Ввести имя автора: `N.Yurchenko`
6. Ввести версию проекта: `1.0.0`

7. Ввести лицензию: `ISC`

Почему:

- MIT - это лицензия, которая позволяет использовать, копировать, изменять и распространять программное обеспечение без ограничений;
- ISC - это лицензия, которая позволяет использовать, копировать, изменять и распространять программное обеспечение без ограничений, но с обязательным указанием авторских прав и отказа от каких-либо гарантий;
- Выбор между MIT и ISC зависит от того, какие гарантии вы хотите предоставить пользователям вашего проекта. Если вы хотите предоставить гарантии, то выберите ISC, если нет, то выберите MIT.

Репозиторий: `https://github.com/NMYurchenko-max/ahj-hw1-working-env.git`

`yarn init --repository https://github.com/NMYurchenko-max/ahj-hw1-working-env.git -y` (-y - автоматический ответ на все вопросы)
Это команда для инициализации проекта с использованием Yarn. Она создает файл package.json, который содержит информацию о проекте, такую как имя проекта, версия, автор и другие данные.

### Установить зависимостей

`yarn add --dev @babel/cli @babel/core @babel/preset-env @eslint/js babel-loader css-loader css-minimizer-webpack-plugin eslint eslint-config-prettier eslint-plugin-jest eslint-plugin-prettier globals html-loader html-webpack-plugin http-server jest mini-css-extract-plugin prettier terser-webpack-plugin webpack webpack-cli webpack-dev-server webpack-merge`

### Скрипты

```json
"scripts": {
    "start": "webpack serve --config webpack.dev.js", 
    "build": "webpack --config webpack.prod.js", 
    "lint": "eslint . --fix", 
    "test": "jest", 
    "coverage": "jest --coverage", 
    "preshow:coverage": "npm run coverage", 
    "show:coverage": "live-server coverage/lcov-report", 
    "preshow:dist": "npm run build", 
    "show:dist": "http-server dist" 
  }
```

Где:

- start: запускает webpack-dev-server с конфигурацией webpack.dev.js,
  которая используется для разработки.
- build: запускает webpack с конфигурацией webpack.prod.js,
  которая используется для сборки проекта в продакшн-режиме.
- lint: запускает eslint для проверки кода на соответствие правилам и исправления ошибок.
- test: запускает тесты с использованием jest.
- coverage: запускает тесты с отчётом о покрытии кода тестами.
- preshow:coverage: запуск тестов с отчётом о покрытии кода тестами.
- show:coverage: запуск сервера с отчётом о покрытии кода тестами в браузере.
- preshow:dist: запуск сборки проекта в продакшн-режиме с минификацией
  и оптимизацией кода и запуск сервера с отчётом о покрытии кода тестами в браузере.
- show:dist: запуск сервера с отчётом о покрытии кода тестами в браузере 
  и запуск сервера с отчётом о покрытии кода тестами в браузере.

### Создаем файл конфигурации для GitHub Actions

- определяет, что должно происходить при определенных событиях,
таких как отправка кода в репозиторий или создание запроса на слияние.

Установить web.yml в папку .github/workflows:

```bash
//создать папку .github
mkdir .github
//создать папку workflows
mkdir .github/workflows
//создать файл web.yml
touch .github/workflows/web.yml
```

```yml
name: ahj-hw1-working-env
on: 
  push:
  workflow_dispatch:

permissions:
  contents: read // разрешает доступ к содержимому репозитория
  pages: write // разрешает доступ к настройкам страниц GitHub Pages
  id-token: write // разрешает доступ к идентификатору токена GitHub

concurrency:
  group: 'pages' // группа конвейера, используемая для управления параллелизмом конвейера
  cancel-in-progress: false 
  // отменяет выполнение текущего конвейера, если уже есть другой конвейер, 
  //который выполняется с той же группой конвейера

jobs:
  eslint:
    runs-on: ubuntu-latest 
    // указывает, что задание будет выполняться на последней версии Ubuntu
    steps:
      - uses: actions/checkout@v4 // используется для проверки кода из репозитория
      - uses: actions/setup-node@v4 // устанавливает Node.js на последней версии
        with:
          node-version: 22.14.0
          cache: 'yarn'
      - run: yarn  // устанавливает зависимости с помощью Yarn
      - run: yarn lint // запускает задачу lint

  test:
    runs-on: ubuntu-latest 
    // указывает, что задание будет выполняться на последней версии Ubuntu
    steps:
      - uses: actions/checkout@v4 // используется для проверки кода из репозитория
      - uses: actions/setup-node@v4 // устанавливает Node.js на последней версии
        with:
          node-version: 22.14.0
          cache: 'yarn'
      - run: yarn
      - run: yarn test // запускает задачу test

  build:
    needs: [eslint] 
    // запускается только после успешного завершения задачи eslint 
    //(стандартный порядок выполнения задач [eslint, test])
    environment:
      name: github-pages // указывает, что задание будет выполняться в окружении github-pages
      url: ${{ steps.deployment.outputs.page_url }}  // указывает URL страницы GitHub Pages
    runs-on: ubuntu-latest 
    steps:
      - uses: actions/checkout@v4 // используется для проверки кода из репозитория
      - uses: actions/setup-node@v4
        with:
          node-version: 22.14.0
          cache: 'yarn'
      - run: yarn // устанавливает зависимости с помощью Yarn
      - run: yarn build // запускает задачу build
      - name: Setup Pages // настраивает GitHub Pages
        uses: actions/configure-pages@v4 // используется для настройки GitHub Pages
      - name: Upload artifact // загружает созданный артефакт
        uses: actions/upload-pages-artifact@v3 // используется для загрузки артефакта
        with:
          path: 'dist' // указывает путь к созданному артефакту
      - name: Deploy to GitHub Pages // развертывает созданный артефакт на GitHub Pages
        id: deployment // идентификатор задачи
        uses: actions/deploy-pages@v4 // используется для развертывания артефакта на GitHub Pages

```

### В файле `REAME.md` добавить ссылку на GitHub Actions

на основании репозитория
`https://github.com/NMYurchenko-max/ahj-hw1-working-env.git`

```md
![CI](https://github.com/NMYurchenko-max/ahj-hw1-working-env/actions/workflows/web.yml/badge.svg)
```

### проверяю работу yarn

Добавляю в html файлы элемент

```html
<p>Добавляю контент-блок</p>
<div class="root"></div>
```

И добавляю измененния контента с помощью js (setTimeout, class Example)

```bash
yarn lint
yarn test
yarn build
yarn start
```

### Соединение с GitHub

```bash
git init
git add .
git commit -m "Inition commit"
git remote add origin https://github.com/NMYurchenko-max/ahj-hw1-working-env.git
git push -u origin master
```
