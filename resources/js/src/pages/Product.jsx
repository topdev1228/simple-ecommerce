import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load product');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container mx-auto py-10 text-center">Loading product...</div>;
    if (error) return <div className="container mx-auto py-10 text-center text-red-600">{error}</div>;
    if (!product) return null;

    const [adding, setAdding] = useState(false);
    const [addMsg, setAddMsg] = useState(null);

    const handleAddToCart = () => {
        setAdding(true);
        setAddMsg(null);
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ product_id: product.id, quantity: 1 })
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to add to cart');
                return res.json();
            })
            .then(() => setAddMsg('Added to cart!'))
            .catch(() => setAddMsg('Failed to add to cart'))
            .finally(() => setAdding(false));
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Product Details</h1>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src={product.image_url} alt={product.title} className="mb-4 rounded" />
                <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                <p className="mb-2 text-gray-600">{product.description}</p>
                <span className="text-lg font-bold mb-4">${product.price}</span>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleAddToCart} disabled={adding}>{adding ? 'Adding...' : 'Add to Cart'}</button>
                {addMsg && <div className="mt-4 text-blue-600">{addMsg}</div>}
            </div>
        </div>
    );
}