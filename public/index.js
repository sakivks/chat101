// import React from 'react';
// import { render } from 'react-dom';

// import Main from './component/Main';
// import UserDashBoard from './component/UserDashBoard';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

// import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';


// const routes = {
//   path: '/',
//   component: Main,
//   indexRoute: { component: Main },
//   childRoutes: [
//     { path: 'app', component: UserDashBoard },
//     // { path: 'inbox', component: Inbox },
//   ],
// };

// render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';

import Main from './component/Main';


import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(<Main />, document.getElementById('root'));
