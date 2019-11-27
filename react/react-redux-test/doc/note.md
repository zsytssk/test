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
