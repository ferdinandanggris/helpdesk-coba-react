<?php

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login',LoginController::class)->name('login');
Route::post('/logout',LogoutController::class)->name('logout');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();    
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users/store', [UserController::class, 'store']);
Route::get('/users/show/{id}', [UserController::class, 'show']);
Route::patch('/users/update/{id}', [UserController::class, 'update']);
Route::delete('/users/destroy/{id}', [UserController::class, 'destroy']);


// Route::resource('user', )
