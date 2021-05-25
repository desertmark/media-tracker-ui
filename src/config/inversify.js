import { Container } from 'inversify'
import { 
    firebaseConfig as firebaseConfigValue,
    FirebaseInitApi,
    firebaseUIConfig as firebaseUIConfigValue,
    FirebaseAuthApi,
} from '../api/firebase';
import {
    MDBConfigurationApi,
    MDBTrendingApi,
    MDBMoviesApi,
    mdbConfig as mdbConfigValue,
    MDBTvApi,
} from '../api/movies/index';

import {
    mdbConfig,
    mdbConfigurationApi,
    mdbTrendingApi,
    mdbMoviesApi,
    mdbTvApi,
    firebaseConfig,
    firebaseInitApi,
    firebaseUIConfig,
    firebaseAuthApi,
} from './inversify.depedencies';

var container = new Container();
// The movie database
container.bind(mdbConfig).toConstantValue(mdbConfigValue);
container.bind(mdbConfigurationApi).to(MDBConfigurationApi);
container.bind(mdbTrendingApi).to(MDBTrendingApi);
container.bind(mdbMoviesApi).to(MDBMoviesApi);
container.bind(mdbTvApi).to(MDBTvApi);
// Firebase
container.bind(firebaseConfig).toConstantValue(firebaseConfigValue);
container.bind(firebaseUIConfig).toConstantValue(firebaseUIConfigValue);
container.bind(firebaseInitApi).to(FirebaseInitApi).inSingletonScope();
container.bind(firebaseAuthApi).to(FirebaseAuthApi).inSingletonScope();

export { container };

