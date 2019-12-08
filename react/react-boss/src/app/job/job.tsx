import React from 'react';
import { FilterBar } from './filterBar/filterBar';
import { TopBar } from './topBar/topBar';
import { Content } from './content/content';

import './job.scss';

export const Job: React.FC = () => {
  return (
    <div className="page job">
      <header>
        <TopBar />
        <FilterBar />
      </header>
      <Content></Content>
    </div>
  );
};
