import { useEffect, useState } from "react";

// State类型
export type State<T> = T | ((pre: T) => T);

// Store对象类型
export type Store<T> = {
  getState: () => T;

  setState: (state: State<T>) => void;

  subscribe: (listener: () => void) => () => void;
};

export type MiddlewareNext<T> = (state: State<T>) => void;

type Middleware<T> = (next: MiddlewareNext<T>) => MiddlewareNext<T>;

// createStore函数，用于创建store对象
export function createStore<T>(
  initialState: T,
  middlewares: Middleware<T>[] = []
): Store<T> {
  let state: T = initialState;
  let listeners: Array<() => void> = [];

  // 获取当前state
  function getState(): T {
    return state;
  }

  // 更新state
  function setState(newState: State<T>) {
    // 如果新的state是一个函数，那么执行该函数并将执行结果作为新的state

    if (typeof newState === "function") {
      // TODO: remove as
      state = (newState as (prev: T) => T)(getState());
    } else {
      state = newState;
    }

    // 触发所有的监听器

    listeners.forEach((listener) => listener());
  }

  // 订阅state的变化
  function subscribe(listener: () => void): () => void {
    listeners.push(listener);

    // 返回一个函数，用于取消订阅
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  // 组合中间件处理函数，得到更新后的 setState 函数
  const enhancedSetState = middlewares.reduceRight(
    (next, middleware) => middleware(next),
    setState
  );

  return { getState, setState: enhancedSetState, subscribe };
}

// 自定义钩子，用于连接React组件到store
export function useStore<T>(store: Store<T>): T {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    // 每当store发生变化时，更新组件状态
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, [store]);

  return state;
}
