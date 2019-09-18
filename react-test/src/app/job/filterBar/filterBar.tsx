import React, { useState } from 'react';
import './filterBar.scss';

const order_data = [
  {
    name: '最新',
    type: 'latest'
  },
  {
    name: '推荐',
    type: 'recommend'
  }
];
export const FilterBar: React.FC = () => {
  const [orderType, setOrderType] = useState('latest');
  const selectOrder = (type: string) => {
    setOrderType(type);
  };
  return (
    <div className="filter-bar">
      <div className="order">
        {order_data.map((item, index) => {
          return (
            <div
              key={index}
              className={item.type === orderType ? 'active' : ''}
              onClick={() => {
                setOrderType(item.type);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="filter">
        <div>上海</div>
        <div>赛选</div>
      </div>
    </div>
  );
};
