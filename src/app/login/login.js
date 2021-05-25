import React, { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css'
import { withDependency } from '../di.context';
import { firebaseAuthApi } from '../../config/inversify.depedencies';
import { FirebaseAuthApi } from '../../api/firebase';
import { useHistory } from 'react-router-dom';
import { useLoginState } from './login.context';
/**
 * 
 * @param {{
 *  firebaseAuthApi: FirebaseAuthApi
 * }} props 
 */
function Login({ firebaseAuthApi }) {
  const { isAuthenticated, loginEvent } = useLoginState();
  const router = useHistory();

  useEffect(() => {
    const sub = loginEvent.subscribe(() => router.push('/'));
    firebaseAuthApi.start();
    return () => {
      sub.unsubscribe();
    }
  }, []);
  return (
    <div className="login">
      {isAuthenticated}
      <div id={firebaseAuthApi.loginContainerId}></div>
    </div>
  );
}

export default withDependency(Login, [firebaseAuthApi])