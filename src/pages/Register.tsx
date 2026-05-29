import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { theme } from "../theme/theme";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h1 style={styles.heading}>Start Learning Today</h1>
          <p style={styles.text}>
            Join our coaching platform for Sainik School preparation and
            academic classes from Class 3rd to 10th.
          </p>
        </div>

        <div style={styles.right}>
          <h2 style={styles.formTitle}>Create Account</h2>
          <p style={styles.formSubText}>Register to access your dashboard</p>

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button style={styles.button} type="submit">
              Sign Up
            </button>
          </form>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "80vh",
    backgroundColor: theme.colors.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
    fontFamily: theme.font.main
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: theme.colors.white,
    borderRadius: "22px",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.15)"
  },
  left: {
    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
    color: theme.colors.white,
    padding: "60px 45px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  heading: {
    fontSize: "42px",
    marginBottom: "20px"
  },
  text: {
    fontSize: "17px",
    lineHeight: "1.7"
  },
  right: {
    padding: "50px 45px"
  },
  formTitle: {
    fontSize: "32px",
    color: theme.colors.dark,
    marginBottom: "8px"
  },
  formSubText: {
    color: theme.colors.muted,
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
    color: theme.colors.muted
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 700,
    textDecoration: "none"
  }
};

export default Register;