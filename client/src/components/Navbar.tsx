import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation().pathname;
    return (
        <nav className="navbar">
            <section className="top">
                    <ul className="navbar-nav">
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
            </section>
        </nav >

    )
}

export default Navbar;