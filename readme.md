JavaScript测试驱动开发

tdd驱动开发

自动测试驱动编写，代码修改加速，有测试确保功能正确；有利于模块化，高内聚，低耦合代码~

具体方法：
细化测试：如果测试很难进行，说明
分而治之：如果功能很难测试，说明功能设计不够内聚或太耦合
采用spike解决方案，建立一次性可执行原型，成功后移植？

// karma是一个轻量级服务器，用于管理不同浏览器中测试的加载和执行。你可以告诉karma想使用什么浏览器，以及使用什么测试工具，其余由karma负责~~~

"test": "istanbul cover node_modules/mocha/bin/_mocha"
"test": "karma start --reporters clear-screen,dots,coverage"

// 测试的运行环境：服务端（nodejs），客户端（karma）----都可以对js进行测试

// 测试的意义在于：1、驱动完善功能代码；2、当对代码进行修改时，能够确保满足功能需求~
// 测试代码编写的规则：1、正向测试；2、反向测试；3、异常测试？

// 异步函数的测试---支持callback形式和promise形式
1、结果异步返回
2、超时如何处理？
3/推荐使用promise而不是callback，promise测试更优雅~

// 异步处理，如获取地理位置信息，导致无法获取信息的bug很多，且测试较慢，需要进一步优化~~~
// 减少这些依赖~~you’ll explore ways to replace them with test doubles like fakes, stubs, mocks, or spies.

阅读记录：75页~~~！！！！
