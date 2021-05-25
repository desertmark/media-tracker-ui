import '../util/util.css';
import './App.css';
import Header from '../components/header/header';
import { useEffect } from 'react';
import { useAppState, useLoadConfig } from './app.context';
import { Backdrop, Box, CircularProgress, Container } from '@material-ui/core';
import AppRoutes from './app-routes';
import { BrowserRouter } from 'react-router-dom';
import AppTheme from '../config/theming';
import { useLoginState } from './login/login.context';
import { AppSpinner } from '../components/app-spinner/app-spinner';

function App() {

  const appState = useAppState();
  const loginState = useLoginState();
  useEffect(() => {
    if (!appState?.imagesConfig && !appState.isLoading) {
      appState.loadConfig();
    }
  });

  useEffect(() => {
    appState.loadFirebase();
    loginState.loadSession();
  }, []);

  return (
    <div className="app">
      <AppTheme>
        <AppSpinner isOpen={appState.isLoading}></AppSpinner>
        <BrowserRouter>
          <Header></Header>
          <Container className="app__container" disableGutters={true}>
            <Box className="app-container__box" px={2} bgcolor="secondary.main">
              {appState.isAppReady &&
                <AppRoutes></AppRoutes>
              }
            </Box>
          </Container>
        </BrowserRouter>
      </AppTheme>
    </div>
  );
}

export default App;
