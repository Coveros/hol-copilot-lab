import { useState, useEffect, useContext } from 'react';
import { Product, Review } from '../types';
import Header from './Header';
import Footer from './Footer';
import ReviewModal from './ReviewModal';
import { CartContext } from '../context/CartContext';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { addToCart } = cartContext;

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

    const handleReviewSubmit = (review: Review) => {
        if (selectedProduct) {
            const updatedProduct = {
                ...selectedProduct,
                reviews: [review, ...selectedProduct.reviews],
            };
            const updatedProducts = products.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            );
            setProducts(updatedProducts);
            setSelectedProduct(updatedProduct);
        }
    };

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
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                )}
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    {product.description && (
                                        <p className="product-description">{product.description}</p>
                                    )}
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className={`add-to-cart-btn ${product.inStock ? '' : 'disabled'}`}
                                        disabled={!product.inStock}
                                    >
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <ReviewModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onSubmit={handleReviewSubmit}
            />
        </div>
    );
};

export default ProductsPage;
