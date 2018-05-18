## 2018-05-09 08:54:58

* @ques 能不能直接在 js 中使用图片

  * css-loader
  * style-loader
  * sass-loader

  * vue load css js

* webpack sass-loader 到底能干什么..

* @ques electron react 样式

  * 中的图片放在什么地方
  * css 如何组织...
  * css js images 如何组织
  * electron react render 项目结构

    * react 项目结构

  * @qeus 如何合并图片...

* @ques 能不能像 postcss 一样 css 中的图片合并打包...'

* 如何用 webpack 打包图片

* @ques 如何在 render 中添加图片, 文件的位置是

* item 需要展开收起 需要图标 需要选中状态
  * 文件夹展开收起状态不一样

- @qeus 每次都需要重绘页面所有的
  * @ques 为什么会重绘??
  * Group render 中每次都需要遍历 可能这里面就每次 重新创建了
  * 每次我调节 panel 的位置都会重绘 这个如何处理???
  * 我基本上没有办法去处理..

* @ques 层级结构如何处理

  * 数据结构
  * 样式

* 继承的样式和自己的特殊样式如何处理

  * ...

* @ques 天啦, laya 里面每一个 panel 都是用 canvas 绘制的

- @note assets_panel 资源 panel 用来放 laya 对应的资源
  * @ques 如何将文件夹的层级结构表示出来
  * @ques 不同的类型如何使用不同的图标
  * @ques 如何同类型的多个文件合并成一个 item

* @ques 如何不断的递进将 splitRadio 清除

  * 只有一个子类

* @ques 如何子类不止

* @ques 如何判断子类 state 的深度

* @ques 删除中间多余的 group

  * 父类只有一个 children, 这把 这个 group 的父类换成自己
  * 这个我如何处理??
  * 我每次删除对象 查看他的兄弟节点是否是一个???
  * 如过兄弟节点只有一个 将自己换成他的子类
  * ---
  * 每次 groupContainer 都会导致 group 的层级变深
  * removepanel 只会删除 group 而不会将加深的 group 删除

* @ques 在一个 group 中无法创建超过两个的子集

## 2018-05-07 09:12:37

* @bug 不停的切换导致 group 的层级不断加深
* @bug 删除一个对象 split_radio 没有相应的修改

* split_radio 使用当前的值
  * [0.1, 0.5, 0.8, 1], 这种形式

## 2018-05-02 09:41:00

* @note sash 的动作是所有 group 中的所有的都要动

  * 假如我一个 group 里面只有一个 sash 我只需要控制这个 sash。。
  * 可以左右滑 可以上下滑
  * split_pos 分割位置， 是第一个子类的终点， sash 起点，也可以确定第二个子类的开始
  * 通过方向可以确定是 left 还是 top。。。

* @ques sash 上面的移动事件要绑定在 group 上面

  * 是将 group 的 node 传递下来, 还是将 sash 的事件传递上去
  * 传递上去..

* @note onMouseMoveCapture 是干什么的
* @todo 记录 cur_id

- @bug
  `ERROR in ./node_modules/7zip/index.js Module not found: Error: Can't resolve './package' in 'D:\zsytssk\github\test\electron\test\node_modules\7zip'`
  `electron-devtools-installer`

## 2018-04-30 11:14:47

* 如何记录这每次的布局信息

* @note 每一次都要重新渲染整个页面 这个怎么处理..

  * 比方说我关闭一个 panel 时, 只需要重新绘制他的 container
  * 最好的情形是, 只将不需要的 panel 移除就可以了
  * 而现在会重新绘制所有的 container panel, 最顶级的 group 并不会...
  * ---
  * 我不知道为什么会重新渲染
  * 我也不知道如何阻止重新渲染

* 如何简便的处理 immutable 数据

* redux

* test

* immutablejs mergein

* immutablejs list 如何初始化设置顺序

  * `new_contains = [data, new_container];`

* list .push 能不能 pushIn

  * 很深的数组添加一个对象, 就不用分两步
    * 原两步 先找到 list list set setIn(.., new_list)

* groupCOntainer
  * 如何在其中创建一个新的 group..
  * 原来的 add remove 我又如何能找的到目标的 container...
  * container 需要一个地址...
  * 我又如何找到目标的地址呢??

- @note redux immutable.. 可以完成任务 但是真的很麻烦
  * 而且整个的代码结构真的很复杂, 不是一目了然
  * 写起来很累, 理解也很累 不是长久的方法

## 2018-04-26 08:53:59

* @ques

* @ques 每次都会重新渲染 真恶心...

  * 我只能用 immutable 对象在节点中传递了
  * 这个能不能行得通
  * 删除修改每次都传递 immutable 对象过去

* @ques 操作起来太麻烦 immutable...

  * 能不能朝着这个方向努力, 让事情变得 比较简单

* @note immutable 太麻烦

  * 定位一个值再去改变他太麻烦 能不能用函数式方程

* @qeus immutable typescript

* @note 这一个个太麻烦了, 我用自己的 model 更方便

* @note 必须要一个特殊的标识 来表示 container 甚至是 group

* @ques removePanel addPanel 这一个个如何转化成 redux

  * removePanel
  * addPanel
  * cur
  * movePanel
  * 其实这也不复杂 如何实现...

* @ques 如何让这个在 chrome 也能跑

- @ques 改变其中一个值并没有让 react 重新渲染

  * 因为 reducer 没有返回一个全新的 state
  * 可能要引入 immutable 了

- removePanel 如果不是最顶级的如何处理...

  * 如何定位 container...

- @ques state model ctrl
  * model --> state
  * model <--- ctrl
  * model 可以保存数据, 也可以从数据更新状态

* 在一个 reducer 中去 dispatch 改变另一个..
  * 这似乎是不合理的
  * 实际上我真正有用的数据只是 layout_data
  * PanelData 这种玩意直接放在内部的 state 里面就行了...

## 2018-04-24 10:24:36

* context 中的数据如何放在 redux 中...

* @ques 子 component 能使用 mapStateToProps 吗 dispatch

* @ques 每一次改变 state 都会重新渲染整个 dom, 显然回有性能问题

* @ques 这些方法如何转移到 redux 中 ??

* @ques 如何完美的处理 state

  * 哪些放在全局中, 哪些放在 component 里面??

* @ques redux 的数据 如何在 dom 中渲染...

  * 只是从最顶级的传下来吗??

* @ques 我的目的是什么

  * 目前的目的是最大限度的的尝试 redux react
  * 包括理解和处理可能碰到的问题, 比方说性能问题..

* @ques 如果 tab 内容为空, 如何清空 panel
* @ques group 上面的数据会重置 container 上面的数据
  * container remove panel 会给 group 重置回来...
  * 必须要引入 redux 了...

- 2018-04-23 17:16:45
  * 事实上基本不可能在 ui 和 code 同时编辑代码
  * 难点 不知道如何将 jsx 用结构写出来
  * 难点 jsx 可以用很多中方式 渲染 但是我的 ui 哪里知道哪里需要修改...

## 2018-04-15 13:48:09

* @note 我所有的 container 修改都是数据 调用 component 里面的 state 实在不方便

  * 难道全部要使用 数据控制>>>

* goupContainer(container)

  * 我想要的情形是我 return 一个新的 container
  * 然后调用 addPanel 添加 panel 信息
  * 但是我只是修改数据, 并不知道新建的 container 是哪一个
  * 这个如何处理 我 return 新 container 的 contains 信息可以吗
    * 这好奇怪

* 能不能将 group 和 container 的结构保持统一...

* @ques container 和 group 同一级行不行

- @ques 增加 container 如何处理

  * 一直往上最近的 group 添加一个新的 container
  * 如果我已经有两个 container 了呢??
    * 原来的一个放在一个 group 中
    * 新的两个交互的添加 group
  * 一个 group 里面最两个 container

    * 如果原来里面只有一个 container 直接将这个 contianr 加入
    * 如果原来有两个 container 将 group 和新建的 container 放在一个 group 中
    * 另一个 container, 新建一个 group 包裹...

* 所有的 ui 改变都是 state 的改变....

  * 我并不知道 react 的 ui 改变, 我只知道他的 state, 改变他的 state 导致 react 重绘他的 ui....!!

  * 将 panelData 移动过去

- 如果这一切都是控制 redux 数据, 逻辑要简单些>>>

* @ques 如何将数据保存起来?

  * redux ??

* 直接编辑 react component 有一个问题
  * 我怎么知道 react 的 dom 结构, 而且有时候 react 节点都不是真正的 laya 节点
  * 可以通过这个判断 是不是 节点类型

- 没有兼容的调用签名

```tsx
layoutChildren: ContainerData[] | GroupData[]layoutChildren.map((item, index) => {
    return (
      <Container
        key={index}
        wrapDirection={layoutDirection}
        wrapRadio={(item as ContainerData).wrap_radio}
        contains={(item as ContainerData).panels}
        all_panel={(item as ContainerData).panels}
      />
    );
  });
```

#### structure

* group(direction, container)

  * group || container
  * container

* group > group... > container > panel
  {
  direction:
  }

* @note panel type 表示各种类型...

- group 里面的信息因该是怎样的
  * 怎么从最顶层将这些数据传递过去...

* @note group 垂直 水平可以切换 这样是不是很有意思

  * 如果里面的阿标签没有了 group 就没有了..

* @todo 先全部 然后在里面创建新的

- @ques container 下面再包括 container 如何处理

  * 这 ui 需要重新整理先
  * container_group
  * 横向纵向都可以

- @ques styled-components 无法读取 props

* @todo

  * 创建 panel 在左边 右边创建
  * tab 排序...
  * 上下创建 panel

* @ques 如何判断 drag 失败...如何终止 drag..

  * drop 时如何本身已经有这个 panel, 就不 drop 了
  * 但是我没有办法让 dragend 知道, 我没有 drag
  * 难道我必须在 Drop 事件里面去处理这个事情
  * 我在 drop 的时候根本就不知道, 从什么地方 drag 来的啊
  * 我只能搞一个全局对象来保存这个东西了

* @ques 这用 radio 能不能布局整个的 div
  * 位置不好处理 大小基本上没有问题
  * 如果不行还不如 left,right,width,height 这样的布局

## 2018-04-15 11:09:26

* 下面这种形式 如何定义类型
  `const {children, ...other} = this.props as Panel[];`

`{const children, let ...other} = this.props as Panel[];`
这样行不行

* @ques 设置 className 报错
  Props & React.Props

* @怎么把原来的删除掉...

## 2018-04-13 10:04:20

* @todo

  * tab 关闭

    * 打开上一个打开的标签.. 这要记录标签打开历史..

  * 两个 pannel container 之间如何拖拽
  * 拖拽如何创建 container
  * tab 的顺序如何拖拽改变..

- @ques 如何保存 panel 的状态 下次打开还是那个样子

  * app setting
  * ...

- @ques tab 标签上面的 context 目录怎么处理...

* @ques 在 dragOver 的时候无法知道 drag target 的类型 这如何去处理...

* @ques 子元素出现 父元素的就触发 dragLeave 能不能让 子元素不接受 drag 事件??

## 2018-04-12 09:07:23

* @ques 不同的 panel 合并如何去处理

* @ques panel 的 ui 如何去处理

  * panel 可以 拖拽, 所有 panel 有一个父元素..包括头部和内容在

* @ques 资源文件的图标

  * 遍历资源文件, 对应文件类型创建文件 icon
  * 骨骼动画多个文件可以合并成一个文件
  * eg: 骨骼动画 寻找类型.. 找到基本类型 看看其他的有没有找的到 如果全部找到 合并成一个 item
  * 如何监听文件修改 去更新文件的内容...

    * 监听特定的文件夹, 每次文件修改重新渲染

  * @ques 如何记录 tree 的展开状态, 即使有文件更新依然保持那个状态..
    * react 我只更新数据.. 可以保存那个状态
    * 即使我下次打开 重新打开编辑器 我依然可以记录那些状态....
      * 只要我能记录那些状态保存在 cache 中...
      * 这些保存是相对 project 而言的

- @ques 编辑器支持主题 ui
  * context

* @ques 哪些是重要的功能
  * 重要功能先做..

## 2018-04-11 09:56:58

* @quesb 如果我的 renderer 进程可以使用一切的 node 模块那么 main 进程还要做什么
  * 沟通?? 关闭.. 功能

## 2018-03-26 09:16:41

* 获取 electron log 信息
* electron . 到底执行什么命令
* Foremen 是干什么的阿
  * [d](https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c)
  * process.env.PORT

## 2018-03-24 21:50:40

* @note 如何自己隐藏主窗口
* @note 如何改变代码 自动刷新。。

- @todo
  * html
  * js
  * css
  * react ...
  * client chrome
    * client 用 webpack 打包
    * chrome 不用打包直接转义成 umd 就可以了 然后复制过去就可以了

* @ques client 能不能 require
  * 可以
  * 其实我只要将所有的 ts 转成 js
  * 然后 copyhtml 文件就可以了

### saddsdf

POST http://9test4-wap.stg3.1768.com/
?st=getCardNum
&act=wxfangka_hall
&appId=2010
&platform=Windows
&userId=2038961394
&appVersion=1.0.1
&jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIwMzg5NjEzOTQsImV4cCI6MTUxNzMwMzM4MjIyNzAwMH0.NDY0KPffc8InjoxavmUSzAcYtWzLjdL73mLzjElJO4Y
