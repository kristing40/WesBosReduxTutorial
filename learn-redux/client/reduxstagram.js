// let's go!
import React from 'react';
import { render } from 'react-dom';

//css
import css from './styles/style.styl';

//import components
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

//import react router deps
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store, { history } from './store'

//import raven and sentry for error catching
import Raven from 'raven-js';
import { sentry_url, logException } from './data/config';

//Actual Error catching
Raven.config(sentry_url, {
  tags: {
    git_commit: 'absckedf',
    userLevel: 'editor'
  }
}).install();

Raven.captureMessage('Something bad happened');
Raven.showReportDialog();

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid}></IndexRoute>
        <Route path="/view/:postId" component={Single}></Route>
      </Route>
    </Router>
 </Provider>

)

render(router, document.getElementById('root'));
