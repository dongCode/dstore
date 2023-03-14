import { useState } from "react";
import { useCallback } from "react";
import { createStore, useStore } from "../store";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
};

const todoStore = createStore<TodoState>({ todos: [] });

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

export function TodoList() {

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
