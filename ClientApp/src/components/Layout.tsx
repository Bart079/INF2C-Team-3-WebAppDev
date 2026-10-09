import { Link, Outlet } from "react-router";
import "../css/Layout.css";

export function Layout() {
  return (
    <div className="page">
      <header>
        <nav>
          <Link to="/">Zetsel</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/shelf">Shelf</Link>
          <Link to="/tastings">Tastings</Link>
          <Link to="/grindersScales">Grinders & Scales</Link>
        </nav>
      </header>
      <main>
        <Outlet />
        <footer>
        </footer>
      </main>
    </div>
  );
}