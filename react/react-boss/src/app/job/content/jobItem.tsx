import React from 'react';
import './jobItem.scss';
import { Point } from '../../../component/point/point';
import { Tag } from '../../../component/tag/tag';
export const JobItem: React.FC = () => {
  return (
    <div className="job-item">
      <div className="name">前端开发工程师</div>
      <div className="salary">
        15-25k
        <Point style={{ margin: '0 2px 0 3px', backgroundColor: '#2a9386' }} />
        13薪
      </div>
      <div className="company">金属信息科技 A轮</div>
      <div className="tag-list">
        <Tag>上海 黄浦区 外滩</Tag>
        <Tag>5-10年</Tag>
        <Tag>大专</Tag>
      </div>
      <div className="hr-info">
        <img src="" alt="" className="avatar" />
        <div className="hr-name">zsytssk</div>
        <Point style={{ margin: '0 5px', width: '2px', height: '2px' }} />
        <div className="hr-job">招聘主管</div>
      </div>
    </div>
  );
};
