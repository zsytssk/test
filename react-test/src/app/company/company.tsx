import React from 'react';
import { Tools } from './tools';

import './company.scss';

import { CompanyItem } from './companyItem';

export const Company: React.FC = () => {
  return (
    <div className="page company">
      <header>
        公司
        <Tools />
      </header>
      <div className="content">
        {Array(6)
          .fill(0)
          .map((item, index) => {
            return <CompanyItem key={index} />;
          })}
      </div>
    </div>
  );
};
