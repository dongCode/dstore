import './App.css'
import { Counter } from './demos/Counter'
import { LogCounter } from './demos/Log'
import { TodoList } from './demos/TodoList'

function App() {

  return (
    <div className="App">
      <h1>第一个例子Counter</h1>
      <Counter />
      <h1>第二个例子ToDos</h1>
      <TodoList />
      <h1>第三个例子带有中间件的LogCounter</h1>
      <LogCounter />
    </div>
  )
}

export default App
