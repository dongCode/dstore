import { createStore, State, Store, useStore } from "../store";

function loggingMiddleware<T>(store: Store<T>): Store<T> {
  const { getState, setState, subscribe } = store;

  return {

    getState,

    setState: (newState: State<T>) => {

      console.log("Old state:", getState());

      setState(newState);

      console.log("New state:", getState());

    },

    subscribe,
    
  };
}

// 创建 store 对象
const counterStore = createStore(
  {
    count: 0,
  },
  loggingMiddleware
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
