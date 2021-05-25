import { decorate, injectable, inject } from 'inversify';
import MDBBaseApi from './base.api';


class MDBMoviesApi extends MDBBaseApi {

    constructor(mdbConfig) {
        super(mdbConfig, 'movie');
    }

    async getPopular() {
        try {
            const res = await this.axios.get(this.url({ movie_id: 'popular' }));
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }
}

decorate(injectable(), MDBMoviesApi)
decorate(inject('mdbConfig'), MDBMoviesApi, 0);

export default MDBMoviesApi