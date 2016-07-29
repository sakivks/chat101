import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class AppBarExampleIconMenu extends Component{
    render(){
        return (  
            <AppBar
                title={this.props.title}
                iconElementRight={
                    <IconMenu
                        iconButtonElement={
                          <IconButton><ContentFilter /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    >
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help" />
                        <MenuItem primaryText="Sign out" />
                    </IconMenu>
                }
            />
        );
    }
}

export default AppBarExampleIconMenu;