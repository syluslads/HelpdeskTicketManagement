<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('tickets.index');
});

// Remove 'auth' and 'verified' middleware here for open testing
Route::group([], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('tickets', TicketController::class);
});

require __DIR__.'/auth.php';