import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation().pathname;
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className={location === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Movies" className={location === '/Movies' ? 'nav-link active' : 'nav-link'}>Movie Database</Link>
                        </li>
     
                        <li className="nav-item">
                            <Link to="/Groups" className={location === '/Groups' ? 'nav-link active' : 'nav-link'}>Groups</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Mymovies" className={location === '/Mymovies' ? 'nav-link active' : 'nav-link'}>My Movies</Link>
                        </li>
    </ul>
  </div>
</nav>
    )
}
export default Navbar;