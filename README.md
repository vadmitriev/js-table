# Просмотр популярных репозиториев на Github

Веб-приложение представляет рейтинг популярных репозиториев на Github по интересующей технологии. <br><br>
Особенности:

- Пользователь указывает в поле ввода интересующую технологию. При нажатии на кнопку "Загрузить" происходит загрузка элементов с API Github и отображение в таблице 5x10 (без учета заголовков);
- При нажатии на кнопку "Очистить" все данные очищаются;
- Приложение написано на чистом Javascript без использования вспомогательных библиотек и фреймворков;
- Реализована сортировка элементов при клике на заголовок столбца;
- Каждую строку таблицы можно удалить отдельно по нажатию кнопки в столбце "Delete";
- Строки таблицы можно перемещать между собой (механизм drag & drop);
- Столбцы и строки можно ресайзить;
- Реализована пагинация таблицы;
- Данные сохраняются в localStorage.

## Демо

Посмотреть можно по ссылке: <a href="https://js-table1.web.app">js-table1.web.app</a>

## Установка

```console
git clone https://github.com/vadmitriev/js-table
```

```console
cd js-table
```

```console
npm install
```

```console
npm run start
```
