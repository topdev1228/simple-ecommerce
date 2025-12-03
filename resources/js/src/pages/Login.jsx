import React, { useState } from 'react';

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(form)
        })
            .then(res => {
                if (!res.ok) throw new Error('Login failed');
                return res.json();
            })
            .then(() => {
                setLoading(false);
                onLogin && onLogin();
            })
            .catch(() => {
                setError('Login failed');
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
            <form className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Email</label>
                    <input name="email" type="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Password</label>
                    <input name="password" type="password" className="w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} required />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                {error && <div className="mt-4 text-red-600">{error}</div>}
            </form>
        </div>
    );
}
