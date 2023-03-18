import './App.css'
import { Counter } from './demos/Counter'
import { LogCounter } from './demos/LogCounter'
import { LogTodoList } from './demos/LogTodoList'
import { TodoList } from './demos/TodoList'
import VirtualScrollDemoA from './demos/VirtualizedList/01/EasyVirtualScroll'
import VirtualScrollDemoB from './demos/VirtualizedList/02/demo'


function App() {

  return (
    <div className="App">
      <h1>第一个例子Counter</h1>
      <Counter />
      <h1>第二个例子ToDos</h1>
      <TodoList />
      <h1>第三个例子带有中间件的LogCounter</h1>
      <LogCounter />
      <h1>第四个例子带有多个中间件的LogToDoList</h1>
      <LogTodoList />
      <h1>第四个例子简单01EasyVirtualizedList</h1>
      <VirtualScrollDemoA />
      <h1>第五个例子简单02EasyVirtualizedList</h1>
      <VirtualScrollDemoB />
    </div>
  )
}

export default App
