import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import { theme } from "../theme/theme";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      const meRes = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${res.data.token}`
        }
      });

      authContext?.setUser(meRes.data.user);

      navigate("/dashboard");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to continue your learning journey</p>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.bottomText}>
          New student?{" "}
          <Link to="/register" style={styles.link}>
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "80vh",
    background: `linear-gradient(135deg, ${theme.colors.light}, #e0f2fe)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
    fontFamily: theme.font.main
  },
  loginBox: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: theme.colors.white,
    padding: "45px",
    borderRadius: "22px",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.15)"
  },
  title: {
    fontSize: "34px",
    color: theme.colors.dark,
    marginBottom: "8px",
    textAlign: "center"
  },
  subtitle: {
    color: theme.colors.muted,
    textAlign: "center",
    marginBottom: "28px"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "16px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer"
  },
  bottomText: {
    marginTop: "20px",
    color: theme.colors.muted,
    textAlign: "center"
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 700,
    textDecoration: "none"
  }
};

export default Login;