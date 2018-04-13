## 2018-04-13 10:04:20

* @todo

  * tab 关闭
  * 拖拽..

* @ques tab 标签上面的 context 目录怎么处理...

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
