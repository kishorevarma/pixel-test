import actionTypes from '../constants/actionTypes';
const defaultState = {};

const liquorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_LIQUOR_DATA_REQUEST: {

    }
    case actionTypes.LOAD_LIQUOR_DATA_FAILURE: {

    }
    case actionTypes.LOAD_LIQUOR_DATA: {
      return { ...state, ...action.res };
    }
    default: {
      return state;
    }
  }
};
export default liquorReducer;