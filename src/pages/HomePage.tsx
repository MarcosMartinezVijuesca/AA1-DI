import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "../utils/api";
import type { Character, ApiResponse } from "../types";
import StatusMessage from "../components/StatusMessage";

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCharacters()
      .then((data: ApiResponse<Character>) => setCharacters(data.results.slice(0, 4)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "70px" }}>
        <h2 style={{ fontSize: "2.5rem", color: "var(--text-color)", marginBottom: "16px" }}>
          Bienvenido al universo de{" "}
          <span style={{ color: "var(--accent-color)" }}>Rick & Morty</span>
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--secondary-text)", maxWidth: "600px", margin: "0 auto 30px auto", lineHeight: "1.7" }}>
          Explora todos los personajes, ubicaciones y episodios de la serie. 
          Usa los filtros para encontrar exactamente lo que buscas.
        </p>
        <Link
          to="/characters"
          style={{
            display: "inline-block",
            backgroundColor: "var(--accent-color)",
            color: "#1a1a2e",
            fontWeight: "700",
            padding: "14px 36px",
            borderRadius: "50px",
            fontSize: "1rem",
            transition: "opacity 0.2s"
          }}
        >
          Explorar personajes →
        </Link>
      </div>

     
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        marginBottom: "70px"
      }}>
        {[
          { emoji: "👤", title: "Personajes", desc: "Más de 800 personajes con su estado, especie y origen.", link: "/characters" },
          { emoji: "🌍", title: "Ubicaciones", desc: "Planetas, dimensiones y estaciones espaciales del universo.", link: "/locations" },
          { emoji: "📺", title: "Episodios", desc: "Todos los episodios con fecha de emisión y personajes.", link: "/episodes" },
        ].map((item) => (
          <Link
            key={item.title}
            to={item.link}
            style={{
              backgroundColor: "var(--card-bg)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              padding: "30px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "transform 0.2s"
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>{item.emoji}</span>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-color)", margin: 0 }}>{item.title}</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--secondary-text)", margin: 0, lineHeight: "1.6" }}>{item.desc}</p>
          </Link>
        ))}
      </div>

      
      <h3 style={{ fontSize: "1.5rem", color: "var(--text-color)", marginBottom: "24px", textAlign: "center" }}>
        Personajes destacados
      </h3>

      {loading && <StatusMessage text="Cargando personajes..." type="loading" />}
      {error && <StatusMessage text={error} type="error" />}

      {!loading && !error && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {characters.map((character) => (
            <Link
              key={character.id}
              to={`/character/${character.id}`}
              style={{
                backgroundColor: "var(--card-bg)",
                borderRadius: "16px",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "transform 0.2s"
              }}
            >
              <img
                src={character.image}
                alt={character.name}
                style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
              />
              <div style={{ padding: "12px" }}>
                <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-color)", margin: 0 }}>
                  {character.name}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--secondary-text)", margin: "4px 0 0 0" }}>
                  {character.species}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}