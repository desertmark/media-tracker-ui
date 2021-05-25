import axios from 'axios';
import { decorate,injectable, unmanaged} from 'inversify';
import get from 'lodash/get';

class MDBBaseApi {
    constructor(mdbConfig, url) {
        this._url = get(mdbConfig.endpoints, url);
        this.axios = axios.create({
            baseURL: mdbConfig.baseUrl,
            params: {
                api_key: mdbConfig.apiKey,
            },
        });
    }

    url({ ...params } = {}) {
        const url = Object.keys(params).reduce((prev, curr) => {
            return prev.replace(`{${curr}}`, params[curr])
        }, this._url);
        return url;
    }
}

decorate(injectable(), MDBBaseApi)
decorate(unmanaged('mdbConfig'), MDBBaseApi, 0);
decorate(unmanaged('url'), MDBBaseApi, 1);

export default MDBBaseApi