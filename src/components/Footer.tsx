function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-sidebar)] px-6 py-10 text-center text-white">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl font-extrabold">
          Lakshya Academy
        </h3>

        <p className="mt-3 text-slate-300">
          Sainik School Preparation & Academic Classes
        </p>

        <div className="my-6 h-px bg-slate-700" />

        <p className="text-slate-400">
          © {new Date().getFullYear()} Lakshya Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;