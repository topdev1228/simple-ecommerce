<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $products = Product::all();
        return response($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): Response
    {
        $product = Product::create($request->validated());
        return response($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $product = Product::findOrFail($id);
        return response($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id): Response
    {
        $product = Product::findOrFail($id);
        $product->update($request->validated());
        return response($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response(null, 204);
    }
}
