import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
import { deepOrange500, deepBlue500, greenA700 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import ApplicationBar from './ApplicationBar';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  buttonStyle: {
    margin: 20,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: greenA700,
  },
});

class Main extends Component {

  state = {
    loginOpen: true,
    registerOpen: false,
  };


  openRegister = () => {
    this.setState({
      registerOpen: true,
      loginOpen: false,
    });
  };

  openLogin = () => {
    this.setState({
      loginOpen: true,
      registerOpen: false,
    });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ApplicationBar title="Chat101" />
          <div style={styles.container}>
            <LoginDialog open={this.state.loginOpen} />
            <RegisterDialog open={this.state.registerOpen} />
            <RaisedButton
              label="Register"
              secondary
              onTouchTap={this.openRegister}
              style={styles.buttonStyle}
            />
            <RaisedButton
              label="Login"
              primary
              onTouchTap={this.openLogin}
              style={styles.buttonStyle}
            />
          </div>
        </div>
      </MuiThemeProvider>
      );
  }
}

export default Main;
