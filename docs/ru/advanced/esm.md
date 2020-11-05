# Модули EcmaScript

Модули EcmaScript - **официальный** формат модулей для языка JavaScript. `ESM` поддерживается ES4X с помощью одного из двух вариантов:

* Исходный скрипт имеет расширение `.mjs`
* Исходный скрипт имеет префикс `mjs:`

## Исходный скрипт

На первый взгляд, исходный скрипт не отличается от commonjs скрипта, например `index.mjs`:

```js
import { Router } from '@vertx/web';
import { someRoute } from './routes';

const app = Router.router(vertx);

app.route('/').handler(someRoute);

vertx.createHttpServer()
  .requestHandler(app)
  .listen(8080);
```

В данном случае `someRoute` импортируется из файла `routes.mjs`:

```js
export function someRoute(ctx) {
  ctx.response()
    .end('Hello from ES4X!');
}
```

## Совместимость

Вы могли заметить, что по причинам совместимости выражение `import` в исходном скрипте не содержит расширение:

```js{2}
import { Router } from '@vertx/web';
import { someRoute } from './routes';

// ...
```

Это маленькое расхождение с официальной спецификацией, по которой загрузчик ES4X будет искать модули в следующем порядке:

1. Искать по точному имени файла: `./routes`
2. Искать с суффиксом `.mjs`: `./routes.mjs`
2. Искать с суффиксом `.js`: `./routes.js`

::: warning
При работе с `ESM` функция `require()` недоступна!
:::

## Скачивание модулей

Также возможно скачивание модулей во время выполнения. Эта возможность не `ES4X`-специфична. На деле она просто полагается на официальный загрузчик модулей из `GraalJS`. Импорт таких модулей очень прост:

```js
import { VertxOptions } from 'https://unpkg.io/@vertx/core@3.9.1/mod.mjs';
```

Следует помнить несколько правил:

1. **HTTP** модули не будут скачаны, если [менеджер безопасности](./security) не работает.
2. Если у модуля есть аналогичный `maven` модуль, он **НЕ** будет скачан.
3. Скачивание исполняемого кода во время выполнения может привести к проблемам с безопасностью.

Данная возможность может быть полезной в некоторых случаях, например, чтобы избежать зависимости `npm`, если код не является публичным.

::: warning
Скачанные модули не будут обрабатывать зависимости или аналогичные maven модули.
:::