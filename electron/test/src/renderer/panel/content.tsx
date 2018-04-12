import * as React from 'react';

const style = (theme?) => {
  return {
    backgroundColor: '#1e1e1e',
  };
};

export class Content extends React.Component {
  public render() {
    return <div style={style()} />;
  }
}
