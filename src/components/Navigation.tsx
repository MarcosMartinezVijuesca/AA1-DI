import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontSize: "1rem",
    fontWeight: "600",
    color: isActive ? "var(--accent-color)" : "var(--nav-text)",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: isActive ? "rgba(151,206,76,0.15)" : "transparent",
    transition: "all 0.2s"
  });

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "var(--nav-bg)",
      borderBottom: "2px solid var(--accent-color)",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        gap: "20px"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <NavLink to="/" style={linkStyle}>Inicio</NavLink>
          <NavLink to="/characters" style={linkStyle}>Personajes</NavLink>
          <NavLink to="/locations" style={linkStyle}>Ubicaciones</NavLink>
          <NavLink to="/episodes" style={linkStyle}>Episodios</NavLink>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}