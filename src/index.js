import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore.conbinReducers,compose } from "redux";
import reducer from "./store/reducer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer);
const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("Middleware Dispatching", action);
      const result = next(action);
      console.log("MiddleWare next state,", store.getState);
      return result;
    };
  };
};
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
// const store = createStore(reducer, /* preloadedState, */ compose(
//     applyMiddleware(...middleware)
//   ));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
