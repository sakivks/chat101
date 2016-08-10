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
import util from '.././util';


class AppBarExampleIconMenu extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    actionDisabled: PropTypes.bool.isRequired,
  };

  logout = () => {
    util.clearSession();
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
