import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
               <Provider store={store}>
                    <Router>
                         <App />
                    </Router>
               </Provider>
          </GoogleOAuthProvider>
     </React.StrictMode>
);
