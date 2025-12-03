<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $cartItems = \App\Models\Cart::with('product')->where('user_id', $user->id)->get();
        return response()->json($cartItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $cartItem = \App\Models\Cart::updateOrCreate(
            [
                'user_id' => $user->id,
                'product_id' => $validated['product_id'],
            ],
            ['quantity' => $validated['quantity']]
        );
        return response()->json($cartItem, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = auth()->user();
        $cartItem = \App\Models\Cart::with('product')->where('user_id', $user->id)->findOrFail($id);
        return response()->json($cartItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = auth()->user();
        $cartItem = \App\Models\Cart::where('user_id', $user->id)->findOrFail($id);
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
        $cartItem->update(['quantity' => $validated['quantity']]);
        return response()->json($cartItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = auth()->user();
        $cartItem = \App\Models\Cart::where('user_id', $user->id)->findOrFail($id);
        $cartItem->delete();
        return response()->json(['message' => 'Cart item removed']);
    }
}
