import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import store from "./store";
import App from "./components/app/app";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
