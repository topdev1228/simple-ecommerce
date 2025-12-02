import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartIcon({ count }) {
    return (
        <Link to="/cart" className="relative inline-block">
            <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600" />
            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {count}
                </span>
            )}
        </Link>
    );
}
