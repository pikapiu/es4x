# GraalVM

ES4X 使用的是Graalvm，但同样的代码可用 Java8，9，10 及 OpenJ9 **解释执行** 或使用 JDK >=11 (支持 JVMCI) 和 GraalVM **编译执行**。

::: 也就是说, 请使用 Java 版本 >= 11 或者 GraalVM。:::

推荐使用GraalJS，因其提供支持 ES版本 >= 6的JS 及提供开箱即用的generators，promises等工具。

# 与 Nashorn 的差异

和 ***Nashorn*** 不同，***GraalJS*** 与 ***Java*** 互操作需要**严格**遵循Java中类/方法的名称。例如获取类的属性时，必须使用getter和setter。举个例子：

```java
class Hello {
  private String name;
  
  public String getName() {
    return name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
}
```

当您在Graal中使用Java对象时，下面的代码将是无效的：

```js
var hello = new Hello();
// get the name
var name = hello.name; // FAIL
// set the name
hello.name = 'Paulo';  // FAIL
```

在Graal中您应该这样写：

```js
var hello = new Hello();
// get the name
var name = hello.getName();
// set the name
hello.setName('Paulo');
```

# 线程
GraalJS 非常严格，每次在JS上下文中只能有一个线程。仅当使用异步的 Vert.x APIs时这才不是问题，但是使用其他的库仍然可能会引发问题。为了避免这个限制，推荐使用 **Worker** API 或者 **EventBus**

## Native Images

目前我们还不能生成 ES4X 的 native 镜像，这是因为AOT编译器做静态分析时无法触及那些被脚本调用的java代码（也就没办法获取到java类），
此外，编译器目前还不支持运行时的JVM互操作。

这方面的工作正在进行中，相信在不久的将来就会与大家见面。

