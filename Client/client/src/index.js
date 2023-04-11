import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {};

const store = createStore(reducers,
  // persistedState, 
  composeEnhancers(applyMiddleware(thunk))
)

// store.subscribe(() => {
//   localStorage.setItem('state', JSON.stringify(store.getState()));
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider> 
  </Router>
   
);

