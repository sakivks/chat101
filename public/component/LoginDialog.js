import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
// import Colors from 'material-ui/styles/colors';
import { deepOrange500 } from 'material-ui/styles/colors';
import util from '.././util';
// import 'whatwg-fetch';

const styles = {
  errorMessageButton: {
    color: deepOrange500,
    marginLeft: '50%',
  },
};

export default class LoginDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  state = {
    open: this.props.open,
    username: '',
    password: '',
    errorMessage: '',
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      open: nextProps.open,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      errorMessage: false,
    });
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  login = () => {
    util.fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then((response) => response.json())
    .then((resp) => {
      if (resp.success) {
        this.setState({
          open: false,
          errorMessage: '',
        });
        document.cookie = `auth=${resp.auth};${document.cookie}`;
        localStorage.setItem('user.name', resp.user.name);
        window.location.replace('/#/app');
      } else {
        this.setState({
          errorMessage: resp.info,
        });
      }
    });
  }

  render() {
    return (
      <Dialog
        title="Login"
        titleClassName="LoginModalTitle"
        actions={[
          <FlatButton
            label={this.state.errorMessage}
            disabled
            style={styles.errorMessageButton}
          />,
          <FlatButton
            label="Cancel"
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Login"
            primary
            onTouchTap={this.login}
          />,
        ]}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <TextField
          floatingLabelText="Username"
          hintText="username"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          fullWidth
        />
        <TextField
          hintText="password"
          type="password"
          name="password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          fullWidth
        />
      </Dialog>
    );
  }
}
