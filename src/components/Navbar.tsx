import { Link } from "react-router-dom";
import { theme } from "../theme/theme";

function Navbar() {
  return (
    <nav
      style={{
        fontFamily: theme.font.main,
        backgroundColor: theme.colors.white,
        padding: "16px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          {theme.logo.shortName}
        </div>

        <h2 style={{ color: theme.colors.dark, margin: 0 }}>
          {theme.logo.name}
        </h2>
      </Link>

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/" style={navLink}>Home</Link>
        <Link to="/courses" style={navLink}>Courses</Link>
        <Link to="/login" style={navLink}>Login</Link>

        <Link
          to="/register"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            padding: "10px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600
          }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

const navLink = {
  color: theme.colors.text,
  textDecoration: "none",
  fontWeight: 500
};

export default Navbar;