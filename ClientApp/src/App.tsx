import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { GrindersScalesPage } from "./features/grindersScales/grindersScales";
import { OrdersPage } from "./features/orders/groupOrders";
import { ShelfPage } from "./features/shelf/shelf";
import { TastingsPage } from "./features/tastings/tastings";
import { CreateTastingPage } from "./features/tastings/create_tastings";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./auth/LoginPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="grindersScales" element={<GrindersScalesPage />} />
        <Route path="shelf" element={<ShelfPage />} />
        <Route path="tastings" element={<TastingsPage />} />
        <Route
          path="create-tastings"
          element={
            <ProtectedRoute>
              <CreateTastingPage />
            </ProtectedRoute>
          }
        />        
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}