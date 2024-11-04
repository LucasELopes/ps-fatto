<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ToDoController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/toDos', ToDoController::class);
Route::get('/deadline', [ToDoController::class, 'deadline']);
Route::get('/costsToDos', [ToDoController::class, 'costsToDos']);
Route::get('/getOnTime', [ToDoController::class, 'getOnTime']);
Route::get('/getOverdue', [ToDoController::class, 'getOverdue']);
Route::get('/getNearDeadLine', [ToDoController::class, 'getNearDeadLine']);


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
