<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;


Route::apiResource('products', ProductController::class);

use Illuminate\Http\Request;

// ...existing code...

// Cart API (session-based)
Route::prefix('cart')->group(function () {
	Route::get('/', function (Request $request) {
		return response(session('cart', []));
	});
	Route::post('add', function (Request $request) {
		$cart = session('cart', []);
		$productId = $request->input('product_id');
		$quantity = max(1, (int) $request->input('quantity', 1));
		$cart[$productId] = ($cart[$productId] ?? 0) + $quantity;
		session(['cart' => $cart]);
		return response($cart);
	});
	Route::post('update', function (Request $request) {
		$cart = session('cart', []);
		$productId = $request->input('product_id');
		$quantity = max(0, (int) $request->input('quantity', 1));
		if ($quantity > 0) {
			$cart[$productId] = $quantity;
		} else {
			unset($cart[$productId]);
		}
		session(['cart' => $cart]);
		return response($cart);
	});
	Route::post('remove', function (Request $request) {
		$cart = session('cart', []);
		$productId = $request->input('product_id');
		unset($cart[$productId]);
		session(['cart' => $cart]);
		return response($cart);
	});
	Route::post('clear', function () {
		session(['cart' => []]);
		return response([]);
	});
});
