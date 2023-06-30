import { NavLink } from "react-router-dom"
import { apiUrl, apiPort } from "../setting"

function Sidebar() {
  const logout = async () => {
    await fetch(`http://${apiUrl}:${apiPort}/api/logout`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    localStorage.clear()
    alert("Logout Success")
  }

  return (
    <nav
      className="sidebar d-flex flex-column justify-content-between p-3 text-white bg-dark w-25 vh-100"
      style={{ width: "280px" }}
    >
      <div className="top">
        <a
          href="/dashboard"
          className="mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <h1 className="mt-3">HRIS</h1>
          <p className="fs-6">Human Resources Information System</p>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className="nav-link text-white"
              activeclassname="active"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/attendance"
              className="nav-link text-white"
              activeclassname="active"
            >
              Kehadiran
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/payroll"
              className="nav-link text-white"
              activeclassname="active"
            >
              Keuangan
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="nav-link text-white"
              activeclassname="active"
            >
              Profil
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="/login" className="nav-link text-white" onClick={logout}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
