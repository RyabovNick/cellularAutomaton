# The Forest

## Обитатели леса

- Деревья. Могут быть саженцом, деревом, древним деревом
- Лесорубы. Рубят деревья
- Медведи. Поедают лесорубов

## Течение времени

Симуляция идёт по месяцам. Каждый шаг - 1 месяц, 12 шагов - год.

## Лес

Будет двумерным. Входной параметр N - представляет размер леса (N x N). В каждой точке может находится Дерево, Медведь или Лесоруб. Они могут заниматься одно и тоже место.

Лес пораждается случайным образом.

- 10% от всего размера леса - Лесорубы
- 50% от всего размера леса - Деревья
- 2% от всего размера леса - Медведи

## События в лесу

Во время симуляции происходят различные события. По сути, события - это порождения новых деревьев, лесорубов, медведей или их смерть.

### Деревья

Каждый месяц дерево имеет 10% шанс породить новый саженец. В случайной свободной точке рядом с деревом есть 10% шанс создать сажанец.

После 12 месяцев существования саженец вырастает до дерева. Сажанец не может порождать другие деревья, пока не провератится в дерево.

Как только сажанец становится деревом он может начать пораждать другие сажанцы.

Когда дерево существует в течение 10 лет оно становится древним деревом. Древние деревья имеют 20% шанс порадить новый сажанец.

Если рядом с деревом нет свободных точек, то оно не будет пораждать новые деревья

### Лесорубы

Лесорубы каждый месяц бродят, они перемещаются до 3 раз в случайно выбранную точку, смежную в любом направлении (в середине карты есть 8 мест для перемещения).

Если лесоруб встречает дерево (не сажанец) то его странствия на этот месяц заканчиваются. Он будет рубить дерево на пиломатериалы. Нужно убрать дерево и получить 1 кусок пиломатериалов. Лесорубы не собирают саженцы. Древнее дерево - 2 пиломатериала.

Каждые 12 месяцев количество заготовленной древесины сранивается с количеством лесорубов в лесу. Если количество пиломатериалов равно или превышает количество лесорубов в лесу, то нанимается новый лесоруб.

`Пример:` в лесу 10 лесорубов, если они собрали 10-19 пиломатериалов, то нанимается ещё один, если 20-29 то 2, если 30-39, то 3 и так далее. Берём целую часть от деления количество пиломатериалов на количество лесорубов.

Однако если после 12 месяцев количество собранных пиломатериалов меньше количества лесорубов, то одного уволняют.

### Медведи

Они бродят по лесу, как и лесорубы. Медведь может пройти на 5 шагов за месяц. Если медведь встречает лесоруба, то прекращает своё блуждение на месяц. (Например, после 2х шагов медведь приземляется на точку вместе с лесорубом, он не будет делать больше ходов в этом месяце)

Медведь съедает лесоруба. Лесоруба нужно убрать из леса. Такие несчастные случаи надо отслеживать. Если за 12 месяцев несчастных случаев не произошло, то популяция медведей увеличивается на 1. Но если происходит несчастный случай, то лесорубы нанимают охотника, чтоб поймать медведя. Из леса убирается 1 случайный медведь. Если популяция медведей равна 0, то за следующий год не произойдёт никаких несчастных случаев и появится 1 медведь.

Если в лесу есть только 1 лесоруб и он встречается с медведем, то он будет отправлен домой, но новый лесоруб будет немедленно нанят и появится в другом случайно месте в лесу. Популяция лесорубов не опустится ниже 1.

## Время симуляции

Опционально

Или пока не останется 0 деревьев, саженцев или древних дерев

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
