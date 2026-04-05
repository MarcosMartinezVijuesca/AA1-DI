import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../utils/api";
import type { Character } from "../types";
import StatusMessage from "../components/StatusMessage";

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCharacterById(id)
      .then((data: Character) => setCharacter(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <StatusMessage text="Cargando personaje..." type="loading" />;
  if (error) return <StatusMessage text={error} type="error" />;
  if (!character) return null;

  const statusColor =
    character.status === "Alive" ? "#4ade80" :
    character.status === "Dead" ? "#f87171" : "#9ca3af";

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "2px solid var(--border-color)",
          color: "var(--text-color)",
          padding: "8px 20px",
          borderRadius: "50px",
          cursor: "pointer",
          fontSize: "0.95rem",
          marginBottom: "30px",
          transition: "all 0.2s"
        }}
      >
        ← Volver
      </button>

      <div style={{
        backgroundColor: "var(--card-bg)",
        borderRadius: "20px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "0",
          flexWrap: "wrap"
        }}>
          <img
            src={character.image}
            alt={character.name}
            style={{
              width: "300px",
              objectFit: "cover",
              flexShrink: 0
            }}
          />
          <div style={{ padding: "40px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            <h1 style={{ fontSize: "2rem", color: "var(--text-color)", margin: 0 }}>
              {character.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: "12px", height: "12px", borderRadius: "50%",
                backgroundColor: statusColor, display: "inline-block"
              }} />
              <span style={{ color: "var(--secondary-text)", fontSize: "1rem" }}>
                {character.status} — {character.species}
              </span>
            </div>

            <InfoRow label="Género" value={character.gender} />
            <InfoRow label="Origen" value={character.origin.name} />
            <InfoRow label="Última ubicación" value={character.location.name} />
            <InfoRow label="Episodios" value={`Aparece en ${character.episode.length} episodios`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: "12px 0",
      borderBottom: "1px solid var(--border-color)"
    }}>
      <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)", textTransform: "uppercase", letterSpacing: "1px" }}>
        {label}
      </span>
      <span style={{ fontSize: "1rem", color: "var(--text-color)", fontWeight: "600" }}>
        {value}
      </span>
    </div>
  );
}