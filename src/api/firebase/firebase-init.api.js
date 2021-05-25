import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { auth } from 'firebaseui';

import { decorate, injectable, inject } from 'inversify';
import { firebaseConfig, firebaseUIConfig } from '../../config/inversify.depedencies';

class FirebaseInitApi {
  
  constructor(firebaseConfig, firebaseUIConfig) {
    this.firebaseConfig = firebaseConfig;
    this.firebaseUIConfig = firebaseUIConfig;
    this.app = null;
    this.analytics = null;
    this.storage = null;
    this.auth = null;
    this.ui = null;
    this.onReadyCbs = [];
    this.onAuthReadyCbs = [];
  }

  initFirebase() {
    this.app = firebase.initializeApp(this.firebaseConfig);
    this.analytics = firebase.analytics(this.app);
    this.storage = firebase.storage(this.app);
    this.auth = firebase.auth(this.app);
    this.ui = new auth.AuthUI(this.auth);
    this._notifyReady();
  }
  /**
   * @returns {Promise<firebase.User | void>}
   */
  initAuth() {
    return new Promise((res, rej) => {
      this.auth.onAuthStateChanged(user => {
        res(user);
        this._notifyAuthReady(user);
      },rej);
    });
  }
  /**
   * Subscribe to ready event
   * @param {Function} cb callback
   */
  onReady(cb) {
    this.onReadyCbs.push(cb);
  }
  /**
   * Subscribe to auth ready event, the `currentUser` will be passed as parameter into the callback
   * @param {(user: firebase.User) => void} cb callback
   */
  onAuthReady(cb) {
    this.onAuthReadyCbs.push(cb);
  }

  _notifyReady() {
    this.onReadyCbs.forEach(cb => cb(this));
  }

  _notifyAuthReady(user) {
    this.onAuthReadyCbs.forEach(cb => cb(user));
  }

}

decorate(injectable(), FirebaseInitApi)
decorate(inject(firebaseConfig), FirebaseInitApi, 0);
decorate(inject(firebaseUIConfig), FirebaseInitApi, 1);

export default FirebaseInitApi