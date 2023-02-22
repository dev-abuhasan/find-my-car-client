import React from 'react';
import './services/scss/global.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import Notify from './components/ui-kits/notify/notify';
import AppContextProvider from './services/context/app-context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
    <Notify />
  </React.StrictMode>
);
