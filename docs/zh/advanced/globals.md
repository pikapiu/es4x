# 全局
GraalJS 是一个纯 JavaScript 引擎，这意味着会缺少一些全局对象(它们不是标准的，但很常见)，ES4X 尝试添加这些缺失的特性，或者对原有的默认功能进行增强，就像下面这样：

## require()
官方标准并没有定义 ***require()*** 函数，ES4X 有自己的实现，在 [commonjs](./commonjs.md) 中有描述

## setTimeout()
***setTimeout()*** 方法设置一个计时器，计时器到期时执行函数或指定代码段。此方法被添加到全局作用域并使用 ***Vert.x Timers***：
```javascript
setTimeout(handler => {
  console.log('Hello from the future!')
}, 2000);
```

## setInterval()
***setInterval()*** 方法设置一个计时器，该计时器重复执行函数或指定代码段。此方法被添加到全局作用域并使用 ***Vert.x Timers***：
```javascript
setInterval(handler => {
  console.log('Hello again from the future!')
}, 2000);
```

## setImmediate()
***setImmediate()*** 方法在下一个事件循环槽上执行函数或指定的代码段。此方法被添加到全局作用域并使用 ***Vert.x Timers***：
```javascript
setImmediate(handler => {
  console.log('Hello again from the future!')
});
```

## clearTimeout()
清除超时。

## clearInterval()
清除超时。


## clearImmediate()
这个函数的存在是为了确保许多库不会被中断，但是在基于 Vert.x Event Loop 的计划回调上不会生效。

## process Object
process object(流行在nodejs 上) 在  ES4X 上也是可用的，只是可配置的属性不多。
```java
{
  env,          // process environment variables (read only)
  pid,          // current process id
  engine,       // constant 'graaljs'
  exit,         // function that terminates the process with optional error code
  nextTick,     // enqueue a callback to be executed on the next event loop slot
                // NOTE: this behavior is different from nodejs
  on,           // event emmiter function binding
  stdout,       // JVM System.out
  stderr,       // JVM System.err
  stdin,        // JVM System.in (WARNING this will block the event loop)
  properties,   // JVM System properties (read, write)
  cwd           // Function that returns the CWD
}
```

## console Object
 ES4X 也增加了 Console，这个对象拥有典型的 API:
 ```
console.debug('Hello', 'World', '!')
console.info('Hello', 'World', '!')
console.log('Hello', 'World', '!')
console.warn('Hello', 'World', '!')
console.error('Hello', 'World', '!')
 ```
 堆栈跟踪(包括 JS 和 JVM)可以这样被打印：
```java
try {
  throw new Error('durp!')
} catch (e) {
  console.trace(e);
}
```

## Async Error Tracing
想象一下以下代码：

```js
function one() {
   two(function(err) {
     if(err) throw err;
     console.log("two finished");
   });
}

function two(callback) {
  setTimeout(function () { 
    three(function(err) {
      if(err) return callback(err);
      console.log("three finished");
      callback();
    });
  }, 0);
}

function three(callback)
{
  setTimeout(function () { 
    four(function(err) {
      if(err) return callback(err);
      console.log("four finished");
      callback();
    });
  }, 0);
}

function four(callback) {
  setTimeout(function(){
    callback(new Error());
  }, 0);
}

one();
```

如果您运行上述代码，您将会看到如下的错误信息：

```
Error
    at Timer.callback (example.js:34)
```

对于debug来说，这是非常淡疼的。 

为了简化这一点，ES4X将所有的异常堆栈信息整合在了一起，你可以使用一个函数包主它，每次只需要处理回调而不是直接传递错误。

```js
var asyncError = require('async-error');
var fs = vertx.fileSystem();

function one() {
  two(function (err) {
    if (err) {
      console.trace(err);
      test.complete();
      return;
    }

    console.log("two finished");
    should.fail("Should not reach here");
  });
}

function two(callback) {
  setTimeout(function () {
    three(function (err) {
      if (err) {
        setTimeout(function () {
          callback(asyncError(err));
        }, 0);
        return;
      }

      console.log("three finished");
      callback();
    });
  }, 0);
}

function three(callback) {
  setTimeout(function () {
    four(function (err) {
      if (err) {
        setTimeout(function () {
          callback(asyncError(err));
        }, 0);
        return;
      }

      console.log("four finished");
      callback();
    });
  }, 0);
}

function four(callback) {
  setTimeout(function () {
    fs.readFile("durpa/durp.txt", function (ar) {
      if (ar.failed()) {
        callback(asyncError(ar));
      }
    });
  }, 0);
}

one();
```

当文件 `durpa/durp.txt` 不存在时，您将会看到：

```
Error: File not found!
    at stacktraces/jserror.js:24:20
    at stacktraces/jserror.js:40:20
    at stacktraces/jserror.js:53:14
    at stacktraces/jserror.js:53:25
    at classpath:io/reactiverse/es4x/polyfill/global.js:25:18
```

上述错误发生在 JS 中。

亦或是：

```
io.vertx.core.file.FileSystemException: java.nio.file.NoSuchFileException: durpa/durp.txt
	at <async>.<anonymous> (stacktraces/index.js:30)
	at <async>.<anonymous> (stacktraces/index.js:46)
	at <async>.<anonymous> (stacktraces/index.js:61)
	at io.vertx.core.file.impl.FileSystemImpl$13.perform(FileSystemImpl.java:740)
	at io.vertx.core.file.impl.FileSystemImpl$13.perform(FileSystemImpl.java:732)
	at io.vertx.core.impl.ContextImpl.lambda$executeBlocking$1(ContextImpl.java:275)
	at io.vertx.core.impl.TaskQueue.run(TaskQueue.java:76)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Thread.java:748)
Caused by: java.nio.file.NoSuchFileException: durpa/durp.txt
	at sun.nio.fs.UnixException.translateToIOException(UnixException.java:86)
	at sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:102)
	at sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:107)
	at sun.nio.fs.UnixFileSystemProvider.newByteChannel(UnixFileSystemProvider.java:214)
	at java.nio.file.Files.newByteChannel(Files.java:361)
	at java.nio.file.Files.newByteChannel(Files.java:407)
	at java.nio.file.Files.readAllBytes(Files.java:3152)
	at io.vertx.core.file.impl.FileSystemImpl$13.perform(FileSystemImpl.java:736)
	... 7 more
```

上述错误发生在Java中。

## Date
Many APIs from Vert.x return an Instant as temporal type

许多 Vert.x 的接口返回 ***Instant*** 作为时间类型，为了在 JS 使用它们，添加了静态函数 ***Date*** 对象：
```js
let instant = someJVMInstant
let d = Date.fromInstant(instant)
```

## ArrayBuffer
数组缓冲区是一种内置类型，但是，如果需要互操作，JVM ByteArray 应该传递给构造函数，这允许在不涉及副本的情况下访问基础缓冲区
```js
let javaBuffer = someJavaBuffer
let b = new ArrayBuffer(javaBuffer)
// the underlying buffer can be read using
b.nioByteBuffer
```