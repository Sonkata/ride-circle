import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        RideCircle
      </NavLink>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <nav className={isMenuOpen ? "nav-links open" : "nav-links"}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/discover" onClick={closeMenu}>
          Discover
        </NavLink>

        <NavLink to="/saved-riders" onClick={closeMenu}>
          Saved
        </NavLink>

        <NavLink to="/rides" onClick={closeMenu}>
          Rides
        </NavLink>

        <NavLink to="/joined-rides" onClick={closeMenu}>
          Joined
        </NavLink>

        <NavLink to="/routes" onClick={closeMenu}>
          Routes
        </NavLink>

        <NavLink to="/create-ride" onClick={closeMenu}>
          Create
        </NavLink>

        <NavLink to="/messages" onClick={closeMenu}>
          Messages
        </NavLink>

        <NavLink to="/profile" onClick={closeMenu}>
          Profile
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;