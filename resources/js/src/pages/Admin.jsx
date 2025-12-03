import React, { useState } from 'react';

export default function Admin() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        fetch('/api/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(form)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to save product');
                return res.json();
            })
            .then(() => {
                setSuccess('Product saved successfully!');
                setForm({ title: '', description: '', price: '', image_url: '' });
            })
            .catch(() => setError('Failed to save product'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <form className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Product Title</label>
                    <input name="title" type="text" className="w-full border rounded px-3 py-2" value={form.title} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea name="description" className="w-full border rounded px-3 py-2" rows="3" value={form.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input name="price" type="number" className="w-full border rounded px-3 py-2" value={form.price} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Image URL</label>
                    <input name="image_url" type="text" className="w-full border rounded px-3 py-2" value={form.image_url} onChange={handleChange} required />
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</button>
                {error && <div className="mt-4 text-red-600">{error}</div>}
                {success && <div className="mt-4 text-green-600">{success}</div>}
            </form>
        </div>
    );
}