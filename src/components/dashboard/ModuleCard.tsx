import { theme } from "../../theme/theme";

interface Props {
  title: string;
  description: string;
  icon: string;
}

function ModuleCard({ title, description, icon }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: theme.colors.white,
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 28px rgba(15,23,42,0.08)"
  },
  icon: {
    fontSize: "34px",
    marginBottom: "15px"
  },
  title: {
    color: theme.colors.dark,
    marginBottom: "8px"
  },
  description: {
    color: theme.colors.muted,
    lineHeight: "1.6"
  }
};

export default ModuleCard;