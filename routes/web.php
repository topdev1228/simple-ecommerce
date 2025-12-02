// Sanctum CSRF cookie endpoint for SPA
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Sanctum SPA Auth: Login
Route::middleware(['web', 'guest'])->post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);
    if (Auth::attempt($request->only('email', 'password'))) {
        $request->session()->regenerate();
        return response()->json(['message' => 'Login successful']);
    }
    return response()->json(['message' => 'Invalid credentials'], 401);
});

// Sanctum SPA Auth: Logout
Route::middleware(['web', 'auth:sanctum'])->post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Logged out']);
});
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Sanctum SPA Auth: Login
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);
    if (Auth::attempt($request->only('email', 'password'))) {
        $request->session()->regenerate();
        return response()->json(['message' => 'Login successful']);
    }
    return response()->json(['message' => 'Invalid credentials'], 401);
});

// Sanctum SPA Auth: Logout
Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Logged out']);
});
