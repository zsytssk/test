## 生命周期(lifecycle)

- (me)[https://blog.logrocket.com/the-new-react-lifecycle-methods-in-plain-approachable-language-61a2105859f3/]

### mounting

- constructor

- getDerivedStateFromProps

- Render

- componentDidMount

### updating

- getDerivedStateFromProps

- shouldComponentUpdate

- render

- getSnapshotBeforeUpdate

  - 数据发生改变 dom 还没有改变执行, 有些特例用途

- componentDidUpdate

### unmounting

- componentWillUnmount

### Error

- getDerivedStateFromError(error)

- componentDidCatch(error, info)

## hook
