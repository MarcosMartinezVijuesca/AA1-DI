import { useEffect, useState } from "react";
import { getCharacters } from "../utils/api";
import type { Character, ApiResponse } from "../types";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";

const filterOptions = [
  { label: "Vivo", value: "Alive" },
  { label: "Muerto", value: "Dead" },
  { label: "Desconocido", value: "unknown" },
];

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCharacters()
      .then((data: ApiResponse<Character>) => setCharacters(data.results))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = characters
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => filterValue ? c.status === filterValue : true)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  if (loading) return <StatusMessage text="Cargando personajes..." type="loading" />;
  if (error) return <StatusMessage text={error} type="error" />;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "var(--text-color)", fontSize: "1.8rem" }}>
        Personajes
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
        ? <StatusMessage text="No se encontraron personajes con ese filtro." type="empty" />
        : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "24px"
          }}>
            {filtered.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )
      }
    </div>
  );
}