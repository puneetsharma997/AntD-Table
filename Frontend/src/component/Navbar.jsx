import logo from '../rubick-logo.png';

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <img style={{ height: '40px' }} src={logo} alt="logo" />
            </div>

            <div className="nav-right">
                <span className="material-symbols-sharp"> circle_notifications </span>
                <span className="material-symbols-sharp"> account_circle </span>
            </div>

        </div>

    )
}

export default Navbar
