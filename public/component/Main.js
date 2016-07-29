import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
import { deepOrange500, deepBlue500, greenA700 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginDialog from './LoginDialog';
import AppBarExampleIconMenu from './AppBarExampleIconMenu';


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
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: true,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
    console.log(this.state);
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBarExampleIconMenu title="Chat101" />
          <div style={styles.container}>
            <LoginDialog open={this.state.open} />
            <RaisedButton
              label="Register"
              secondary
              style={styles.buttonStyle}
            />
            <RaisedButton
              label="Login"
              primary
              onTouchTap={this.handleTouchTap}
              style={styles.buttonStyle}
            />
          </div>
        </div>
      </MuiThemeProvider>
      );
  }
}

export default Main;
