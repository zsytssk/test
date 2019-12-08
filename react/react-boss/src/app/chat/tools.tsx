import React from 'react';

import { IoIosNotificationsOutline } from 'react-icons/io';

export const Tools: React.FC = () => {
  return (
    <div className="tools">
      <div className="item">
        <IoIosNotificationsOutline
          color="#fff"
          size="30"
          style={{ verticalAlign: 'middle' }}
        />
      </div>
    </div>
  );
};
