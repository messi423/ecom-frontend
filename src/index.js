import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

//const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
