import { decorate, injectable, inject } from 'inversify';
import MDBBaseApi from './base.api';


class MDBTvApi extends MDBBaseApi {

    constructor(mdbConfig) {
        super(mdbConfig, 'tv');
    }

    async getPopular() {
        try {
            const res = await this.axios.get(this.url({ tv_id: 'popular' }));
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }
}

decorate(injectable(), MDBTvApi)
decorate(inject('mdbConfig'), MDBTvApi, 0);

export default MDBTvApi