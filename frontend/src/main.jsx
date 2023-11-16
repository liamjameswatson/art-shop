import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//paypal provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { PersistGate } from "redux-persist/integration/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
// import store from "./store";
import store, { persistor } from "./redux/store.js";

// const payPalOptions = {

// };

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialISOpen={false} />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </PersistGate>
      </Provider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            backgroundColor: "blue",
            color: "green",
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
