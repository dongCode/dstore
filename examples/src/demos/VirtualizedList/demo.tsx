import React, { useState, useRef } from "react";
import "./style.css";

interface Item {
  id: number;
  text: number;
}

const data: Item[] = new Array(200000).fill(0).map((_, index) => ({
    id: index,
    text: Math.random() + index,
  }));
  
const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 300;

export default function App() {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItemCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const endIndex = startIndex + visibleItemCount;


  const visibleData = data.slice(startIndex, endIndex);
  console.log(startIndex, endIndex, visibleData)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    const index = Math.floor(scrollTop / ITEM_HEIGHT);
    setStartIndex(index);
  };

  return (
    <div
      className="container"
      style={{ height: CONTAINER_HEIGHT, width: "100%" }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div style={{ height: data.length * ITEM_HEIGHT,paddingTop: startIndex * ITEM_HEIGHT  }}>
        {visibleData.map((item) => (
          <div  key={item.id} style={{ height: ITEM_HEIGHT }}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
