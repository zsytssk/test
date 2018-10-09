## 2018-09-11 10:10:50

- 电脑蓝灯...
- gayhub ..P

## game mvc

- 代码不是最新的...

- ctrl

  - 事件绑定
  - localIdToServer

- @ques view 需要哪些方法

  - this.node 也不一定

- @ques 事件绑定 到底放在哪里??

- getDockerView 这一个个有很多的代码是相同的能不能合并

  - getItem('name')..
  - 创建的方法参数不一样
  - ...
  - 不一定要 link 来保存所有的参数了...
  - 而且这一个个写很多遍也很烦
  - ...
  - 但是可以保证 class 只有在需要的时候才会被创建!!!!

- @ques model view 是否需要在 ctrl 内部还是外部去创建...

  - 内部可以封装
  - 但是 seatView 无法在 seatCtrl 中去创建
    - seatView 是在 roomView 中创建的, seatCtrl 不知道 roomView...

- @note 大部分的 ctrl 是没有 model 对应可以直接转换为 view

- @ques roomView reset
  - 如果是按需 reset, 那么这些 ctrl 根本就不知道创建了几个
  - 怎么知道哪些需要 reset 呢..
  - 子类去监听父类的 reset 事件
    - 这是在 view 身上, view 根本就不是树的结构...

## seat mvc

- @note view 直接继承 event 就可以了, 或者什么都不用继承...

  - 对上的依赖如何处理...

- @ques findCardByModel...

* @ques git subtree 能不能 sub folder

* 我能不能自己做一个 dom 的展示而不是一个 laya 项目

  - laya 实际的需求

* 保证所有的功能

* @imp mvc

  - v 就像现在的 model 一样不知道其他的所有一切, 只管渲染页面
  - c 就是页面的联系, 游戏的业务逻辑...

* UML

  - code to UML
  - 如何写 UML

* @imp 各部分都使用 socket, 我如何将他们分离出来

* Elm 如何组织代码

  - 函数式编程的优点
  - 缺点 组织大型代码

* @imp component 如何复用代码...

<!-- markdownlint-disable MD041 -->

- 炸弹狗 code review

- cdn 负载纵横

- bridge 桥接

  - 如何将实现和联系分离

- `await getBridge('card_heap_ctrl')`

  - BridgeCLass('card', card)
  - 将事件发送出去, 取消所有对外部的依赖
  - 通过 bridge 类, 来处理所有的依赖关系...

- 将一切都变得加单已用的 api..

- @ques compound component

  - component 如何组合 component manager []?

- @note To support external linking, component interfaces should specify

  - the shape of imports
  - @ques 怎么把对外界的依赖 interface 化

- markdown disable file

- @ques prettier markdown 乱换行

- development of large programs and deployment of components

  - 大型软件开发的经验

- 大型软件开发

  - @ques 如何依赖抽象 不依赖具体的实现

  - 最大限度的复用 + 健壮 + 适应变化

  - 复用 多态 封装 | 重复 + 依赖

  - 简洁创建对象 工厂创建
    - 减少对具体类的依赖

## 2018-08-18 11:57:22

- @ques markdown lint config

  - [config](https://github.com/markdownlint/markdownlint/issues/67)
  - [creating_styles](https://github.com/markdownlint/markdownlint/blob/master/docs/creating_styles.md)

- @ques 能不能做成 pwa
- @ques indexDb

- web worker

  - 游戏开始的时候将变量传过去
  - 然后将重要的计算在那边计算
  - web worker 能支持 共享对象吗 应该不行啊
  - @imp 蒙哥说的 是什么 放到 web worker 中...

## 2018-08-18 10:00:49

- @ques 这些对我有什么用

  - 比方说我做一个 ui, 里面要引入一个 js 中的 class
  - 其实我的 ui 只是一段 js 代码, 我要自动补全, 我发送请求给 lsp
  - 将 lsp 返回的显示在 ui 编辑器中, 编辑器选择之后, 自动生成相应的 js 代码...

- @ques tsc -p

- 怎么 request

  - 如果是 http 协议 我怎么知道 在什么端口呢??
  - ...
  - 我不知道在什么端口啊

- vscode-jsonrpc

- @ques 如果我想在语言解析一个文件 或者一个 project 如何处理..

- @ques 我如何建立一个 node 和 server, 又如何相互的联系呢??

- 我又如何将这打包成一个 extension 呢

## lsp 如何解析一个文件

- 定义的变量 class function

- vscode 大纲 如何实现这些功能...

  - executeDocumentSymbolProvider

- Language Server Protocol getSymbol document
  - textDocument/documentSymbol

-| Language Server Protocol 到底是怎么做的
-> 怎么读取某个文件中有几个类几个 export

- @ques executeCommand 能运行哪些 command

- @ques tsc 应该自带 ts lsp 怎么没有啊

- 编辑器上的选择摸个类 怎么放映到代码上...

## gitlab

- gitlab 分组

- gitlab-ci 是什么

- gitlab flow

- Git 项目测试人员 Reporter

- 在一个分支上如何提醒团队成员

- merge request dev zhangjunqing