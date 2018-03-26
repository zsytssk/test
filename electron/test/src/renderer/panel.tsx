import * as React from 'react';
import { render } from 'react-dom';

import { default as Button } from 'material-ui/Button';
import { default as Icon } from 'material-ui/Icon';

const { Component } = React;

export class Panel extends Component {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%', background: 'red' }}>
        <Button variant="raised" color="primary">
          <Icon className="material-icons" style={{ marginRight: '5px' }}>
            alarm
          </Icon>Hello
        </Button>
      </div>
    );
  }
}
