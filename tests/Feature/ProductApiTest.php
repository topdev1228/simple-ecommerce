<?php

it('can list products', function () {
    \App\Models\Product::factory()->count(3)->create();
    $response = $this->getJson('/api/products');
    $response->assertSuccessful()->assertJsonCount(3);
});

it('can show a product', function () {
    $product = \App\Models\Product::factory()->create();
    $response = $this->getJson("/api/products/{$product->id}");
    $response->assertSuccessful()->assertJsonPath('id', $product->id);
});

it('can create a product', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);
    $data = [
        'title' => 'Test Product',
        'description' => 'Test Description',
        'price' => 99.99,
        'image_url' => 'https://example.com/image.jpg',
    ];
    $response = $this->postJson('/api/admin/products', $data);
    $response->assertCreated()->assertJsonPath('title', 'Test Product');
});

it('can update a product', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);
    $product = \App\Models\Product::factory()->create();
    $response = $this->putJson("/api/admin/products/{$product->id}", [
        'title' => 'Updated Title'
    ]);
    $response->assertSuccessful()->assertJsonPath('title', 'Updated Title');
});

it('can delete a product', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);
    $product = \App\Models\Product::factory()->create();
    $response = $this->deleteJson("/api/admin/products/{$product->id}");
    $response->assertSuccessful()->assertJsonPath('message', 'Product deleted');
});
