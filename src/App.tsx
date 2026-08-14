import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import Landing from "./containers/Landing";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      return true;
    }

    if (storedTheme === "light") {
      return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Geography quiz
            </p>
            <h1 className="text-2xl font-bold">Geo Quiz</h1>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setDarkMode((current) => !current)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Landing />
      </main>
    </div>
  );
}

export default App;
