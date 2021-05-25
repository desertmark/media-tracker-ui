import { decorate, injectable, inject } from 'inversify';
import MDBBaseApi from './base.api';

class MDBConfigurationApi extends MDBBaseApi {

    constructor(mdbConfig) {
        super(mdbConfig, 'configuration');
    }
    
    async getConfiguration() {
        try {
            const res = await this.axios.get(this.url());
            return res.data;
        } catch(e) {
            console.error(e);
        }
    }
}

decorate(injectable(), MDBConfigurationApi)
decorate(inject('mdbConfig'), MDBConfigurationApi, 0);

export default MDBConfigurationApi