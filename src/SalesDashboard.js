// SalesDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SalesDashboard({ user }) {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <header>
                <h1>Welcome, {user.username} (Salesman)</h1>
                <button onClick={() => { localStorage.clear(); navigate("/"); }}>Logout</button>
            </header>
            <main>
                <h2>Customer Management</h2>
                <p>Here you can manage customer accounts and orders.</p>
                {/* Additional customer management features */}
            </main>
            <footer>
                <p>Sales Dashboard Footer &copy; 2024</p>
            </footer>
        </div>
    );
}

export default SalesDashboard;
