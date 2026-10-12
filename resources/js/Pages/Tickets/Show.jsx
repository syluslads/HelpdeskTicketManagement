import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show({ auth, ticket }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this ticket?")) {
            destroy(route("tickets.destroy", ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ticket Details #{ticket.id}
                </h2>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {ticket.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Category:{" "}
                                <span className="font-medium text-gray-700">
                                    {ticket.category}
                                </span>
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                {ticket.priority}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                                {ticket.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                            Description
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {ticket.description}
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 space-y-1">
                        <p>
                            Created at:{" "}
                            {new Date(ticket.created_at).toLocaleString()}
                        </p>
                        <p>
                            Last updated:{" "}
                            {new Date(ticket.updated_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex justify-between items-center border-t pt-4">
                        <Link
                            href={route("tickets.index")}
                            className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                        >
                            &larr; Back to Tickets
                        </Link>

                        <div className="space-x-4">
                            <Link
                                href={route("tickets.edit", ticket.id)}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md shadow transition text-sm"
                            >
                                Edit Ticket
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={processing}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow transition text-sm disabled:opacity-50"
                            >
                                Delete Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
