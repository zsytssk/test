import React from 'react';

import { IoIosSearch, IoIosAdd } from 'react-icons/io';

export const Tools: React.FC = () => {
  return (
    <div className="tools">
      <div className="item">
        <IoIosAdd color="#fff" size="35" style={{ verticalAlign: 'middle' }} />
      </div>
      <div className="item">
        <IoIosSearch
          color="#fff"
          size="25"
          style={{ verticalAlign: 'middle' }}
        />
      </div>
    </div>
  );
};
