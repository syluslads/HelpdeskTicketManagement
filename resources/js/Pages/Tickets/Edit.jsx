import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, ticket }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title || "",
        description: ticket.description || "",
        priority: ticket.priority || "Medium",
        status: ticket.status || "Open",
        category: ticket.category || "Hardware",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("tickets.update", ticket.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Ticket #{ticket.id}
                </h2>
            }
        >
            <Head title={`Edit Ticket #${ticket.id}`} />

            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.title && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.description && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Priority
                            </label>
                            <select
                                value={data.priority}
                                onChange={(e) =>
                                    setData("priority", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            {errors.priority && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.priority}
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                            {errors.status && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.status}
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                                <option value="Account">Account</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.category}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-4">
                            <Link
                                href={route("tickets.index")}
                                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow transition disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update Ticket"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
