<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CartService;

class CartController extends Controller
{
    public function __construct(protected CartService $cartService) {}

    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json($this->cartService->getCart());
    }

    public function add(Request $request): \Illuminate\Http\JsonResponse
    {
        $productId = $request->input('product_id');
        $quantity = (int) $request->input('quantity', 1);
        $cart = $this->cartService->addToCart($productId, $quantity);
        return response()->json($cart);
    }

    public function update(Request $request): \Illuminate\Http\JsonResponse
    {
        $productId = $request->input('product_id');
        $quantity = (int) $request->input('quantity', 1);
        $cart = $this->cartService->updateCart($productId, $quantity);
        return response()->json($cart);
    }

    public function remove(Request $request): \Illuminate\Http\JsonResponse
    {
        $productId = $request->input('product_id');
        $cart = $this->cartService->removeFromCart($productId);
        return response()->json($cart);
    }

    public function clear(): \Illuminate\Http\JsonResponse
    {
        $cart = $this->cartService->clearCart();
        return response()->json($cart);
    }
}
