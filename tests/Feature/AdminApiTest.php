<?php

use App\Models\User;

it('admin can list products', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    \App\Models\Product::factory()->count(2)->create();
    $response = $this->getJson('/api/admin/products');
    $response->assertSuccessful()->assertJsonCount(2);
});

it('admin can create a product', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $data = [
        'title' => 'Admin Product',
        'description' => 'Admin Description',
        'price' => 49.99,
        'image_url' => 'https://example.com/image.jpg',
    ];
    $response = $this->postJson('/api/admin/products', $data);
    $response->assertCreated()->assertJsonPath('title', 'Admin Product');
});

it('admin can update a product', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $product = \App\Models\Product::factory()->create();
    $response = $this->putJson("/api/admin/products/{$product->id}", [
        'title' => 'Admin Updated'
    ]);
    $response->assertSuccessful()->assertJsonPath('title', 'Admin Updated');
});

it('admin can delete a product', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $product = \App\Models\Product::factory()->create();
    $response = $this->deleteJson("/api/admin/products/{$product->id}");
    $response->assertSuccessful()->assertJsonPath('message', 'Product deleted');
});
