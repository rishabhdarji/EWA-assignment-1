import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer'); // Default role
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('username', username);
        formData.append('password', password);
        formData.append('role', role);  // Send role to backend

        try {
            const response = await fetch('http://localhost:8080/demo_war_exploded/auth', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();  // Parse the response as JSON
            if (data.status === 'Login successful') {
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);

                // Redirect to respective dashboard based on role
                if (data.role === 'StoreManager') {
                    navigate('/manager-dashboard');
                } else if (data.role === 'Salesman') {
                    navigate('/sales-dashboard');
                } else {
                    navigate('/customer-dashboard');
                }
            } else {
                alert(data.status);  // Show "Invalid credentials" or other status
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Debugging: Move console logs before the return statement
    console.log("Submitted Username:", username);
    console.log("Submitted Password:", password);
    console.log("Selected Role:", role);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="Customer">Customer</option>
                    <option value="Salesman">Salesman</option>
                    <option value="StoreManager">Store Manager</option>
                </select>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
