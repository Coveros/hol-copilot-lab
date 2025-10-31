import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import CartPage from './components/CartPage';
import ContactUsPage from './components/ContactUsPage';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
            </Routes>
        </CartProvider>
    );
}

export default App;