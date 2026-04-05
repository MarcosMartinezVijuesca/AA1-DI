export default function Header() {
  return (
    <header style={{
      backgroundColor: "var(--nav-bg)",
      padding: "30px 20px",
      textAlign: "center",
    }}>
      <h1 style={{
        margin: 0,
        color: "var(--accent-color)",
        fontSize: "2.2rem",
        fontWeight: "800",
        letterSpacing: "2px",
        textTransform: "uppercase"
      }}>
        🛸 Rick & Morty Universe
      </h1>
      <p style={{
        color: "var(--secondary-text)",
        marginTop: "8px",
        fontSize: "1rem"
      }}>
        Explora personajes, ubicaciones y episodios
      </p>
    </header>
  );
}