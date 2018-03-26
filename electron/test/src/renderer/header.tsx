import * as React from 'react';
import { render } from 'react-dom';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const { Component } = React;

export class Header extends Component {
  public render() {
    return (
      <div
        style={{
          width: '100%',
          height: '50px',
          background: 'black',
          position: 'relative',
        }}
      >
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
            <Button color="inherit">
              <Icon>close</Icon>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
