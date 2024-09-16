// ManagerDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ManagerDashboard({ user }) {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <header>
                <h1>Welcome, {user.username} (StoreManager)</h1>
                <button onClick={() => { localStorage.clear(); navigate("/"); }}>Logout</button>
            </header>
            <main>
                <h2>Product Management</h2>
                <p>Here you can manage the products in your store.</p>
                {/* Additional product management features */}
            </main>
            <footer>
                <p>Manager Dashboard Footer &copy; 2024</p>
            </footer>
        </div>
    );
}

export default ManagerDashboard;
