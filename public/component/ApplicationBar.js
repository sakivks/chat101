import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
// import Menu from 'material-ui/Menu';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
// import ContentFilter from 'material-ui/svg-icons/content/filter-list';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}


class AppBarExampleIconMenu extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    actionDisabled: PropTypes.bool.isRequired,
  };

  logout = () => {
    deleteAllCookies();
    localStorage.removeItem('user.name');
    window.location.replace('/');
  };

  render() {
    return (
      <AppBar
        title={this.props.title}
        iconElementRight={
          <FlatButton
            label={this.props.action}
            disabled={this.props.actionDisabled}
            onTouchTap={this.logout}
          />
        }
      />
    );
  }
}

export default AppBarExampleIconMenu;
            // <IconMenu
            //   iconButtonElement={
            //     <IconButton><MoreVertIcon /></IconButton>
            //   }
            //   targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            //   anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            // >
            //   <MenuItem disabled primaryText="Refresh" />
            //   <MenuItem disabled primaryText="Help" />
            //   <MenuItem disabled primaryText="Sign out" />
            // </IconMenu>
