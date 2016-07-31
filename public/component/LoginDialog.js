import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import 'whatwg-fetch';

export default class LoginDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  state = {
    open: this.props.open,
    username: '',
    password: '',
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      open: nextProps.open,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
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
    // const formData = new FormData();
    // formData.append('username', this.state.username);
    // formData.append('password', this.state.password);
    // console.log(formData);
    // console.log(this.state.username);
    // console.log(this.state.password);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
      },
      body: encodeURI(`username=${this.state.username}&password=${this.state.password}`),
      // body: {
      //   username: this.state.username,
      //   password: this.state.password,
      // },
    });

    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <Dialog
        title="Login"
        titleClassName="LoginModalTitle"
        actions={[
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
