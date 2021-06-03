import axios from 'axios';
import * as config from './../constants/config';

export default  function callApi(endpoint, method, body, param) {
    return  axios({
        method: method,
        url: `${config.API_URL}/api/v1/${endpoint}`,
        headers: config.HEADERS,
        data: body,
    }).catch(err => {
        console.log(err);
    })
}