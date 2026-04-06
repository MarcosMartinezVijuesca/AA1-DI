type Props = {
  value: string;
  onChange: (newValue: string) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (newOrder: "asc" | "desc") => void;
  filterValue: string;
  onFilterChange: (newStatus: string) => void;
  filterOptions: { label: string; value: string }[];
  resultsCount?: number;
};

export default function SearchBar({
  value,
  onChange,
  sortOrder,
  onSortChange,
  filterValue,
  onFilterChange,
  filterOptions,
  resultsCount
}: Props) {
  const inputStyle: React.CSSProperties = {
    padding: "10px 18px",
    fontSize: "0.95rem",
    borderRadius: "50px",
    border: "2px solid var(--border-color)",
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s"
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        <input
          type="text"
          placeholder="🔎 Buscar por nombre..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, width: "250px", cursor: "text" }}
        />
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          style={inputStyle}
        >
          <option value="">Todos</option>
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
          style={inputStyle}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {resultsCount !== undefined && (
        <p style={{
          textAlign: "center",
          marginTop: "12px",
          color: "var(--secondary-text)",
          fontSize: "0.9rem"
        }}>
          {resultsCount === 0
            ? "No se encontraron resultados"
            : `${resultsCount} resultado${resultsCount !== 1 ? "s" : ""} encontrado${resultsCount !== 1 ? "s" : ""}`}
        </p>
      )}
    </div>
  );
}