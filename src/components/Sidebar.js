import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="mb-5">
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            AlignCRM
          </Link>

          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="d-none d-lg-block bg-dark text-white p-3"
            style={{
              width: "250px",
              height: "100vh",
              position: "fixed",
              top: "56px",
              left: "0",
            }}
          >
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active text-white">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/leads"} className="nav-link active text-white">
                  Leads
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/agents"} className="nav-link text-white">
                  Agents
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/reports"} className="nav-link text-white">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Offcanvas sidebar */}
          <div
            className="offcanvas offcanvas-end text-bg-dark d-lg-none"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                AlignCRM
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 flex-column">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link active text-white">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/leads"} className="nav-link active text-white">
                    Leads
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/agents"} className="nav-link text-white">
                    Agents
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/reports"} className="nav-link text-white">
                    Reports
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
