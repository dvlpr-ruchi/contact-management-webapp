import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../network/api";
import { toast } from "react-toastify";
import {
  Trash2,
  Plus,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
} from "lucide-react";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    contactId: null,
    contactName: "",
  });
  const navigate = useNavigate();

  // 🔹 Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts/all");
      console.log(res.data.data);
      setContacts(res.data.data);
    } catch (error) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Open delete confirmation modal
  const openDeleteModal = (id, name) => {
    setDeleteModal({ show: true, contactId: id, contactName: name });
  };

  // 🔹 Close delete modal
  const closeDeleteModal = () => {
    setDeleteModal({ show: false, contactId: null, contactName: "" });
  };

  // 🔹 Confirm and delete contact
  const confirmDelete = async () => {
    try {
      await api.delete(`/contacts/delete/${deleteModal.contactId}`);
      toast.success("Contact deleted successfully");

      // Optimistic UI update
      setContacts((prev) =>
        prev.filter((c) => c._id !== deleteModal.contactId)
      );
      closeDeleteModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete contact");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading contacts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Contact Management
            </h1>
            <p className="text-gray-600">
              Manage and view all contact inquiries
            </p>
          </div>

          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
          >
            <Plus size={20} />
            Add New Contact
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total Contacts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.length}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {contacts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No contacts yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first contact.
              </p>
              <button
                onClick={() => navigate("/create")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Add Contact
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="shrink-0 h-10 w-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="font-medium text-gray-900">
                              {contact.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            {contact.email ? (
                              <>
                                <Mail size={16} className="text-gray-400" />
                                {contact.email}
                              </>
                            ) : (
                              <span className="text-gray-400 italic">
                                No email
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <Phone size={16} className="text-gray-400" />
                            {contact.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="flex items-start gap-2">
                            <MessageSquare
                              size={16}
                              className="text-gray-400 shrink-0 mt-0.5"
                            />
                            <span className="text-sm text-gray-600 truncate">
                              {contact.message || (
                                <span className="text-gray-400 italic">
                                  No message
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={16} className="text-gray-400" />
                            {new Date(contact.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() =>
                              openDeleteModal(contact._id, contact.name)
                            }
                            className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 hover:text-red-700 focus:ring-2 focus:ring-red-200 transition-all duration-150 font-medium"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="p-6 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="shrink-0 h-12 w-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {contact.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          {new Date(contact.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {contact.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail
                            size={18}
                            className="text-gray-400 shrink-0"
                          />
                          <span className="text-gray-700 break-all">
                            {contact.email}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Phone
                          size={18}
                          className="text-gray-400 shrink-0"
                        />
                        <span className="text-gray-700">{contact.phone}</span>
                      </div>

                      {contact.message && (
                        <div className="flex items-start gap-2 text-sm pt-2 border-t border-gray-100">
                          <MessageSquare
                            size={18}
                            className="text-gray-400 shrink-0 mt-0.5"
                          />
                          <p className="text-gray-600 leading-relaxed">
                            {contact.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => openDeleteModal(contact._id, contact.name)}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-150 font-medium"
                    >
                      <Trash2 size={18} />
                      Delete Contact
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={closeDeleteModal}
          ></div>

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-7 w-7 text-red-600" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Contact
                </h3>
                <p className="text-gray-600 mb-2">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {deleteModal.contactName}
                  </span>
                  ?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone and will permanently remove this
                  contact from your list.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-150 shadow-lg shadow-red-500/30"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
