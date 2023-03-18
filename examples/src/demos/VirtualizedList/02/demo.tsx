import { useCallback } from "react";
import VirtualScroll, { RenderItemProps } from "./EasyVirtualScroll";

interface Item {
  id: number;
  text: number;
}

const data: Item[] = new Array(2000000).fill(0).map((_, index) => ({
  id: index,
  text: Math.random() + index,
}));

const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 300;

function App() {
  const renderItem = useCallback(({ item }: RenderItemProps<Item>) => {
    return <span>{item.text}</span>;
  }, []);

  const keyExtractor = useCallback((item: Item) => item.id, []);

  return (
    <VirtualScroll
      data={data}
      itemHeight={ITEM_HEIGHT}
      renderItem={renderItem}
      containerHeight={CONTAINER_HEIGHT}
      keyExtractor={keyExtractor}
    />
  );
}

export default App;
