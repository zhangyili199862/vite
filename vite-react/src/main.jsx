import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { throttle } from "lodash-es";

console.log(throttle);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
