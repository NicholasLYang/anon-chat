import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
// @ts-ignore
import { ActionCableProvider } from "react-actioncable-provider";
// @ts-ignore
import ActionCable from 'actioncable';
import { API_WS_ROOT } from "./constants";

const cable = ActionCable.createConsumer(API_WS_ROOT);
ReactDOM.render(
  <ActionCableProvider cable={cable}>
    <App />
  </ActionCableProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
