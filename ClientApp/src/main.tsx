import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./css/styles.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { OrdersProvider } from "./features/orders/OrdersContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);