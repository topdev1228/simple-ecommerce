import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav className="bg-gray-900 text-white py-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
          <div className="space-x-6">
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/admin" className="hover:underline">Admin</Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
