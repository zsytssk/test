import React, { useState } from 'react';
import { Tools } from './tools';

import './chat.scss';

import { ChatItem } from './chatItem';
import { Tab } from '../../component/tab/tab';
import { SearchBox } from './searchBox';

export const Chat: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelected = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="page chat">
      <header>
        <Tab
          children={['聊天', '互动']}
          onSelected={onSelected}
          selectedIndex={selectedIndex}
        ></Tab>
        <Tools />
      </header>
      <div className="content">
        <SearchBox></SearchBox>
      </div>
    </div>
  );
};
