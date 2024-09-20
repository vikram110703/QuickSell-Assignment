import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";
import { Provider,useSelector } from 'react-redux';
import { persistor, store } from './Redux/store';



import './index.css';
import { Home } from './Pages/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Home />
    </Provider>
  </PersistGate>
);

reportWebVitals();
