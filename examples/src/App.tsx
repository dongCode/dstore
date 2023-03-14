import './App.css'
import { Counter } from './demos/Counter'
import { TodoList } from './demos/TodoList'

function App() {

  return (
    <div className="App">
      <h1>第一个例子Counter</h1>
      <Counter />
      <h1>第二个例子ToDos</h1>
      <TodoList />
    </div>
  )
}

export default App
