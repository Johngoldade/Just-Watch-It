import Navbar from './Navbar'
import logo from '../../images/clapperboard.png'


const Header = () => {
    return (
        <header>
            <div className='header-back title'>
                <h1 className=' title2'>Just <span className='title1'>Watch</span> It</h1>
                <img src={logo} className='title-img ms-3' />
            </div>

            <div>
                <Navbar />
            </div>

        </header>
    )
}

export default Header