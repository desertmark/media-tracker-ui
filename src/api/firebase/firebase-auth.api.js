import firebase from 'firebase';
import { decorate, injectable, inject } from 'inversify';
import { firebaseInitApi, firebaseUIConfig } from '../../config/inversify.depedencies';
import { EventEmitter } from '../../util/event-emitter';
import FirebaseInitApi from './firebase-init.api';

class FirebaseAuthApi {
  /**
   * @param {FirebaseInitApi} firebaseInitApi 
   */
  constructor(firebaseInitApi, firebaseUIConfig) {
    /**
     * @type {firebase.auth.Auth}
     */
    this.auth = null;
    /**
     * @type {firebaseui.auth.AuthUI}
     */
    this.ui = null;
    /**
     * @type {firebaseui.auth.Config}
     */
    this.firebaseUIConfig = firebaseUIConfig;
    this.loginContainerId = 'firebaseui-auth-container';
    this.loginEvent = new EventEmitter();
    firebaseInitApi.onReady((firebase) => {
      console.log(firebase);
      this.auth = firebase.auth
      this.ui = firebase.ui;
    });
  }

  start() {
    this.firebaseUIConfig = {
      ...this.firebaseUIConfig,
      ...{
        callbacks: {
          signInSuccessWithAuthResult: this.handleLogin.bind(this),
        }
      }
    }
    this.ui.start(`#${this.loginContainerId}`, this.firebaseUIConfig);
  }

  logOut() {
    return this.auth.signOut();
  }

  /**
   * @private
   */
  handleLogin({ additionalUserInfo, credentials, operationType, user }) {
    this.loginEvent.emit(user);
    return false;
  }

}

decorate(injectable(), FirebaseAuthApi)
decorate(inject(firebaseInitApi), FirebaseAuthApi, 0);
decorate(inject(firebaseUIConfig), FirebaseAuthApi, 1);

export default FirebaseAuthApi