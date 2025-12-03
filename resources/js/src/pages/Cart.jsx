import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = () => {
        fetch('/api/cart', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setCart(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load cart');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdate = (id, quantity) => {
        fetch(`/api/cart/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ quantity })
        })
            .then(() => fetchCart());
    };

    const handleRemove = id => {
        fetch(`/api/cart/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(() => fetchCart());
    };

    const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

    if (loading) return <div className="container mx-auto py-10 text-center">Loading cart...</div>;
    if (error) return <div className="container mx-auto py-10 text-center text-red-600">{error}</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="bg-white rounded-lg shadow p-6">
                {cart.length === 0 ? (
                    <div className="text-center text-gray-500">Your cart is empty.</div>
                ) : (
                    cart.map(item => (
                        <CartItem key={item.id} item={item} onUpdate={handleUpdate} onRemove={handleRemove} />
                    ))
                )}
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Checkout</button>
                </div>
            </div>
        </div>
    );
}