import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class LoginDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  state = {
    open: this.props.open,
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

  login = () => {
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
            label="Confirm"
            primary
            keyboardFocused
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
          fullWidth
        />
        <TextField
          hintText="password"
          type="password"
          name="password"
          floatingLabelText="Password"
          fullWidth
        />
      </Dialog>
    );
  }
}
