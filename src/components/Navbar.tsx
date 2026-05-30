import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            LA
          </div>

          <h2 className="truncate text-xl font-bold text-slate-900 md:text-2xl">
            Lakshya Academy
          </h2>
        </Link>

        <button
          className="block text-3xl text-slate-900 md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="font-medium text-slate-700">Home</Link>
          <Link to="/courses" className="font-medium text-slate-700">Courses</Link>
          <Link to="/login" className="font-medium text-slate-700">Login</Link>
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 flex flex-col gap-4 bg-white px-4 py-5 shadow-lg md:hidden">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/courses">Courses</Link>
          <Link onClick={() => setOpen(false)} to="/login">Login</Link>
          <Link
            onClick={() => setOpen(false)}
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;