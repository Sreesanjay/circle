import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <Provider store={store}>
               <Router>
                    <App />
               </Router>
          </Provider>
     </React.StrictMode>
);
