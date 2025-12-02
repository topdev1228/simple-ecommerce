import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col">
            <img
                src={product.image_url || '/placeholder.png'}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <div className="text-lg font-bold text-blue-600 mb-2">${product.price}</div>
            <Link to={`/product/${product.id}`} className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center">
                View Details
            </Link>
        </div>
    );
}
