import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Copy,
  Trash2,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Users,
} from "lucide-react";
import SuperAdminSidebar from "../components/SuperAdminNavbar";

const AdminManagement = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [admins, setAdmins] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const [removing, setRemoving] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const response = await fetch(`${API_URL}/super-admin/view-all-admins`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        setAdmins(data.results);
      } else {
        setError(data.error || "Failed to fetch admins");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoadingAdmins(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInviteAdmin = async () => {
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setError("");
    setSuccess("");
    setGeneratedLink("");

    try {
      const response = await fetch(`${API_URL}/super-admin/invite-admin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 200) {
        setSuccess(data.message);
        setGeneratedLink(data.signupLink);
        setFormData({ name: "", email: "" });
        // Refresh admin list
        await fetchAdmins();
      } else {
        setError(data.error || "Failed to send invitation");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError("Failed to copy link");
    }
  };

  const handleRemoveAdmin = async (adminId) => {
    setRemoving(adminId);
    setError("");

    try {
      const response = await fetch(`${API_URL}/super-admin/remove-admin/${adminId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        setSuccess("Admin removed successfully");
        await fetchAdmins();
      } else {
        setError(data.error || "Failed to remove admin");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setRemoving(null);
      setRemoveConfirm(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
    <SuperAdminSidebar />
    <div className="ml-20 lg:ml-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Users className="text-purple-600" />
            Admin Management
          </h1>
          <p className="text-gray-600">
            Invite new admins and manage existing ones
          </p>
        </motion.div>

        {/* Error/Success Messages */}
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                error
                  ? "bg-red-50 border border-red-200 text-red-700"
                  : "bg-green-50 border border-green-200 text-green-700"
              }`}
            >
              {error ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
              <span>{error || success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invite New Admin Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <UserPlus className="text-purple-600" />
            Invite New Admin
          </h2>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleInviteAdmin}
              disabled={loading || !formData.name || !formData.email}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <UserPlus size={20} />
              )}
              {loading ? "Generating..." : "Generate Invitation"}
            </motion.button>
          </div>

          {/* Generated Link */}
          <AnimatePresence>
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="text-lg font-semibold text-green-800">
                    🎉 Invitation Link Generated!
                  </h3>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border">
                  <span className="flex-1 text-sm text-gray-600 break-all">
                    {generatedLink}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      copySuccess
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                  >
                    {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                    {copySuccess ? "Copied!" : "Copy Link"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Current Admins Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
              <Users className="text-purple-600" />
              Current Admins
            </h2>
          </div>

          <div className="overflow-x-auto">
            {loadingAdmins ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading admins...</p>
              </div>
            ) : admins.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No admins found
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left p-6 font-medium text-gray-700">
                      Name
                    </th>
                    <th className="text-left p-6 font-medium text-gray-700">
                      Email
                    </th>
                    <th className="text-left p-6 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-6 font-medium text-gray-700">
                      Joined
                    </th>
                    <th className="text-center p-6 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <motion.tr
                      key={admin.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-6 font-medium text-gray-900">
                        {admin.name}
                      </td>
                      <td className="p-6 text-gray-600">{admin.email}</td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            admin.is_verified
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {admin.is_verified ? "Active" : "Pending"}
                        </span>
                      </td>
                      <td className="p-6 text-gray-600">
                        {formatDate(admin.created_at)}
                      </td>
                      <td className="p-6 text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setRemoveConfirm(admin)}
                          disabled={removing === admin.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {removing === admin.id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Remove Confirmation Modal */}
        <AnimatePresence>
          {removeConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setRemoveConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Remove Admin
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to remove{" "}
                    <strong>{removeConfirm.name}</strong>? This action cannot be
                    undone.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRemoveConfirm(null)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRemoveAdmin(removeConfirm.id)}
                      disabled={removing}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
};

export default AdminManagement;
