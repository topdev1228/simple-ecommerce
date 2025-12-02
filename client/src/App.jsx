import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts, fetchProduct } from './api';
import { fetchCart, addToCart, updateCart, removeFromCart, clearCart } from './cartApi';
import CartTable from './components/CartTable';
import ProductCard from './components/ProductCard';
import ProductGrid from './components/ProductGrid';
import CartIcon from './components/CartIcon';
import Hero from './components/Hero';
import { Toaster, toast } from 'react-hot-toast';
import Footer from './components/Footer';
import LoadingSkeleton from './components/LoadingSkeleton';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <div id="products" className="py-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Products</h2>
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <LoadingSkeleton key={i} className="h-72" />
            ))
            : <ProductGrid products={products} />}
        </div>
      </div>
    </>
  );
}

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      setAdded(true);
      toast.success('Added to cart!');
      setTimeout(() => setAdded(false), 1500);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="py-12 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!product) return <div className="py-12 text-center text-gray-500">Product not found.</div>;

  return (
    <div className="py-12 max-w-2xl mx-auto">
      <div className="bg-white rounded shadow p-6 flex flex-col items-center">
        {product.image_url && <img src={product.image_url} alt={product.title} className="w-64 h-64 object-cover rounded mb-4" />}
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="text-lg text-gray-600 mb-4">{product.description}</div>
        <div className="text-2xl font-bold text-blue-600 mb-6">${product.price}</div>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleAddToCart}
          disabled={adding}
        >
          {added ? 'Added!' : adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCart()
      .then(cart => {
        setCart(cart);
        return fetchProducts();
      })
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const getProduct = id => products.find(p => p.id === Number(id));
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = getProduct(id);
    return product ? { ...product, quantity: qty } : null;
  }).filter(Boolean);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdate = async (id, quantity) => {
    setUpdating(true);
    try {
      await updateCart(id, quantity);
      setCart(await fetchCart());
      toast.success('Cart updated!');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async id => {
    setUpdating(true);
    try {
      await removeFromCart(id);
      setCart(await fetchCart());
      toast.success('Removed from cart!');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleClear = async () => {
    setUpdating(true);
    try {
      await clearCart();
      setCart({});
      toast.success('Cart cleared!');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <CartTable
            cartItems={cartItems}
            updating={updating}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
          />
          <div className="flex justify-end mb-6">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleClear}
              disabled={updating}
            >
              Clear Cart
            </button>
          </div>
          <div className="text-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" disabled={updating}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

import { login, logout, createProduct, updateProduct, deleteProduct } from './adminApi';
import AdminProductTable from './components/AdminProductTable';

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', image_url: '' });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) {
      fetchProducts().then(setProducts);
    }
  }, [token]);

  const handleLogin = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      setToken(res.token);
      localStorage.setItem('adminToken', res.token);
      setSuccess('Logged in!');
      setTimeout(() => setSuccess(''), 1500);
      setEmail('');
      setPassword('');
      setProducts(await fetchProducts());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout(token);
    setToken('');
    localStorage.removeItem('adminToken');
    setProducts([]);
  };

  const handleEdit = product => {
    setEditing(product.id);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      image_url: product.image_url || '',
    });
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id, token);
    setProducts(await fetchProducts());
  };

  const handleFormChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateProduct(editing, form, token);
        setSuccess('Product updated!');
      } else {
        await createProduct(form, token);
        setSuccess('Product created!');
      }
      setProducts(await fetchProducts());
      setForm({ title: '', description: '', price: '', image_url: '' });
      setEditing(null);
      setTimeout(() => setSuccess(''), 1500);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="py-12 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="bg-white rounded shadow p-6 flex flex-col gap-4">
          <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2" required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded px-3 py-2" required />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">{success}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
      </div>
      <form onSubmit={handleFormSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-4 mb-8">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleFormChange} className="border rounded px-3 py-2" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} className="border rounded px-3 py-2" required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleFormChange} className="border rounded px-3 py-2" required min="0" step="0.01" />
        <input type="text" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleFormChange} className="border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition" disabled={loading}>{editing ? 'Update' : 'Create'} Product</button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
      </form>
      <AdminProductTable
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

function Navbar() {
  const [cart, setCart] = useState({});
  useEffect(() => {
    fetchCart().then(setCart);
  }, []);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  return (
    <nav className="flex justify-center gap-8 py-4 bg-white shadow mb-8 items-center">
      <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-blue-600">Home</Link>
      <CartIcon count={count} />
      <Link to="/admin" className="text-lg font-semibold text-gray-700 hover:text-blue-600">Admin</Link>
    </nav>
  );
}

return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Toaster position="top-right" />
    <Navbar />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
}
