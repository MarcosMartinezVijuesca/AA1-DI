import { Link } from "react-router-dom";
import type { Character } from "../types";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  const statusColor =
    character.status === "Alive" ? "#4ade80" :
    character.status === "Dead" ? "#f87171" : "#9ca3af";

  return (
    <div style={{
      backgroundColor: "var(--card-bg)",
      borderRadius: "16px",
      border: "1px solid var(--border-color)",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      <img
        src={character.image}
        alt={character.name}
        style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
      />
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h2 style={{ fontSize: "1.1rem", color: "var(--text-color)", margin: 0 }}>
          {character.name}
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--secondary-text)", margin: 0 }}>
          {character.species}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            width: "10px", height: "10px", borderRadius: "50%",
            backgroundColor: statusColor, display: "inline-block"
          }} />
          <span style={{ fontSize: "0.85rem", color: "var(--secondary-text)" }}>
            {character.status}
          </span>
        </div>
        <Link
          to={`/character/${character.id}`}
          style={{
            marginTop: "auto",
            display: "block",
            textAlign: "center",
            backgroundColor: "var(--accent-color)",
            color: "#1a1a2e",
            fontWeight: "700",
            padding: "8px 0",
            borderRadius: "8px",
            fontSize: "0.9rem",
            transition: "opacity 0.2s"
          }}
        >
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}