import { chain } from 'lodash';

const getDataDependencyWorker = (component = {}, methodName) => {
  return component.WrappedComponent ?
    getDataDependencyWorker(component.WrappedComponent, methodName) :
    component[methodName];
};

export default (components, getState, dispatch, location, params, deferred) => {
  const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

  return chain(components)
    .filter((component) => getDataDependencyWorker(component, methodName)) // only look at ones with a static fetchData()
    .map((component) => getDataDependencyWorker(component, methodName))    // pull out fetch data methods
    .map(fetchData => fetchData(getState, dispatch, location, params))
    .flatten()
    .value();
};
