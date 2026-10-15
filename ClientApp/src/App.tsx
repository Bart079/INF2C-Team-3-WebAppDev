import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { GrindersScalesPage } from "./features/grindersScales/grindersScales";
import {RequestPage} from "./features/grindersScales/RequestPage";
import { OrdersPage } from "./features/orders/groupOrders";
import { OrderDetailPage } from "./features/orders/OrderDetailPage";
import { CreateOrderPage } from "./features/orders/CreateOrderPage";
import { ShelfPage } from "./features/shelf/shelf";
import { TastingsPage } from "./features/tastings/tastings";
import { TastingsDetailPage } from "./features/tastings/TastingsDetailPage";
import { CreateTastingPage } from "./features/tastings/create_tastings";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./auth/LoginPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { DetailPageGrinders } from "./features/grindersScales/DetailPageGrinders";

import { MyHostedTastingsPage } from "./features/tastings/my-hosted-tastings";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/new" element={<ProtectedRoute><CreateOrderPage /></ProtectedRoute>} />
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
        <Route
          path="shelf"
          element={
            <ProtectedRoute>
              <ShelfPage />
            </ProtectedRoute>
          }
        />
        <Route path="tastings" element={<TastingsPage />} />
        <Route path="tastings/:id" element={<TastingsDetailPage />} />
        <Route
          path="create-tastings"
          element={
            <ProtectedRoute>
              <CreateTastingPage />
            </ProtectedRoute>
          }
        />        
        <Route path="login" element={<LoginPage />} />
        <Route
          path="my-hosted-tastings"
          element={
            <ProtectedRoute requiredRole="host">
              <MyHostedTastingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}