import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

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
    <section className="flex min-h-[80vh] items-center justify-center bg-[var(--color-page)] px-4 py-10">
      <div className="app-card grid w-full max-w-6xl overflow-hidden md:grid-cols-2">
        <div className="flex min-h-[360px] flex-col justify-center bg-gradient-to-br from-[var(--color-primary)] via-purple-500 to-[var(--color-secondary)] p-8 text-white md:min-h-[560px] md:p-14">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Start Learning Today
          </h1>

          <p className="mt-8 max-w-md text-lg leading-8">
            Join our coaching platform for Sainik School preparation and
            academic classes from Class 3rd to 10th.
          </p>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-14">
          <h2 className="app-heading text-3xl md:text-4xl">
            Create Account
          </h2>

          <p className="app-muted mt-3 text-lg">
            Register to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              className="app-input text-base"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              className="app-input text-base"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="app-input text-base"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              className="app-button-primary w-full py-4 text-lg cursor-pointer"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <p className="app-muted mt-6 text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-extrabold text-[var(--color-primary)]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;