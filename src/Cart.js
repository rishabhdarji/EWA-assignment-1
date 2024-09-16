// Cart.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/Cart.css';

function Cart() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart: initialCart } = location.state || { cart: [] }; // Get cart data from location state
    const [uniqueCart, setUniqueCart] = useState([]);

    // Group products by name and count occurrences
    useEffect(() => {
        const productMap = {};
        initialCart.forEach(product => {
            if (productMap[product.name]) {
                productMap[product.name].count += 1;
            } else {
                productMap[product.name] = { ...product, count: 1 };
            }
        });
        setUniqueCart(Object.values(productMap));
    }, [initialCart]);

    // Remove one product at a time
    const handleRemove = (productToRemove) => {
        const updatedCart = uniqueCart.map(product => {
            if (product.name === productToRemove.name) {
                return { ...product, count: product.count - 1 }; // Decrease count
            }
            return product;
        }).filter(product => product.count > 0); // Remove product completely if count is 0

        setUniqueCart(updatedCart);
    };

    // Handle Checkout
    const handleCheckout = () => {
        navigate('/checkout', { state: { cart: uniqueCart } }); // Pass the cart data to the checkout page
    };

    return (
        <div className="cart-page">
            <header className="cart-header">
                <h1>Your Cart</h1>
                <button onClick={() => navigate("/customer-dashboard", { state: { cart: initialCart } })}>Back to Shopping</button>

            </header>
            <main>
                {uniqueCart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <ul className="cart-items">
                            {uniqueCart.map((product, index) => (
                                <li key={index} className="cart-item">
                                    <div className="product-details">
                                        <h3>{product.name} {product.count > 1 && <span>x{product.count}</span>}</h3>
                                        <p>Category: {product.category}</p>
                                        <p>Price: ${product.price}</p>
                                    </div>
                                    <button onClick={() => handleRemove(product)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="checkout-section">
                            <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Cart;
