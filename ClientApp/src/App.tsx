import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { GrindersScalesPage } from "./features/grindersScales/grindersScales";
import {RequestPage} from "./features/grindersScales/RequestPage";
import { OrdersPage } from "./features/orders/groupOrders";
import { OrderDetailPage } from "./features/orders/OrderDetailPage";
import { ShelfPage } from "./features/shelf/shelf";
import { TastingsPage } from "./features/tastings/tastings";
import { CreateTastingPage } from "./features/tastings/create_tastings";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./auth/LoginPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { DetailPageGrinders } from "./features/grindersScales/DetailPageGrinders";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="grindersScales" element={<GrindersScalesPage />} />
        <Route path="grindersScales/:id" element={<DetailPageGrinders />} />
        <Route
          path="requests"
          element={
            <ProtectedRoute>
              <RequestPage />
            </ProtectedRoute>
          }
        />        
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