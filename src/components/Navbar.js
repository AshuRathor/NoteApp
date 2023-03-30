import { React, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate()
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);
  const handleOnSignout = () => {
    localStorage.removeItem("token")
    history("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link >
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/About' ? "active" : ""}`} to="/About">About</Link >
              </li>

            </ul>
            {!localStorage.getItem('token') ? <div>
              <Link to="/login" type="button" className="mx-2 btn btn-primary">Login</Link>
              <Link to="/signup" type="button" className="mx-2 btn btn-primary">Sign Up</Link>
            </div> : <button to="/login" type="button" className="mx-2 btn btn-primary" onClick={handleOnSignout}>Sign Out</button>}
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar