import React from 'react';

export default function CartTable({ cartItems, updating, handleUpdate, handleRemove }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="overflow-x-auto">
            <table className="w-full mb-6" aria-label="Shopping cart items">
                <thead>
                    <tr className="text-left border-b">
                        <th className="py-2">Product</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-2">{item.title}</td>
                            <td className="py-2">${item.price}</td>
                            <td className="py-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    disabled={updating}
                                    aria-label={`Quantity for ${item.title}`}
                                    onChange={e => handleUpdate(item.id, Number(e.target.value))}
                                    className="w-16 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                            </td>
                            <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="py-2">
                                <button
                                    className="text-red-600 hover:bg-red-50 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-2 py-1 transition"
                                    onClick={() => handleRemove(item.id)}
                                    disabled={updating}
                                    aria-label={`Remove ${item.title} from cart`}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            </div>
        </div>
    );
}
