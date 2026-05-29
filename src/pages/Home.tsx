
import { theme } from "../theme/theme";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ fontFamily: theme.font.main, backgroundColor: theme.colors.light }}>

      <section
        style={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px",
          gap: "40px"
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h1
            style={{
              fontSize: "52px",
              color: theme.colors.dark,
              marginBottom: "20px"
            }}
          >
            Build Your Future With Quality Coaching
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: theme.colors.muted,
              lineHeight: "1.7"
            }}
          >
            We provide Sainik School preparation and academic classes from
            Class 3rd to 10th with recorded lectures, progress tracking and
            student dashboard.
          </p>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <Link
              to="/register"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Get Started
            </Link>

            <Link
              to="/login"
              style={{
                border: `2px solid ${theme.colors.primary}`,
                color: theme.colors.primary,
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Login
            </Link>
          </div>
        </div>

        <div
          style={{
            width: "420px",
            height: "320px",
            borderRadius: "20px",
            backgroundColor: theme.colors.white,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "80px"
          }}
        >
          🎓
        </div>
      </section>

    </div>
  );
}

export default Home;