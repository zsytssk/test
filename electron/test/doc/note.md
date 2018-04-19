## 2018-04-15 13:48:09

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
