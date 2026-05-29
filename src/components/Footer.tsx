import { theme } from "../theme/theme";

function Footer() {
  return (
    <footer
      style={{
        fontFamily: theme.font.main,
        backgroundColor: theme.colors.dark,
        color: theme.colors.white,
        padding: "30px 60px",
        marginTop: "60px",
        textAlign: "center"
      }}
    >
      <h3>{theme.logo.name}</h3>
      <p style={{ color: "#cbd5e1" }}>
        Sainik School Preparation & Academic Classes
      </p>
      <p style={{ color: "#94a3b8" }}>
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;