import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation().pathname;
    return (
        <nav className="navbar">
            <section className="top">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/Database" className={location === '/Home' ? 'nav-link active' : 'nav-link'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Movies" className={location === '/movieDatabase' ? 'nav-link active' : 'nav-link'}>Movie Database</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Home" className={location === '/groups' ? 'nav-link active' : 'nav-link'}>Groups</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Groups" className={location === '/myMovies' ? 'nav-link active' : 'nav-link'}>My Movies</Link>
                        </li>
                    </ul>
            </section>
        </nav >

    )
}

export default Navbar;