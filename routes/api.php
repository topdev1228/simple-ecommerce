<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;


Route::apiResource('products', ProductController::class);

use Illuminate\Http\Request;

// Auth: Login (returns token)
Route::post('login', function (Request $request) {
	$request->validate([
		'email' => 'required|email',
		'password' => 'required',
		'device_name' => 'required',
	]);
	$user = \App\Models\User::where('email', $request->email)->first();
	if (! $user || ! \Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
		return response(['message' => 'Invalid credentials'], 401);
	}
	$token = $user->createToken($request->device_name)->plainTextToken;
	return response(['token' => $token]);
});

// Auth: Logout
Route::middleware('auth:sanctum')->post('logout', function (Request $request) {
	$request->user()->currentAccessToken()->delete();
	return response()->noContent();
});

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
