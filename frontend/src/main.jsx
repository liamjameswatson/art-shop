import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//paypal provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider deferLoading={true}>
      <Provider store={store}>
        <App />
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
