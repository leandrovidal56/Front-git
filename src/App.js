import React from 'react';
import { ToastContainer} from 'react-toastify';
import { Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './store';

import Routes from './routes';
import GlobalStyle from './styles/global';
import history from './services/history';

function App() {
  return (
    <>
    <Provider store={Store}>
   <Router history={history} >
   <Routes />
   </ Router>
   <GlobalStyle />
   <ToastContainer autoClose={3000}/>
    </Provider>
    </>
  );
}

export default App;
