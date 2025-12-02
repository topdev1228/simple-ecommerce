<?php

namespace App\Services;

class CartService
{
    public function getCart(): array
    {
        return session('cart', []);
    }

    public function addToCart(int|string $productId, int $quantity = 1): array
    {
        $cart = $this->getCart();
        $cart[$productId] = ($cart[$productId] ?? 0) + max(1, $quantity);
        session(['cart' => $cart]);

        return $cart;
    }

    public function updateCart(int|string $productId, int $quantity): array
    {
        $cart = $this->getCart();
        $quantity = max(0, $quantity);
        if ($quantity > 0) {
            $cart[$productId] = $quantity;
        } else {
            unset($cart[$productId]);
        }
        session(['cart' => $cart]);

        return $cart;
    }

    public function removeFromCart(int|string $productId): array
    {
        $cart = $this->getCart();
        unset($cart[$productId]);
        session(['cart' => $cart]);

        return $cart;
    }

    public function clearCart(): array
    {
        session(['cart' => []]);

        return [];
    }
}
