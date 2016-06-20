import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/AppContainer';
import LiquorContainer from '../containers/LiquorContainer';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LiquorContainer} />
  </Route>
);
export default routes;
