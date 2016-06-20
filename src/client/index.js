import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../shared/routes';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import reducers from '../shared/reducers';
import buildStore from '../shared/store';

const initialState = window.__initialState__;

const store = buildStore(reducers, initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('react-view')
);
