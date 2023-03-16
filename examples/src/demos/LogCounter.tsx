import { createStore, State, useStore } from "../store";

type TNext<T> = (state: State<T>) => void

// 日志中间件
function loggingMiddleware<T>(next: TNext<T>): TNext<T> {

  return (state: State<T>) => {
    console.log("before update:", counterStore.getState());
    next(state);
    console.log("after update:", counterStore.getState());
  };

}

// 创建 store 对象
const counterStore = createStore(
  {
    count: 0,
  },
  [loggingMiddleware]
);

// 定义 actions
const actions = {
  increment: () => {
    counterStore.setState((prevState) => ({ count: prevState.count + 1 }));
  },
  decrement: () => {
    counterStore.setState((prevState) => ({ count: prevState.count - 1 }));
  },
};

// 使用 useStore 钩子连接组件到 store
export function LogCounter() {
  const { count } = useStore(counterStore);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}
