<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\AdminController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('cart', CartController::class);
    Route::apiResource('admin/products', AdminController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::apiResource('products', ProductController::class)->only(['index', 'show']);
