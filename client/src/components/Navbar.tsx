import { Link, useLocation } from 'react-router-dom';
import Search from './Search'

const Navbar = () => {
  const location = useLocation().pathname;
  return (
    <nav className="header-back navbar navbar-expand-xl">
      <button className="navbar-toggler border border-light " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <section className="top">
          <ul className="navbar-nav">
            <li className="nav-item px-2">
              <Link to="/" className={location === '/' ? 'title2' : 'title1'}>Home</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/Movies" className={location === '/Movies' ? 'title2' : 'title1'}>Movie Database</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/Groups" className={location === '/Groups' ? 'title2' : 'title1'}>Groups</Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/Mymovies" className={location === '/Mymovies' ? 'title2' : 'title1'}>My Movies</Link>
            </li>
            <li>
              <Link to="/login">
                <button className="btn btn-outline-light">Login</button>
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="ps-3 pe-2">
              <Search />
              <div className="d-flex align-items-center ms-auto">

              </div>
              <div className="ps-5 pe-2">
                < Search />
              </div>
            </div>
          </div>
        </section>
      </div>
    </nav >
  )
};
export default Navbar;