<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;


Route::apiResource('products', ProductController::class);

use Illuminate\Http\Request;

// ...existing code...

// Cart API (session-based)
use App\Http\Controllers\CartController;

Route::prefix('cart')->group(function () {
	Route::get('/', [CartController::class, 'index']);
	Route::post('add', [CartController::class, 'add']);
	Route::post('update', [CartController::class, 'update']);
	Route::post('remove', [CartController::class, 'remove']);
	Route::post('clear', [CartController::class, 'clear']);
});
