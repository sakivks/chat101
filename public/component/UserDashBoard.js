import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
import { redA700, red500, red700, indigoA700, indigoA400, greenA700 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApplicationBar from './ApplicationBar';
import util from '.././util';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500,
    primary2Color: red700,
    accent1Color: greenA700,
  },
});

class UserDashBoard extends Component {
  getUsername = () => {
    if (localStorage.getItem('user.name')) {
      return localStorage.getItem('user.name');
    }
    util.clearSession();
    return '';
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
