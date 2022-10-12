import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducer from './components/reducer';
import App from './components/app';

const store = createStore(reducer, applyMiddleware(reduxThunk));

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
