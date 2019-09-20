- @todo github pages

  - https://sspai.com/post/54608

- @save component 可以定好 class 就是`小写-分割`

- @ques common 的样式如何处理
  - .arrow-left

* @ques 的样式通用 可以公用吗

  - name + location (字体大小)
  - header > tools (布局)
  - content 样式...

* Sass scss 有什么区别...

* @ques scss 查找所有引用

* @ques 不同的地方样式冲突怎么处理...

  - 相同的 class...
  - 放在父亲下面?

* @ques `.content .job-item` 的样式公用 怎么处理...

  - 我直接在样式中 `.content .job-item` 就违背了封装的原则, 产生两个依赖
  - 或者这样式本身都是绑定的, 我只是将 dom 分割而已...
  - @ques 能不能直接设置 jsx 的样式..., 如果可以, 这样似乎是更合理的

* @ques vscode scss 跳转

- @todo 一个 css 只能用来做 module export 或者 直接 import 不能同时使用...

- @ques NavLink activeClassName 怎么没有作用

- @todo 数据应该一级一级的传递下去

  - content > jobItem...
  - 是否要用 redux, 实际项目中 redux 实用吗

- @todo

  - 小红点
  - 急聘 tag

- @ques svg animation
  - https://css-tricks.com/guide-svg-animations-smil/
  - [js ctrl svg](https://www.creativebloq.com/how-to/animate-svg-with-javascript)

* @todo react import props from scss

```scss
@import "~shared/variables/colors";

:export {
  brandSecondary: $brand-secondary;
}

.root {
  color: $brand-primary;
}
```

```jsx
<SomeFooBarComponent takesAColorProperty={styles.brandSecondary} />
```

- @ques react component 外面设置他的样式...
  - 设置 class?? style...
  - 应该抛出 api 给外界调用...

## 2019-09-18 08:17:18

- @ques 怎么在外面定义 tab 的样式

  - 固定 class??
  - 还有什么更好的方式...

- @ques 模拟数据放在哪里?

  - test 里面??

- @todo 如何使用 icon [react-icons]

  - 最好是有动画...
  - svg 支不支持动画???

- @todo 顶部提示栏

- @todo 筛选弹出层...

  - bottom-pop 只处理进入+离开动画

- @ques 样式会不会冲突...

  - 不同地方相同的 class..

- @ques scss ts 自动补全

- @todo filter 的样式

- @todo job 显示面试的信息...

- @todo job-content :> job-item 要不要像 laya 做成 list 形式

  - 这样就需要滚动条...

- @todo css js 写在一起

  - ...

- @ques 写 react 十分的舒服...

## 2019-09-17 09:12:20

- @ques 自定义 index.html

- @ques

  - 场景切换如何做
  - 顶部动画
  - select
  - 弹出层
  - 照片

- @ native 的实现...

- @ques 滑动页面 场景切换...

- @ques 常用的 react 插件...

- @ques github pages

- @ques footer icon 动画

- @ques 切换 page 页面变大??

- @ques scss 参数 主题

- @ques import css class
  - xxx.module.css

## 2019-09-16 15:32:32

- transition

## 2019-09-16 13:39:32

- ts 版本一并发送过去

```
    Hi ！张世阳：
    我是OYO酒店人力资源部Kate, 感谢你对OYO酒店的关注，具体时间安排如下：
    收到请务必回复邮件确认！
    面试时间：2019-09-06  周五  10：00
    面试地址：上海市杨浦区翔殷路1128号沪东金融大厦4F （五角场SOHO 3Q办公室）
    联系人：Kate
    联系方式：18101729795
```

```
    坪去 15-25
    面试时间：2019-09-06  周五  14：00
```

```note
张世阳先生/女士，您好！

感谢您对哈啰出行的关注！很高兴收到您的简历，现特邀请您参加资深前端开发（平台&上海）岗位的面试。
面试日期：2019-09-09 17:00
面试时间：2019-09-09 17:00
面试时长：60分钟（可能视面试情况缩减或延长，请预留一定缓冲时间）
面试形式：
面试地址：上海闵行区园秀路28弄旭辉·莘庄中心1号楼6楼
到达面试地点后，直接告知前台来访目的即可。

联系人：商煜
联系电话：13216150191
```

## 2019-09-04 20:00:09

- @ques graphql 怎么使用...

- @ques index.html 如何配置

  - react eject

- @ques react 自动化测试工具

- @ques react 静态资源(图片) 怎么放到页面中...

  - 怎么打包发布到线上

- @ques react native 怎么运行...

- @ques zhangjunqing 的 react 配置

  - github 上找一找
    - @todo https://gitee.com/zhangjq/h5-wing

- @ques react 项目如何实际的运行

- @ques 我这样搞 react 是不是浪费时间...

- @ques GraphQL 怎么使用

- @ques 自定义项目配置

  - webpack + set map + eslint + ts + prettier

- @todo React Storybook

- @todo multi class 怎么处理...

- @todo boss 直聘

- @todo sass 有什么使用场景, 好像没有
  - 这每一个都是一个组件, 原来的 .parentClass .childClass...
  - 还有没有意义
  - 在 react 中使用什么方式来组织样式??

* @todo Styleguidist + Storybook

- @ques `CSS Modules Stylesheet` 到底是什么??

## react

- @todo 如何传递数据给子组件
