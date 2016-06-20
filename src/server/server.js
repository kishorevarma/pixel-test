import express from 'express';
import serveStatic from 'serve-static';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../shared/routes';
import webpack from 'webpack';
import reducers from '../shared/reducers';
import buildStore from '../shared/store';
import { getLiquorData } from './api';
const webpackConfig = require('../../webpack.config');
const app = express();

app.use('/dist', serveStatic(__dirname + './../dist'));
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development' || typeof NODE_ENV === 'undefined') {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

//routes
app.get('/get/liquorData', (req, res, next) => {
  getLiquorData()
    .then(result => {
      return res.send(result);
    })
    .catch(error => (res.send(error)));
});

app.use((req, res, next) => {
  const memoryHistory = createMemoryHistory(req.path);
  let store = buildStore(reducers, undefined, memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  function renderView(renderProps) {
    try {
      store = buildStore(reducers, store.getState(), memoryHistory);
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const componentHTML = ReactDOMServer.renderToString(InitialView);
      const initialState = store.getState();
      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Beer Test</title>
          </head>
          <body>
            <script>
              window.__initialState__ = ${JSON.stringify(initialState)};
            </script>
            <div id="react-view">${componentHTML}</div>
            <script type="application/javascript" src="/dist/bundle.js"></script>
          </body>
        </html>
      `;
      return HTML;
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error || !renderProps) {
      res.status(500);
      res.send('<!doctype html><html><head></head><body>Some thing went wrong</body></html>');
    } else if (renderProps) {
      /* call static fetchData on the container component */
      fetchData()
        .then(_ => res.send(renderView(renderProps)))
        .catch(error => res.send(error.stack));

      /* fetch data promise */
      function fetchData () {
        let { query, params } = renderProps;
        return new Promise(function(resolve, reject) {
          let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
          resolve(comp.fetchData({ params, store }));
        });
      }
    }
  });
});

// error handling
app.use((err, req, res, next) => {
  res.status(500).send('Global Error Handling: Something broke!');
});

export default app;
