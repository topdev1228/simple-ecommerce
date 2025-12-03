import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container mx-auto py-10 text-center">Loading products...</div>;
    if (error) return <div className="container mx-auto py-10 text-center text-red-600">{error}</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6 text-center">Awesome E-commerce Demo</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}