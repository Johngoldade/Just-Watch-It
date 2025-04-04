import Navbar from './Navbar'

import Search from './Search'

const Header = () => {
    return (
        <header className='.d-flex fustify-content=-between'>
            <h1>Just-Watch-It</h1>

            <Search />
            <Navbar />
        </header>
    )
}

export default Header