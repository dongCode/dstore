import { useState } from "react";
import { useCallback } from "react";
import { createStore, MiddlewareNext, State, useStore } from "../store";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
};

// 日志中间件
function loggerMiddleware<T>(next: MiddlewareNext<T>): MiddlewareNext<T> {
  return (state: State<T>) => {
    console.log("before update:", todoStore.getState());
    next(state);
    console.log("after update:", todoStore.getState());
  };
}

// 计数中间件
function countMiddleware<T>(next: MiddlewareNext<T>): MiddlewareNext<T> {
  let count = 0;
  return (state: State<T>) => {
    count++;
    console.log("update count:", count);
    next(state);
  };
}

const todoStore = createStore<TodoState>({ todos: [] }, [
  loggerMiddleware,
  countMiddleware,
]);

const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todoStore.setState((prevState) => ({
    todos: [...prevState.todos, newTodo],
  }));
};

const updateTodo = (id: number, updates: Partial<Todo>) => {
  todoStore.setState((prevState) => {
    const updatedTodos = prevState.todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    return {
      todos: updatedTodos,
    };
  });
};

const deleteTodo = (id: number) => {
  todoStore.setState((prevState) => ({
    todos: prevState.todos.filter((todo) => todo.id !== id),
  }));
};

const useTodos = () => {
  const state = useStore(todoStore);
  const add = useCallback(addTodo, []);
  const update = useCallback(updateTodo, []);
  const remove = useCallback(deleteTodo, []);
  return { todos: state.todos || [], add, update, remove };
};

export function LogTodoList() {
  const { todos, add, update, remove } = useTodos();
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      add(newTodoText);
      setNewTodoText("");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add a todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => update(todo.id, { completed: e.target.checked })}
            />
            <span>{todo.text}</span>
            <button onClick={() => remove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
