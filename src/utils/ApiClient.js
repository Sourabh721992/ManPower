import axios from "axios";
import { appConfig } from "./AppConfig";
import qs from "qs";

const client = {
  async get(apiName, params) {
    try {
        const _path = appConfig.apiUri + apiName;
        const resp = await axios.get(_path, {
            params: params,
            timeout:60000
        });
        if (resp.status >= 400 && resp.status <= 500) {
            return Promise.reject(resp.status);
        }
        return Promise.resolve(resp.data);
    }
    catch(err) {
        if(err.response)
            return Promise.reject(err.response.status);
        else
            return Promise.reject(500);
    }
  },
  async post(apiName, body) {
    try {
    
      let _path = appConfig.apiUri + apiName;
   
      var config = {
        method: 'post',
        url: _path,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : qs.stringify(body)
      };

      const resp = await axios(config);

      if (resp.status >= 400 && resp.status <= 500) {
          return Promise.reject(resp.status);
      }

      return Promise.resolve(resp.data);
    }
    catch(err) {
        console.log(err);
        if(err.response)
            return Promise.reject(err.response.status);
        else
            return Promise.reject(500);
    }
  }
}

export default client;