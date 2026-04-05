import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        background: "transparent",
        border: "2px solid var(--accent-color)",
        color: "var(--nav-text)",
        padding: "8px 15px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s"
      }}
      title="Cambiar tema"
    >
      {isDark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}