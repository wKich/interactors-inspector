import React, { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./App";

import "./index.css";
import { root } from "./root";

// TODO Register keyboard handler here

render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);
