import { decorate, injectable, inject } from 'inversify';
import MDBBaseApi from './base.api';


class MDBTrendingApi extends MDBBaseApi{

    constructor(mdbConfig) {
        super(mdbConfig, 'trending');
    }
    
    async getTrending(options) {
        const params = { media_type: 'all', time_window: 'week', ...options }
        try {
            const res = await this.axios.get(this.url(params));
            return res.data;
        } catch(e) {
            console.error(e);
        }
    }
}

decorate(injectable(), MDBTrendingApi)
decorate(inject('mdbConfig'), MDBTrendingApi, 0);

export default MDBTrendingApi