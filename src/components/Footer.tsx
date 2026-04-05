export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--nav-bg)",
      padding: "20px",
      textAlign: "center",
      borderTop: "2px solid var(--accent-color)",
      marginTop: "auto",
    }}>
      <p style={{ color: "var(--secondary-text)", fontSize: "0.9rem" }}>
        AA1 Diseño de Interfaces · 2º DAM · Rick & Morty API
      </p>
    </footer>
  );
}