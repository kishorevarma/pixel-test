/**
 * Created by kishorevarman on 16/06/16.
 */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from './middlewares/promiseMiddleware';

const buildStore = (reducers, state, history) => {
  const middlewares = [
    routerMiddleware(history),
    promiseMiddleware
  ];
  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    state,
    applyMiddleware(...middlewares)
  );
};

export default buildStore;