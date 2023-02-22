import React from 'react';
import './services/scss/global.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import Notify from './components/ui-kits/notify/notify';
import AppContextProvider from './services/context/app-context';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './services/redux/store';


const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(77, 197, 175)', // use your color variable here
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
    <Notify />
  </React.StrictMode>
);
