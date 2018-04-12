import * as React from 'react';
import { Content } from './content';
import { Header } from './header';

const style = (theme?) => {
  return {
    backgroundColor: '#333333',
  };
};
export class Panel extends React.Component {
  public render() {
    return (
      <div style={style()}>
        <Header />
        <Content />
      </div>
    );
  }
}
