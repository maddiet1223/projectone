import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware, Store} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, {AppState} from './reducer';
import {AppAction} from '../../frontend1/src/actions';

const store: Store<AppState, AppAction> = createStore(reducer,  composeWithDevTools(
  applyMiddleware(thunk),)
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
