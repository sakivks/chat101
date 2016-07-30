import React from 'react';
import ReactDOM from 'react-dom';
// import Main from './component/Main';
import UserDashBoard from './component/UserDashBoard';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// ReactDOM.render(<Main />, document.getElementById('root'));
ReactDOM.render(<UserDashBoard />, document.getElementById('root'));
