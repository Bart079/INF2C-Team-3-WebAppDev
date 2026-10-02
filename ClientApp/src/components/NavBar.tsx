import { Link, Outlet } from "react-router";
import "../css/NavBar.css";

export function NavBar() {
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
      </main>
      <footer>
        <p>Zetsel</p>
      </footer>
    </div>
  );
}