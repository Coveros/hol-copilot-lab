import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header">
            <h1>The Daily Harvest</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/login">
                    <button>Admin Login</button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
