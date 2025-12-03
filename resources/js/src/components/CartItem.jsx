import React from 'react';

export default function CartItem({ item, onUpdate, onRemove }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-xl font-semibold">{item.product?.title}</h2>
                <span className="text-gray-600">Quantity: </span>
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => onUpdate(item.id, Number(e.target.value))}
                    className="border rounded px-2 py-1 w-16"
                />
            </div>
            <span className="text-lg font-bold">${item.product?.price}</span>
            <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    );
}
