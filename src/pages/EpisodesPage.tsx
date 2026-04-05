import { useEffect, useState } from "react";
import { getEpisodes } from "../utils/api";
import type { Episode, ApiResponse } from "../types";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";

const filterOptions = [
  { label: "Temporada 1", value: "S01" },
  { label: "Temporada 2", value: "S02" },
  { label: "Temporada 3", value: "S03" },
  { label: "Temporada 4", value: "S04" },
  { label: "Temporada 5", value: "S05" },
];

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getEpisodes()
      .then((data: ApiResponse<Episode>) => setEpisodes(data.results))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = episodes
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => filterValue ? e.episode.startsWith(filterValue) : true)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  if (loading) return <StatusMessage text="Cargando episodios..." type="loading" />;
  if (error) return <StatusMessage text={error} type="error" />;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "var(--text-color)", fontSize: "1.8rem" }}>
        Episodios
      </h2>

      <SearchBar
        value={search}
        onChange={setSearch}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={filterOptions}
        resultsCount={filtered.length}
      />

      {filtered.length === 0
        ? <StatusMessage text="No se encontraron episodios con ese filtro." type="empty" />
        : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {filtered.map((episode) => (
              <div
                key={episode.id}
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color)",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <span style={{
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  color: "var(--accent-color)",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  {episode.episode}
                </span>
                <h3 style={{ fontSize: "1.1rem", color: "var(--text-color)", margin: 0 }}>
                  {episode.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--secondary-text)", margin: 0 }}>
                  📅 {episode.air_date}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--accent-color)", margin: 0 }}>
                  👥 {episode.characters.length} personaje{episode.characters.length !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}