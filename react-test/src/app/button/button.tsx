import React, { Component } from 'react';
import style from './button.module.css';

export type ButtonProps = {
  children: string;
  onClick: () => void;
};
export class Button extends Component<ButtonProps> {
  render() {
    const { children, onClick } = this.props;
    return (
      <div className={style.error + ' ' + style.Button} onClick={onClick}>
        {children}
      </div>
    );
  }
}
