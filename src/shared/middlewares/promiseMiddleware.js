export default ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  const { promise, type, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  const SUCCESS = type;
  const REQUEST = `${type}_REQUEST`;
  const FAILURE = `${type}_FAILURE`;
  next({ ...rest, type: REQUEST });
  return promise().then(
    result => (
      next({ type: SUCCESS, ...rest, res: (result.data || result) })
    )
  ).catch(error => {
    next({ ...rest, error, type: FAILURE });
  });
};