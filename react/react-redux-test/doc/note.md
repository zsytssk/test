- @ques useContext
- @ques useReducer

- @todo @sum hook

- @ques hook 有 shouldUpdateComponent 这种功能吗

## 2019-12-02 08:01:41

- combineReducers

- @ques component 的参数...

- mapStateToProps 中的 state 就是 redux store getState
- mapDispatchToProps 中的 dispatch 就是 redux store dispatch

- redux 是如何知道改变的值, 然后触发 react 重新的渲染...
  - 每次 reducer 都会 return 新的对象, 然后触发 connect 绑定的函数...改变
  - 重新调用 component | hook, 然后呢 --> react 内部 改变 ui

* @ques Suspense

## 2019-12-01 19:38:53

- @rem Container Components(容器组件) Presentational Components(渲染组件)

  - 容器组件 包着 渲染组件: 用来处理数据

@rem store action

- @ques 在实际的项目中 redux 经常是怎么使用?
- @ques store 在哪

- @ques redux 还在更新吗

  - 还在 还流行吗

- @ques 感觉 react 比些游戏框架牛 b 多了...

- @ques 有没有 简单 的 redux 的 demo

- redux 的 connect 到底是干什么的

- 高级教程 https://redux.js.org/advanced/advanced-tutorial

- @ques 下面的 demo AddTodo + TodoList 函数的参数 不一样
  - 默认只有 dispatch, 还可以绑定 state+ dispatch...
  - 这是 connect 实现的 api
  - @opt 可以看下 connect 的源码, 以前看不懂 现在应该可以..

```ts
//
let AddTodo = ({ dispatch }) => {};
// { todos, onTodoClick }
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
);

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
