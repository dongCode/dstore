import React, { useState, useEffect } from 'react';
import './style.css';

interface VirtualizedListProps<T> {
  items: T[]; // 列表项数组
  itemHeight: number; // 列表项高度
  renderItem: (item: T, index: number) => React.ReactNode; // 渲染列表项
}

function VirtualizedList<T>({ items, itemHeight, renderItem }: VirtualizedListProps<T>) {
  const [startIndex, setStartIndex] = useState(0); // 可视区域内第一个列表项的索引
  const [endIndex, setEndIndex] = useState(0); // 可视区域内最后一个列表项的索引

  const containerHeight = items.length * itemHeight; // 列表容器高度
  const visibleItemCount = Math.ceil(window.innerHeight / itemHeight); // 可视区域内能够显示的列表项个数

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const visibleStartIndex = Math.floor(scrollTop / itemHeight);
      const visibleEndIndex = visibleStartIndex + visibleItemCount;

      setStartIndex(visibleStartIndex);
      setEndIndex(visibleEndIndex);
    };

    window.addEventListener('scroll', handleScroll);

    // 清除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemHeight, visibleItemCount]);

  const visibleItems = items.slice(startIndex, endIndex); // 可视区域内的列表项

  return (
    <div style={{ height: containerHeight }}>
      <div style={{ height: visibleItemCount * itemHeight }}>
        {visibleItems.map((item, index) => (
          <div key={startIndex + index} style={{ height: itemHeight }}>
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
      <div className="scrollbar" style={{ height: window.innerHeight }} />
    </div>
  );
}

export default VirtualizedList;
