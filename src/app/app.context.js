import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseInitApi } from '../api/firebase';
import { withDependency } from '../app/di.context';
import { firebaseInitApi, mdbConfigurationApi } from '../config/inversify.depedencies';
import LoaderUtil from '../util/loader-util';
const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}

/**
 * 
 * @param {{
 *  firebaseInitApi: FirebaseInitApi
 * }} param0 
 */
function AppProvider({ children, mdbConfigurationApi, firebaseInitApi }) {
  const [appLoader] = useState(new LoaderUtil());
  const [imagesConfig, setImagesConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const sub = appLoader.subscribe(isLoading => {
    setIsLoading(isLoading);
  });
  useEffect(() => {
    return () => {
      appLoader.unsubscribe(sub);
    }
  }, []);

  function loadFirebase() {
    firebaseInitApi.initFirebase();
  }

  function loadConfig() {

    const _loadConfig = async () => {
      const res = await mdbConfigurationApi.getConfiguration()
      setImagesConfig(res.images);
      setIsAppReady(true);
    }
    const task = _loadConfig();
    appLoader.waitFor(task);
  }



  return (
    <AppContext.Provider value={{ isLoading, imagesConfig, setIsLoading, isAppReady, appLoader, loadConfig, loadFirebase }}>
        {children}
    </AppContext.Provider>
  );
}

export default withDependency(AppProvider, [mdbConfigurationApi, firebaseInitApi]);
