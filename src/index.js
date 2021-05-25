import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import AppProvider from './app/app.context';
import LoginProvider from './app/login/login.context';
import { DIProvider } from './app/di.context';
ReactDOM.render(
  <React.StrictMode>
    <DIProvider>
      <AppProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </AppProvider>
    </DIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
