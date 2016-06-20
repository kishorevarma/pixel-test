import axios from 'axios';

const request = (method, url, data = {}) => {
  return axios({
    method,
    url: `http://localhost:3001/${url}`,
    data,
    timeout: 10000
  }).then((result) => {
    console.log(result);
    return result;
  }).catch((error) => {
    console.error(error);
    throw error;
  });
};

export const getLiquorDataAPI = () => request('get', 'get/liquorData');


