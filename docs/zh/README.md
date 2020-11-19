---
home: true
heroImage: /hero.png
actionText: 由此开始 →
actionLink: /zh/get-started/
footer: MIT Licensed | Copyright © 2018-present Paulo Lopes
---

<div class="features">
  <div class="feature">
    <h2>精简优先</h2>
    <p>最小化配置基于npm的项目结构，帮助您专注于您的代码。</p>
  </div>
  <div class="feature">
    <h2>Vert.x助力</h2>
    <p>您可享受由<a href="https://vertx.io">Vert.x</a>提供的高性能及可扩展性，在JavaScript中使用Vert.x响应式编程，并使用JavaScript或<a href="https://www.typescriptlang.org/">TypeScript</a>。</p>
  </div>
  <div class="feature">
    <h2>性能表现</h2>
    <p>ES4X基于GraalVM提供的<a href="https://www.techempower.com/benchmarks/#section=data-r18&hw=ph&test=db&l=zik0sf-f">高性能JavaScript</a>应用可匹敌甚至超越<a href="https://www.techempower.com/benchmarks/#section=data-r18&hw=ph&test=db">Java</a>应用。</p>
  </div>
</div>

### 就像1，2，3一样简单

``` bash
# (1) create
npm init @es4x project

# (2) install dependencies
npm install # OR yarn

# (3) run
npm start # OR yarn start
```

::: 兼容性说明
ES4X 需要 [GraalVM](https://www.graalvm.org) 或者 Java >= 8. 如果不确定你的系统上已经安装的是哪个版本，可以考虑使用 [jabba](https://github.com/shyiko/jabba)
:::
