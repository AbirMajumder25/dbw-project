import ThemeToggle from "./ThemeToggle";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top"
    >
      <div className="container">

        <a
          className="navbar-brand fw-bold"
          href="/"
        >
          🇩🇪 DBW Analytics
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <a
                className="nav-link"
                href="#dashboard"
              >
                📊 Dashboard
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#statistics"
              >
                📈 Statistics
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#regions"
              >
                🌍 Regions
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#sources"
              >
                📚 Data Sources
              </a>
            </li>

            <li className="nav-item">

              <a
                className="nav-link"
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noreferrer"
              >
                📘 Swagger
              </a>

            </li>

            

            <li className="nav-item ms-3">

              <ThemeToggle
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;