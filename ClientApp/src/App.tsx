import { Routes, Route } from "react-router";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { GrindersScalesPage } from "./features/grindersScales/grindersScales";
import { OrdersPage } from "./features/orders/groupOrders";
import { ShelfPage } from "./features/shelf/shelf";
import { TastingsPage } from "./features/tastings/tastings";
import { CreateTastingPage } from "./features/tastings/create_tastings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="grindersScales" element={<GrindersScalesPage />} />
        <Route path="shelf" element={<ShelfPage />} />
        <Route path="tastings" element={<TastingsPage />} />
        <Route path="create-tastings" element={<CreateTastingPage />} />
      </Route>
    </Routes>
  );
}