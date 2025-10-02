import { useState, useEffect } from 'react'
import './App.css'
import { Product } from './types'

function App() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProducts = async () => {
        try {
            // List of product files to load
            // Dynamically import all JSON files from the products directory
            // List of product files to load
            const productFiles = [
            'apple.json',
            'grapes.json',
            'orange.json',
            'pear.json'
            ]
            const productPromises = productFiles.map(async (file) => {
            const response = await fetch(`products/${file}`)
            if (!response.ok) throw new Error(`Failed to load ${file}`)
            return await response.json()
            })

            const loadedProducts = await Promise.all(productPromises)
            setProducts(loadedProducts)
        } catch (error) {
            console.error('Error loading products:', error)
        } finally {
            setLoading(false)
        }
        }

        loadProducts()
    }, [])

    if (loading) {
        return (
        <div className="app">
            <header className="app-header">
            <h1>Shopping Website</h1>
            <nav>
                <a href="#home">Home</a>
                <a href="#products">Products</a>
            </nav>
            </header>
            <main className="main-content">
            <div className="loading">Loading products...</div>
            </main>
        </div>
        )
    }

    return (
        <div className="app">
        <header className="app-header">
            <h1>Shopping Website</h1>
            <nav>
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            </nav>
        </header>
        
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
        
        <footer className="app-footer">
            <p>&copy; 2025 Shopping Website. All rights reserved.</p>
        </footer>
        </div>
    )
}

export default App