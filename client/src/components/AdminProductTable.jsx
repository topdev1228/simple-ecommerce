import React from 'react';

export default function AdminProductTable({ products, handleEdit, handleDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white rounded shadow" aria-label="Admin product list">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">Title</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-2">{product.title}</td>
                            <td className="py-2">${product.price}</td>
                            <td className="py-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="text-blue-600 hover:bg-blue-50 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1 transition"
                                    aria-label={`Edit ${product.title}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:bg-red-50 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-2 py-1 transition"
                                    aria-label={`Delete ${product.title}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
