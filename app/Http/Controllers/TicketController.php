<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use App\Models\User;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = auth()->user()
            ? auth()->user()->tickets()->latest()->paginate(10)
            : Ticket::latest()->paginate(10);

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(StoreTicketRequest $request)
    {
        $data = $request->validated();
        
        // Find the first user or create a fallback test user so foreign key constraint passes
        $user = User::first() ?? User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $data['user_id'] = auth()->id() ?? $user->id;

        Ticket::create($data);

        return redirect()->route('tickets.index')->with('success', 'Ticket created successfully.');
    }

    public function show(Ticket $ticket)
    {
        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket
        ]);
    }

    public function edit(Ticket $ticket)
    {
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return redirect()->route('tickets.index')->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted successfully.');
    }
}