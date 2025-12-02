const API_BASE = 'http://localhost:8000/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart/`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function addToCart(product_id, quantity = 1) {
  const res = await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ product_id, quantity })
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return res.json();
}

export async function updateCart(product_id, quantity) {
  const res = await fetch(`${API_BASE}/cart/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ product_id, quantity })
  });
  if (!res.ok) throw new Error('Failed to update cart');
  return res.json();
}

export async function removeFromCart(product_id) {
  const res = await fetch(`${API_BASE}/cart/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ product_id })
  });
  if (!res.ok) throw new Error('Failed to remove from cart');
  return res.json();
}

export async function clearCart() {
  const res = await fetch(`${API_BASE}/cart/clear`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to clear cart');
  return res.json();
}
