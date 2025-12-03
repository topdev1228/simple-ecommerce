import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src={product.image_url} alt={product.title} className="mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="mb-2 text-gray-600">{product.description}</p>
            <span className="text-lg font-bold mb-4">${product.price}</span>
            <Link to={`/product/${product.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</Link>
        </div>
    );
}
