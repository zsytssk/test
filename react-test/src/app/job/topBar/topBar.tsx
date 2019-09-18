import React, { useState } from 'react';

import { Tab } from '../../../component/tab/tab';
import { Tools } from './tools';

import './topBar.scss';

export const TopBar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelected = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="top-bar">
      <Tab
        children={['web前端', 'HTML5', 'Javascript']}
        onSelected={onSelected}
        selectedIndex={selectedIndex}
      ></Tab>
      <Tools />
    </div>
  );
};
