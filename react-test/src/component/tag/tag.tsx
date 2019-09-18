import React from 'react';
import style from './tag.module.css';

type TagStyle = {
  style?: React.CSSProperties;
  className?: string;
  children: string;
};
export const Tag: React.FC<TagStyle> = props => {
  const { children, className } = props;
  return (
    <div className={className ? className + ' ' + style.tag : style.tag}>
      {children}
    </div>
  );
};
