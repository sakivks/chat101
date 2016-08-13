import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
// import Colors from 'material-ui/styles/colors';
// import { deepOrange500 } from 'material-ui/styles/colors';
import util from '.././util';

// import 'whatwg-fetch';

export default class RegisterDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  state = {
    open: this.props.open,
    name: '',
    emailId: '',
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
      errorMessage: false,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleEmailIdChange = (e) => {
    this.setState({
      emailId: e.target.value,
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

  register = () => {
    util.fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        emailId: this.state.emailId,
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
        title="Register"
        titleClassName="LoginModalTitle"
        actions={[
          <FlatButton
            label={this.state.errorMessage}
            disabled
          />,
          <FlatButton
            label="Cancel"
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Register"
            primary
            onTouchTap={this.register}
          />,
        ]}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <TextField
          floatingLabelText="Name"
          hintText="Vikas"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange}
          fullWidth
        />
        <TextField
          floatingLabelText="EmailId"
          hintText="abc@xyz.com"
          name="emailId"
          value={this.state.emailId}
          onChange={this.handleEmailIdChange}
          fullWidth
        />
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
