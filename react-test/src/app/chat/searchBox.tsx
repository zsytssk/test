import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import './searchBox.scss';

export const SearchBox: React.FC = () => {
  return (
    <div className="search-box">
      <IoIosSearch color="#ddd" size="20" style={{ verticalAlign: 'middle' }} />
      <label>通过姓名或公司名搜索职位</label>
    </div>
  );
};
