// CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Css/Customer.css';
import productsData from './Data/products.json'; // Importing products from the JSON file

function CustomerDashboard({ user }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [cart, setCart] = useState([]);

    // Load cart data either from localStorage or from the Cart.js state (when returning from cart)
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (location.state?.cart) {
            setCart(location.state.cart);  // Use cart passed from Cart.js
        } else if (storedCart) {
            setCart(JSON.parse(storedCart));  // Use stored cart from localStorage
        }
    }, [location.state?.cart]);

    // Save cart data to localStorage when cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const [selectedCategory, setSelectedCategory] = useState("All Products");

    // Add product to cart
    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    // Remove product from cart
    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('user'); // Only clear the user information
        navigate("/"); // Navigate to the login page
    };

    // View Cart button function
    const handleViewCartClick = () => {
        navigate("/cart", { state: { cart } }); // Pass the cart data when navigating
    };

    // Filter products by category
    const filteredProducts = selectedCategory === "All Products"
        ? productsData
        : productsData.filter(product => product.category === selectedCategory);

    return (
        <div className="customer-dashboard">
            <header className="navbar">
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + "/Image/home%20image.jpg"} alt="SmartHome Logo" />
                </div>
                <nav>
                    <ul>
                        <li onClick={() => setSelectedCategory("All Products")}>All Products</li>
                        <li onClick={() => setSelectedCategory("Smart Doorbells")}>Smart Doorbells</li>
                        <li onClick={() => setSelectedCategory("Smart Doorlocks")}>Smart Doorlocks</li>
                        <li onClick={() => setSelectedCategory("Smart Speakers")}>Smart Speakers</li>
                        <li onClick={() => setSelectedCategory("Smart Lightings")}>Smart Lightings</li>
                        <li onClick={() => setSelectedCategory("Smart Thermostats")}>Smart Thermostats</li>
                    </ul>
                </nav>
                <div className="account-info">
                    <div className="cart">
                        <span role="img" aria-label="cart">🛒</span> ({cart.length})
                        <div className="cart-dropdown">
                            {cart.length === 0 ? (
                                <p>No items in cart</p>
                            ) : (
                                <>
                                    <ul>
                                        {cart.map((item, index) => (
                                            <li key={index}>
                                                {item.name} - ${item.price}
                                                <button onClick={() => removeFromCart(index)}>Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="view-cart-btn" onClick={handleViewCartClick}>View Cart</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="account">
                        <span role="img" aria-label="account">👤</span>
                        <div className="account-dropdown">
                            <p>Welcome, {user.username}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <h2>{selectedCategory}</h2>
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <div className="product-card" key={product.id} onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CustomerDashboard;
