// ProductDescription.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/ProductDescription.css';

function ProductDescription() {
    const location = useLocation();
    const { product } = location.state || {};
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [accessoryAdded, setAccessoryAdded] = useState(false);
    const navigate = useNavigate();

    if (!product) {
        return <p>Product not found</p>;
    }

    // Update the total price based on quantity and accessory
    const totalPrice = (product.price * quantity + (accessoryAdded ? 29.99 : 0)).toFixed(2);

    // Handle increasing quantity
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    // Handle decreasing quantity
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Define a single accessory (replacing random generation)
    const accessory = {
        name: "Extra Battery",
        description: "Enhance your product with an extra battery for extended usage.",
        price: 29.99,
    };

    // Handle adding the accessory to the cart
    const handleTakeAccessory = () => {
        setAccessoryAdded(!accessoryAdded); // Toggle accessory addition
    };

    // Handle the checkout button
    const handleCheckout = () => {
        navigate("/checkout", { state: { product, quantity, accessoryAdded } }); // Navigate to Checkout with product details
    };

    return (
        <div className="product-description-container">
            <div className="product-box">
                <h1>{product.name}</h1>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Warranty:</strong> 2 years</p>
                <div className="quantity-control">
                    <p><strong>Quantity:</strong></p>
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <p><strong>Total Price:</strong> ${totalPrice}</p>
            </div>

            <div className="accessory-section">
                <h2>Accessory</h2>
                <div className="accessory-box">
                    <h3>{accessory.name}</h3>
                    <p>{accessory.description}</p>
                    <p><strong>Price:</strong> ${accessory.price}</p>
                    <button onClick={handleTakeAccessory}>
                        {accessoryAdded ? 'Remove Accessory' : 'Take this'}
                    </button>
                </div>
            </div>

            <div className="action-buttons">
                <button onClick={handleCheckout}>Checkout</button>
                <button onClick={() => navigate("/customer-dashboard")}>Back to Products</button>
            </div>
        </div>
    );
}

export default ProductDescription;
