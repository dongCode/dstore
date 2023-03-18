import React, { useState, useRef, useCallback } from "react";
import { useMemo } from "react";
import "./style.css";

interface VirtualScrollProps<ItemT> {
  data: ItemT[];
  itemHeight: number;
  containerHeight: number;
  renderItem: RenderItemType<ItemT>;
  keyExtractor: (item: ItemT) => number;
}

export type RenderItemProps<ItemT> = {
  item: ItemT;
  index: number;
  [key: string]: any;
};

export type RenderItemType<ItemT> = (info: RenderItemProps<ItemT>) => JSX.Element;

const VirtualScroll = <ItemT,>({
  data,
  itemHeight,
  containerHeight,
  renderItem,
  keyExtractor,
}: VirtualScrollProps<ItemT>) => {

  const [startIndex, setStartIndex] = useState(0);

  const visibleItemCount = Math.ceil(containerHeight / itemHeight);

  let endIndex = startIndex + visibleItemCount;

  if(endIndex + 1 <= data.length) {
    endIndex += 1
  }


  const visibleData = useMemo(() => {
    return data.slice(startIndex, endIndex)
  }, [
    data,
    startIndex,
    endIndex,
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop } = e.currentTarget;
      const index = Math.floor(scrollTop / itemHeight);

      if (index + visibleItemCount <= data.length) {
        setStartIndex(index);
      }
    },
    [data.length, itemHeight, visibleItemCount]
  );

  return (
    <div
      className="virtual-scroll-container"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
      ref={containerRef}
    >
      <div
        className="virtual-scroll-content"
        style={{
          height: data.length * itemHeight,
          paddingTop: startIndex * itemHeight,
        }}
      >
        {visibleData.map((item, index) => (
          <div
            className="virtual-scroll-item"
            key={keyExtractor(item)}
            style={{
              height: itemHeight,
              backgroundColor: index % 2 === 0 ? "blue" : "green",
            }}
          >
            {renderItem({ item, index })}
          </div>
        ))}
      </div>
    </div>
  );
};


export default VirtualScroll
