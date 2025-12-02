import React, { useState } from 'react';
import { login, logout } from './api';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            await login(email, password);
            setIsAuthenticated(true);
        } catch (err) {
            setAuthError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                    {authError && <div style={{ color: 'red' }}>{authError}</div>}
                </form>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <div>Welcome! You are logged in.</div>
                </div>
            )}
            {/* ...existing SPA content... */}
        </div>
    );
}

export default App;