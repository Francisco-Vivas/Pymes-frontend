import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import { AppCtxProvider } from "./hooks/auth.hooks";

ReactDOM.render(
  <AppCtxProvider>
    <Router />
  </AppCtxProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
