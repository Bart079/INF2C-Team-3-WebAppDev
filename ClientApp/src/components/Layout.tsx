import { Link, Outlet } from "react-router";
import "../css/Layout.css";
import { useAuth } from "../auth/AuthContext";

export function Layout() {
  const { user, logout } = useAuth();
  return (

    <div className="page">
      <header>
        <nav>
          <Link to="/">Zetsel</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/shelf">Shelf</Link>
          <Link to="/tastings">Tastings</Link>
          <Link to="/grindersScales">Grinders & Scales</Link>
            {user ? (
              <button className="button_logout" onClick={logout}>
                Log out ({user.username})
              </button>
            ) : (
              <Link to="/login">Log in</Link>
            )}
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