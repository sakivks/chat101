import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
import { deepOrange500, deepBlue500, greenA700, blue800, white } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import ApplicationBar from './ApplicationBar';
// import util from '.././util';

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
    loginOpen: false,
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

  loginFB = () => {
    console.log('redirecting');
    window.location.href = `https://www.facebook.com/v2.8/dialog/oauth?client_id=${util.config.fbAppId}&redirect_uri=${util.config.loginRedirect}&scope=${util.config.scope}`;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ApplicationBar title="Chat101" action="sakiv" actionDisabled />
          <div style={styles.container}>
            <LoginDialog open={this.state.loginOpen} />
            <RegisterDialog open={this.state.registerOpen} />
            <RaisedButton
              label="FB Login"
              onTouchTap={this.loginFB}
              style={styles.buttonStyle}
              backgroundColor={blue800}
              labelColor={white}
            />
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
