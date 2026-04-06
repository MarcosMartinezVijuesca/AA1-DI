import { useEffect, useState } from "react";
import { getLocations } from "../utils/api";
import type { Location, ApiResponse } from "../types";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";

const filterOptions = [
  { label: "Planet", value: "Planet" },
  { label: "Space station", value: "Space station" },
  { label: "Microverse", value: "Microverse" },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getLocations()
      .then((data: ApiResponse<Location>) => setLocations(data.results))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = locations
    .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
    .filter((l) => filterValue ? l.type === filterValue : true)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  if (loading) return <StatusMessage text="Cargando ubicaciones..." type="loading" />;
  if (error) return <StatusMessage text={error} type="error" />;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "var(--text-color)", fontSize: "1.8rem" }}>
        Ubicaciones
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
        ? <StatusMessage text="No se encontraron ubicaciones con ese filtro." type="empty" />
        : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {filtered.map((location) => (
              <div
                key={location.id}
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
                <h3 style={{ fontSize: "1.1rem", color: "var(--text-color)", margin: 0 }}>
                  🌍 {location.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--secondary-text)", margin: 0 }}>
                  <strong>Tipo:</strong> {location.type || "Desconocido"}
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--secondary-text)", margin: 0 }}>
                  <strong>Dimensión:</strong> {location.dimension || "Desconocida"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--accent-color)", margin: 0 }}>
                  👥 {location.residents.length} residente{location.residents.length !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}