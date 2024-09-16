// Checkout.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/Checkout.css'; // Ensure this CSS file exists for styling

function Checkout() {
    const location = useLocation();
    const { cart } = location.state || { cart: [] }; // Receive the cart data from the Cart page
    const navigate = useNavigate();

    const [deliveryOption, setDeliveryOption] = useState('homeDelivery'); // Default to Home Delivery
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        creditCard: '',
        phone: '',
    });

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        setFormData({
            name: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            creditCard: '',
            phone: '',
        });
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <form className="checkout-form" onSubmit={handleSubmit}>
                {/* Delivery Option */}
                <div className="delivery-options">
                    <label>
                        <input
                            type="radio"
                            value="homeDelivery"
                            checked={deliveryOption === 'homeDelivery'}
                            onChange={() => setDeliveryOption('homeDelivery')}
                        />
                        Home Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="instorePickup"
                            checked={deliveryOption === 'instorePickup'}
                            onChange={() => setDeliveryOption('instorePickup')}
                        />
                        In-Store Pickup
                    </label>
                </div>

                {/* Form Fields */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {deliveryOption === 'homeDelivery' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipcode">Zip Code</label>
                            <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="creditCard">Credit Card Number</label>
                    <input
                        type="text"
                        id="creditCard"
                        name="creditCard"
                        value={formData.creditCard}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="checkout-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/cart", { state: { cart } })} // Pass cart data back to cart page
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
