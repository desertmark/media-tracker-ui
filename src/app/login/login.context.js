import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppState } from '../app.context';
import { withDependency } from '../../app/di.context';
import { firebaseAuthApi, firebaseInitApi } from '../../config/inversify.depedencies';
import { EventEmitter } from '../../util/event-emitter';
import login from './login';
import { SentimentDissatisfiedOutlined } from '@material-ui/icons';
const LoginContext = createContext();

export function useLoginState() {
  return useContext(LoginContext);
}

function LoginProvider({ children, firebaseInitApi, firebaseAuthApi }) {
  const appState = useAppState();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAthenticated] = useState(false);
  const [loginEvent] = useState(new EventEmitter());

  useEffect(() => {
    // Fires when user executes login flow through login button
    const sub = firebaseAuthApi.loginEvent.subscribe(user => {
      setSession(user)
    });
    return () => {
      sub.unsubscribe();
    }
  }, []);

  function setSession(user) {
    setCurrentUser(user);
    setIsAthenticated(true);
    loginEvent.emit(user);
  }

  function cleanSession() {
    setIsAthenticated(false);
    setCurrentUser(null);
  }

  function loadSession() {
    const _loadSession = async () => {
      return firebaseInitApi.initAuth().then(user => {
        // fires when app loads if user is set is because we have an active session.
        if (user) {
          setSession(user);
        }
      });
    }
    const task = _loadSession();
    appState?.appLoader.waitFor(task);
  }

  function logOut() {
    const _logOut = async () => {
      return firebaseAuthApi.logOut().then(() => {
        cleanSession();
      });
    }
    const task = _logOut();
    appState?.appLoader.waitFor(task);
  }

  return (
    <LoginContext.Provider value={{ currentUser, isAuthenticated, loginEvent, loadSession, logOut }}>
      {children}
    </LoginContext.Provider>
  );
}

export default withDependency(LoginProvider, [firebaseInitApi, firebaseAuthApi]);