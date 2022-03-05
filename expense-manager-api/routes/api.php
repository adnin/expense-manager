<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
// for testing only Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function(Request $request) {
        $response = [
            'user' => auth()->user(),
            'roles' => auth()->user()->roles
        ];

        return response($response, 201);
    });
    // Expenses routes to controller
    Route::resources([
        'expenses' => ExpenseController::class
    ]);
});

// Protected routes with role permission
Route::group(['middleware' => ['role:admin', 'auth:sanctum']], function () {
    // Route resources
    Route::resources([
        'users' => UserController::class,
        'roles' => RoleController::class
    ]);
    Route::resource('categories', CategoryController::class)->except(['index']);
});
