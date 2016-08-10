import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
import { deepOrange500, deepBlue500, greenA700 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApplicationBar from './ApplicationBar';
import util from '.././util';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: greenA700,
  },
});

class UserDashBoard extends Component {
  getUsername = () => {
    if (localStorage.getItem('user.name')) {
      return localStorage.getItem('user.name');
    }
    util.clearSession();
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ApplicationBar
            title={`Welcome ${this.getUsername()}`}
            action="Logout"
            actionDisabled={false}
          />
        </div>
      </MuiThemeProvider>
      );
  }
}

export default UserDashBoard;
