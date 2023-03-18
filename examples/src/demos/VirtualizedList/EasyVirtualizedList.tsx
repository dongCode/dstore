import React, { useState, useRef } from "react";
import "./style.css";

interface Item {
  id: number;
  text: number;
}

const data: Item[] = new Array(200).fill(0).map((_, index) => ({
  id: index,
  text: Math.random() + index,
}));

const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 300;

export default function App() {

  const [startIndex, setStartIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItemCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  let endIndex = startIndex + visibleItemCount;

  if(endIndex + 1 <= data.length) {
    endIndex += 1
  }
  let visibleData = data.slice(startIndex, endIndex);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {

    const { scrollTop } = e.currentTarget;

    const index = Math.floor(scrollTop / ITEM_HEIGHT);

    if(index + visibleItemCount <= data.length) {
      setStartIndex(index);
    }
  };

  return (
    <div
      className="container"
      style={{ height: CONTAINER_HEIGHT, width: "100%" }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {/* 通过 paddingTop 填充空白区域 */}
      <div
        style={{
          height: data.length * ITEM_HEIGHT,
          paddingTop: startIndex * ITEM_HEIGHT,
          boxSizing: 'border-box'
        }}
      >
        {visibleData.map((item, index) => (
          <div
            key={item.id}
            style={{
              height: ITEM_HEIGHT,
              backgroundColor: index % 2 === 0 ? "blue" : "green",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
