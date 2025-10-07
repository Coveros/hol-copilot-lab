import { useState, useEffect } from 'react';
import { Product } from '../types';
import Header from './Header';
import Footer from './Footer';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="app">
                <Header />
                <main className="main-content">
                    <div className="loading">Loading products...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="products-container">
                    <h2>Our Products</h2>
                    <div className="products-grid">
                        {products.map((product) => (
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
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    {product.description && (
                                        <p className="product-description">{product.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductsPage;
