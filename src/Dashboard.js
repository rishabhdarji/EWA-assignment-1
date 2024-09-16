// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user }) {
    const navigate = useNavigate();


    return (
        <div className="dashboard">
            <header>
                <h1>Welcome, {user.username}</h1>
                <button onClick={()=>{localStorage.clear();navigate("/")} }>Logout</button>
            </header>
            <main>
                <section className="stats">
                    <h2>Dashboard Overview</h2>
                    <div className="stats-grid">
                        <div className="stat-box">
                            <h3>Users</h3>
                            <p>150</p>
                        </div>
                        <div className="stat-box">
                            <h3>Sales</h3>
                            <p>$3,000</p>
                        </div>
                        <div className="stat-box">
                            <h3>Performance</h3>
                            <p>85%</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <p>Dashboard Footer &copy; 2024</p>
            </footer>
        </div>
    );
}

export default Dashboard;
