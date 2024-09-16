import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from './Dashboard';
import MainPage from './MainPage';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (username) => {
        setUser({ username });
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
