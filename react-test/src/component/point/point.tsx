import React from 'react';
import style from './point.module.css';

type PointStyle = {
  style?: React.CSSProperties;
};
export const Point: React.FC<PointStyle> = props => {
  const { style: com_style } = props;
  return <div className={style.point} style={{ ...com_style }}></div>;
};
