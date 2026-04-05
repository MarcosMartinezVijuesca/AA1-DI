type StatusMessageProps = {
  text: string;
  type?: "loading" | "error" | "empty";
};

export default function StatusMessage({ text, type = "loading" }: StatusMessageProps) {
  const emoji = type === "error" ? "❌" : type === "empty" ? "🔍" : "⏳";
  
  return (
    <div style={{
      textAlign: "center",
      marginTop: "80px",
      fontSize: "1.2rem",
      color: type === "error" ? "#ef4444" : "var(--secondary-text)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px"
    }}>
      <span style={{ fontSize: "3rem" }}>{emoji}</span>
      <p>{text}</p>
    </div>
  );
}