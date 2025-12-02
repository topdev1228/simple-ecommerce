import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
    return (
        <div
            className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            aria-label="Product list"
        >
            {products.map(product => (
                <div key={product.id} className="transition-transform hover:-translate-y-1">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}
