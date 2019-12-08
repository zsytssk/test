import React, { Component } from 'react';

export type TabProps = {
  children: string[];
  onSelected: (index: number) => void;
  selectedIndex: number;
};
export class Tab extends Component<TabProps> {
  render() {
    const { children, onSelected, selectedIndex } = this.props;
    return (
      <div className="tab">
        {children.map((value, index) => {
          return (
            <div
              key={index}
              className={
                selectedIndex === index ? 'active tab-item' : 'tab-item'
              }
              onClick={() => {
                onSelected(index);
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    );
  }
}
