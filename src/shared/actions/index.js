import * as actionTypes from '../constants/actionTypes';
import * as services from '../service';
const { getLiquorDataAPI } = services.default;
export const filterByCategory = (filterBy) => (
  {
    type: actionTypes.default.FILTER_BY_CATEGORY,
    data: filterBy
  }
);

export const loadLiquorData = () => {
  return {
    type: actionTypes.default.LOAD_LIQUOR_DATA,
    promise: getLiquorDataAPI
  };
};