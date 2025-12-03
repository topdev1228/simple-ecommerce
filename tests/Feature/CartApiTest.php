<?php

use App\Models\User;
use App\Models\Product;
use App\Models\Cart;

it('can list cart items', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();
    Cart::factory()->create(['user_id' => $user->id, 'product_id' => $product->id]);
    $this->actingAs($user);
    $response = $this->getJson('/api/cart');
    $response->assertSuccessful()->assertJsonCount(1);
});

it('can add item to cart', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();
    $this->actingAs($user);
    $response = $this->postJson('/api/cart', [
        'product_id' => $product->id,
        'quantity' => 2
    ]);
    $response->assertCreated()->assertJsonPath('quantity', 2);
});

it('can update cart item quantity', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id, 'product_id' => $product->id, 'quantity' => 1]);
    $this->actingAs($user);
    $response = $this->putJson("/api/cart/{$cart->id}", [
        'quantity' => 3
    ]);
    $response->assertSuccessful()->assertJsonPath('quantity', 3);
});

it('can remove item from cart', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id, 'product_id' => $product->id]);
    $this->actingAs($user);
    $response = $this->deleteJson("/api/cart/{$cart->id}");
    $response->assertSuccessful()->assertJsonPath('message', 'Cart item removed');
});
