import React, { useState } from 'react';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Customer');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('role', role);

        try {
            const response = await fetch('http://localhost:8080/demo_war_exploded/signup', {
                method: 'POST',
                body: formData
            });

            // Handle the response directly here
            const text = await response.text();
            if (text === 'Signup successful') {
                alert('Signup successful! You can now log in.');
            } else {
                alert('Signup failed: ' + text);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button type="submit">Signup</button>
        </form>
    );
}

export default SignupForm;
