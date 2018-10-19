## 伸展

- 紧张 --> 本能想缓解 --> 无法释放 --> 什么导致无法释放

  - 寻找这个力 --> 顺应这个力的作用--> 本能的释放这个力..
  - 历史波形的运动 --> 原始的起点什么都没有 --> 慢慢的上升...

- 压抑

- 回避

  - 选择遗忘...

- 紧张

  - 本性无法伸展
  -

- 额外的地方来表达游戏的数据...

  - type data 真正的 class 只是具体的实现...

- @ques behave 可以只关联 data 的一个属性...

  - 可以对多个属性使用同一个 behave, findBehave(data, class);
  - 比方说 从数组中寻找 删除一个对象...
  - 能不能是一组属性呢...
  - 将对象的任意组合属性 扔给一个 behave 去操作...
  - 需要一个名称去寻找这个 behave..
  - 如果是一个基本类型就需要将自己传进去...

- @ques 每次我都需要到数组中寻找一个 hehave 会不会消耗性能呢

- @ques behave 能不能再包含 behave 呢...

- @ques 将初始化 behave 的代码放在 data 中, 会不会不清晰...

## 2018-10-16 09:06:54

- @ques 重复如何去做...

  - 如果 只有三个要三个重复我如何去做
  - copy 我无法 copy 啊
  - 用 scrollRect 控制显示的, 看着像显示 3 个其实只有一个...
    - 好像可行
    - 用隐藏所有来控制重复效果...
    - scrollRect 为负数会出问题..

- vscode indent mardown 2

- laya scrollRect 负数

- @ques 如果跳跃前进如何处理

- 多页切换 只能 复制节点
  - 如何复制节点 itemRender array
  - 必须支持简单的形式...
  - 支持两种模式 一种原来的单页切换
  - 一种是多页切换 itemRender...

## 2018-10-15 09:00:27

- @ques 上个星期六的 bug 如何处理...

- @ques 能不能将 compose 去掉.. compose

  - compose --> data --> compose 这样的结构实在多余
  - data --> data 这样比较好...

- @ques 能不能将真正有意义的数据 和为了实现而创建的数据 分开

  - 目标数据 + 过程数据...

- @todo 铅笔...

- 我感觉自己的 config 是为了抽离而抽离 没有太大的实际意义...

- 面向对象中有许多重复的代码, 如何将这些代码抽离复用...

  - 比方说从数组中找到某个元素 删除某个元素...
  - 可以抽离出一个方法

- 我的目的是更清晰的组织代码, 更好的复用...

- 让数据来控制行为...

- 将所有对节点的渲染放到一起, 或者将所有数据和非数据的部分提纯...

- @ques 能不能将节点动画部分提取出来...

## 2018-10-11 09:22:16

- @bug 有时候不正常 划过去又回来了...

  - 可能是点击 cur_index 没有用

- @ques 如何 copy sprite

  - 哪些属性可以复制 哪些又不可以呢
  - 常用属性, 在编辑器中的常用属性...
  - 其他的不用处理
  - \*\* 行不通
  - xml 的形式来创建, 像 html 一样...
    - item_template + data

- 循环滚动如何处理...

  - @ques 计算每次最多可以滑动的页数...
  - con 宽度/move_space
  - 在前后分别插入特定的个数...
  - `整个个数 >= 显示个数 + 滑动个数 * 2`

- @ques 还能如何分割功能

- 哪些可以独立出来....

* @ques 滑动到边界 滑动阻力 如何处理...

* @ques 最后一页必须显示满如何处理

* @ques 如果我在这建立多个类 config 数据如何复制多个...

* @ques on_end 这是行为放在 data 里面很奇怪...

  - 还有乱七八糟的节点数据怎么处理...

* @ques 划过多页如何处理...

- @ques 这个多页切换能不能像

- @ques list 一样的 填充子类...

- @ques 超过限制如何处理...
  - 页面最多显示几个 其他全部隐藏...
  - @ques 怎么没有超过界限报错...

## 2018-09-11 10:10:50

- 电脑蓝灯...
- gayhub ..P

- @thk entity 将数据(data)和对数据的改变(method)拆分出来
  - 将很多 data 和 method 进行组合成为一个集合
  - 这个集合拥有很多属性以及改变属性...
  - 这使得数据和方法相互脱离...
  - 这就是 rust 一个 strut(data) 可以支持 impl 多个 trait(method), 原生支持的理念
  - ...
  - @ques 我用 js 如何实现这种功能

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
