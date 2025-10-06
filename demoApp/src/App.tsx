import { useState, useEffect } from 'react'
import './App.css'
import { Product } from './types'

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<'main' | 'login' | 'admin' | 'cart'>('main');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [salePercent, setSalePercent] = useState<number>(0);
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productFiles = [
                    'apple.json',
                    'grapes.json',
                    'orange.json',
                    'pear.json'
                ];
                const productPromises = productFiles.map(async (file) => {
                    const response = await fetch(`products/${file}`);
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return await response.json();
                });
                const loadedProducts = await Promise.all(productPromises);
                setProducts(loadedProducts);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Admin login logic
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setPage('admin');
            setLoginError('');
            setUsername('');
            setPassword('');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    // Add to cart logic
    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    // Render cart page
    if (page === 'cart') {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Shopping Website</h1>
                    <nav>
                        <a href="#home">Home</a>
                        <a href="#products">Products</a>
                        <button onClick={() => setPage('cart')}>Cart ({cart.length})</button>
                    </nav>
                </header>
                <main className="main-content">
                    <div className="cart-container">
                        <h2>Your Cart</h2>
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <div className="cart-items">
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        {item.image && (
                                            <img
                                                src={`products/productImages/${item.image}`}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                        )}
                                        <div className="cart-item-info">
                                            <h3>{item.name}</h3>
                                            <p>${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button onClick={() => setPage('main')} style={{ marginTop: '2rem' }}>Continue Shopping</button>
                    </div>
                </main>
                <footer className="app-footer">
                    <p>&copy; 2025 Shopping Website. All rights reserved.</p>
                    <button onClick={() => setPage('login')}>Admin Login</button>
                </footer>
            </div>
        );
    }

    // Render admin portal
    if (page === 'admin') {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Shopping Website</h1>
                </header>
                <main className="main-content">
                    <div className="admin-portal">
                        <h2>Welcome to the admin portal.</h2>
                        <div style={{ marginTop: '2rem' }}>
                            <label htmlFor="salePercent">Set Sale Percent (% off for all items): </label>
                            <input
                                id="salePercent"
                                type="text"
                                value={salePercent}
                                onChange={e => setSalePercent(Number(e.target.value))}
                                style={{ marginLeft: '1rem', padding: '0.5rem', width: '80px' }}
                            />
                        </div>
                        <p style={{ marginTop: '1rem', color: 'green' }}>
                            {salePercent > 0 ? `All products are ${salePercent}% off!` : 'No sale active.'}
                        </p>
                        <button style={{ marginTop: '2rem' }} onClick={() => setPage('main')}>Back to Storefront</button>
                    </div>
                </main>
                <footer className="app-footer">
                    <p>&copy; 2025 Shopping Website. All rights reserved.</p>
                </footer>
            </div>
        );
    }

    // Render login page
    if (page === 'login') {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Shopping Website</h1>
                </header>
                <main className="main-content">
                    <div className="login-container">
                        <h2>Admin Login</h2>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                style={{ marginBottom: '1rem', padding: '0.5rem' }}
                                autoFocus
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ marginBottom: '1rem', padding: '0.5rem' }}
                            />
                            <button type="submit" style={{ padding: '0.5rem' }}>Login</button>
                            {loginError && <p style={{ color: 'red', marginTop: '1rem' }}>{loginError}</p>}
                        </form>
                        <button onClick={() => setPage('main')} style={{ marginTop: '2rem' }}>Back to Home</button>
                    </div>
                </main>
                <footer className="app-footer">
                    <p>&copy; 2025 Shopping Website. All rights reserved.</p>
                </footer>
            </div>
        );
    }

    // Render main page
    if (loading) {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>Shopping Website</h1>
                    <nav>
                        <a href="#home">Home</a>
                        <a href="#products">Products</a>
                        <button onClick={() => setPage('cart')}>Cart ({cart.length})</button>
                        <button onClick={() => setPage('login')}>Admin Login</button>
                    </nav>
                </header>
                <main className="main-content">
                    <div className="loading">Loading products...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Shopping Website</h1>
                <nav>
                    <a href="#home">Home</a>
                    <a href="#products">Products</a>
                    <button onClick={() => setPage('cart')}>Cart ({cart.length})</button>
                </nav>
            </header>
            <main className="main-content">
                <div className="products-container">
                    <h2>Our Products</h2>
                    {salePercent > 0 && (
                        <p style={{ color: 'green', fontWeight: 'bold' }}>
                            Sale: All products are {salePercent}% off!
                        </p>
                    )}
                    <div className="products-grid">
                        {products.map((product) => {
                            const salePrice = salePercent > 0
                                ? product.price * (1 - salePercent / 100)
                                : product.price;
                            return (
                                <div key={product.id || product.name} className="product-card">
                                    {product.image && (
                                        <img
                                            src={`products/productImages/${product.image}`}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    )}
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-price">
                                            {salePercent > 0 ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '0.5rem' }}>
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                                                        ${salePrice.toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <>${product.price.toFixed(2)}</>
                                            )}
                                        </p>
                                        {product.description && (
                                            <p className="product-description">{product.description}</p>
                                        )}
                                        <button
                                            className={product.inStock ? "add-to-cart-btn" : "add-to-cart-btn disabled"}
                                            onClick={() => product.inStock && addToCart(product)}
                                            disabled={!product.inStock}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
            <footer className="app-footer">
                <p>&copy; 2025 Shopping Website. All rights reserved.</p>
                <button onClick={() => setPage('login')}>Admin Login</button>
            </footer>
        </div>
    );
}

export default App;