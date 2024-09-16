import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import CustomerDashboard from "./CustomerDashboard";
import Cart from './Cart';
import ProductDescription from './ProductDescription';
import Checkout from './Checkout';
import ManagerDashboard from "./ManagerDashboard";
import SalesDashboard from "./SalesDashboard";

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Load user and cart data from localStorage when the app loads
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedCart = localStorage.getItem('cart');
        if (storedUser) {
            setUser(JSON.parse(storedUser));  // Set user from localStorage
        }
        if (storedCart) {
            setCart(JSON.parse(storedCart));  // Set cart from localStorage
        }
    }, []);

    // Save user and cart data to localStorage when they change
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [user, cart]);

    const handleLoginSuccess = (username, role) => {
        const userData = { username, role }; // Assuming role is passed correctly
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store in localStorage
    };

    const handleLogout = () => {
        setUser(null); // Clear user state
        setCart([]); // Optionally clear the cart
        localStorage.removeItem('user'); // Clear localStorage
        localStorage.removeItem('cart'); // Clear cart from localStorage
    };

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    const removeFromCart = (productToRemove) => {
        const updatedCart = cart.filter((product) => product !== productToRemove);
        setCart(updatedCart);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={user ? (
                            <Navigate to={`/${user.role.toLowerCase()}-dashboard`} replace />
                        ) : (
                            <>
                                <h1>{isLogin ? 'Login' : 'Signup'}</h1>
                                {isLogin ? (
                                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                                ) : (
                                    <SignupForm />
                                )}
                                <p>
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button onClick={() => setIsLogin(!isLogin)}>
                                        {isLogin ? 'Signup' : 'Login'}
                                    </button>
                                </p>
                            </>
                        )}
                    />
                    <Route
                        path="/signup"
                        element={!user ? <SignupForm /> : <Navigate to={`/${user.role.toLowerCase()}-dashboard`} replace />}
                    />
                    <Route
                        path="/customer-dashboard"
                        element={user && user.role === 'Customer' ? (
                            <CustomerDashboard
                                user={user}
                                cart={cart}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                                onLogout={handleLogout}
                            />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/storemanager-dashboard"
                        element={user && user.role === 'StoreManager' ? (
                            <ManagerDashboard user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/salesman-dashboard"
                        element={user && user.role === 'Salesman' ? (
                            <SalesDashboard user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/cart"
                        element={user && user.role === 'Customer' ? (
                            <Cart cart={cart} removeFromCart={removeFromCart} />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/product/:id"
                        element={user && user.role === 'Customer' ? (
                            <ProductDescription cart={cart} addToCart={addToCart} />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/checkout"
                        element={user && user.role === 'Customer' ? (
                            <Checkout cart={cart} />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
