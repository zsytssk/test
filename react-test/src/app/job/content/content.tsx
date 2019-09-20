import React from 'react';
import { JobItem } from './jobItem';

export const Content: React.FC = () => {
  return (
    <div className="content">
      {Array(6)
        .fill(0)
        .map((item, index) => {
          return <JobItem key={index} />;
        })}
    </div>
  );
};
