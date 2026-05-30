import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
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
    <section className="flex min-h-[80vh] items-center justify-center bg-[var(--color-page)] px-4 py-10">
      <div className="app-card grid w-full max-w-6xl overflow-hidden md:grid-cols-2">
        <div className="flex min-h-[360px] flex-col justify-center bg-gradient-to-br from-[var(--color-primary)] via-purple-500 to-[var(--color-secondary)] p-8 text-white md:min-h-[560px] md:p-14">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Welcome Back
          </h1>

          <p className="mt-8 max-w-md text-lg leading-8">
            Login to continue your learning journey and access recorded
            lectures, study material, tests, fees and progress dashboard.
          </p>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-14">
          <h2 className="app-heading text-3xl md:text-4xl">
            Login
          </h2>

          <p className="app-muted mt-3 text-lg">
            Enter your details to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              className="app-input text-base"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="app-input text-base"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="app-button-primary w-full py-4 text-lg cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="app-muted mt-6 text-lg">
            New student?{" "}
            <Link to="/register" className="font-extrabold text-[var(--color-primary)]">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;