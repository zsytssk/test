import React, { MouseEvent as ReactMouseEvent } from 'react';
import { Tag } from '../../component/tag/tag';

export const CompanyItem: React.FC = () => {
  const gotoJobList = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    console.log(`goto job list`);
  };
  const gotoCompany = () => {
    console.log(`goto company`);
  };

  return (
    <div className="item" onClick={gotoCompany}>
      <div className="icon-left">
        <div className="icon">哈</div>
      </div>
      <div className="con">
        <div className="name">哈喽出行</div>
        <div className="location">上海市 黄浦区 外滩</div>
        <div className="tag-list">
          <Tag>D轮以及以上</Tag>
          <Tag>1000-9999人</Tag>
          <Tag>互联网</Tag>
        </div>
        <div className="bottom arrow_box" onClick={gotoJobList}>
          热招: <span>资深前端开发工程师</span>等4866个职位
        </div>
      </div>
    </div>
  );
};
