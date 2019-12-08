import React from 'react';

import { IoIosSearch, IoIosFunnel } from 'react-icons/io';

export const Tools: React.FC = () => {
  return (
    <div className="tools">
      <div className="item">
        <IoIosSearch
          color="#fff"
          size="25"
          style={{ verticalAlign: 'middle' }}
        />
      </div>
      <div className="item">
        <IoIosFunnel
          color="#fff"
          size="30"
          style={{ verticalAlign: 'middle' }}
        />
      </div>
    </div>
  );
};
