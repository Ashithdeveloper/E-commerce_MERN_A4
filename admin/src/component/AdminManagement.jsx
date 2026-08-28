import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../config";
import { toast } from "react-toastify";
import Loading from "./Loading";
import {
  FaUserShield,
  FaUserTie,
  FaPlus,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaBoxOpen,
  FaListUl,
  FaTruck,
  FaSearch,
} from "react-icons/fa";

const AdminManagement = ({ token }) => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const initialFormState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "manager",
    permissions: {
      addProduct: false,
      listProducts: false,
      orderManagement: false,
    },
    isActive: true,
  };
  const [formData, setFormData] = useState(initialFormState);

  const getActiveToken = () => token || localStorage.getItem("token") || "";

  const fetchStaff = async () => {
    const activeToken = getActiveToken();
    if (!activeToken) return;

    try {
      setLoading(true);
      const res = await axios.get(`${backendurl}/api/auth/staff`, {
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      if (res.data.success) {
        setStaffList(res.data.staff || []);
      }
    } catch (error) {
      console.error("fetchStaff error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch staff members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [token]);

  const handleOpenAddModal = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (staff) => {
    setSelectedStaff(staff);
    setFormData({
      fullname: staff.fullname,
      username: staff.username,
      email: staff.email,
      password: "",
      role: staff.role,
      permissions: {
        addProduct: !!staff.permissions?.addProduct,
        listProducts: !!staff.permissions?.listProducts,
        orderManagement: !!staff.permissions?.orderManagement,
      },
      isActive: staff.isActive,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (staff) => {
    setSelectedStaff(staff);
    setIsDeleteModalOpen(true);
  };

  const handlePermissionChange = (permKey) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions[permKey],
      },
    }));
  };

  const applyPermissionPreset = (preset) => {
    if (preset === "all") {
      setFormData((prev) => ({
        ...prev,
        permissions: { addProduct: true, listProducts: true, orderManagement: true },
      }));
    } else if (preset === "products") {
      setFormData((prev) => ({
        ...prev,
        permissions: { addProduct: true, listProducts: true, orderManagement: false },
      }));
    } else if (preset === "orders") {
      setFormData((prev) => ({
        ...prev,
        permissions: { addProduct: false, listProducts: false, orderManagement: true },
      }));
    } else if (preset === "none") {
      setFormData((prev) => ({
        ...prev,
        permissions: { addProduct: false, listProducts: false, orderManagement: false },
      }));
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    const activeToken = getActiveToken();
    if (!formData.username || !formData.fullname || !formData.email || !formData.password) {
      return toast.error("Please fill all required fields");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setActionLoading(true);
      const res = await axios.post(`${backendurl}/api/auth/staff`, formData, {
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsAddModalOpen(false);
        fetchStaff();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create staff member");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    if (!selectedStaff) return;
    const activeToken = getActiveToken();

    try {
      setActionLoading(true);
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        role: formData.role,
        permissions: formData.permissions,
        isActive: formData.isActive,
      };
      if (formData.password.trim().length > 0) {
        if (formData.password.length < 6) {
          setActionLoading(false);
          return toast.error("Password must be at least 6 characters");
        }
        payload.password = formData.password;
      }

      const res = await axios.put(
        `${backendurl}/api/auth/staff/${selectedStaff._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${activeToken}` },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsEditModalOpen(false);
        fetchStaff();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update staff member");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;
    const activeToken = getActiveToken();
    try {
      setActionLoading(true);
      const res = await axios.delete(
        `${backendurl}/api/auth/staff/${selectedStaff._id}`,
        {
          headers: { Authorization: `Bearer ${activeToken}` },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsDeleteModalOpen(false);
        fetchStaff();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete staff member");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" ? true : staff.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const totalAdmins = staffList.filter((s) => s.role === "admin").length;
  const totalManagers = staffList.filter((s) => s.role === "manager").length;
  const activeCount = staffList.filter((s) => s.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserShield className="text-black" /> Staff & Permission Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create Managers and Admins, assign granular permissions, and manage access roles.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer shadow-xs"
        >
          <FaPlus /> Add New Staff
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Staff</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{staffList.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admins</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{totalAdmins}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Managers</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalManagers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Staff</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, username, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-medium text-gray-600">Filter Role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white outline-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>

      {/* Staff Table / Cards */}
      {loading ? (
        <Loading />
      ) : filteredStaff.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
          <FaUserTie className="mx-auto text-4xl text-gray-300 mb-3" />
          <p className="text-lg font-medium text-gray-700">No staff members found</p>
          <p className="text-sm text-gray-500 mt-1">
            {searchTerm ? "Try adjusting your search criteria" : "Click 'Add New Staff' to create a Manager or Admin"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Assigned Permissions</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredStaff.map((staff) => (
                  <tr key={staff._id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{staff.fullname}</div>
                        <div className="text-xs text-gray-500">@{staff.username} • {staff.email}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          staff.role === "admin"
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {staff.role === "admin" ? <FaUserShield className="text-xs" /> : <FaUserTie className="text-xs" />}
                        {staff.role === "admin" ? "Admin" : "Manager"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                            staff.permissions?.addProduct
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                              : "bg-gray-100 text-gray-400 line-through"
                          }`}
                        >
                          <FaBoxOpen className="text-[10px]" /> Add Product
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                            staff.permissions?.listProducts
                              ? "bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                              : "bg-gray-100 text-gray-400 line-through"
                          }`}
                        >
                          <FaListUl className="text-[10px]" /> List Items
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                            staff.permissions?.orderManagement
                              ? "bg-purple-50 text-purple-700 border border-purple-200 font-medium"
                              : "bg-gray-100 text-gray-400 line-through"
                          }`}
                        >
                          <FaTruck className="text-[10px]" /> Orders
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          staff.isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {staff.isActive ? (
                          <>
                            <FaCheck className="text-[10px]" /> Active
                          </>
                        ) : (
                          <>
                            <FaTimes className="text-[10px]" /> Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(staff)}
                          className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md transition cursor-pointer"
                          title="Edit staff member"
                        >
                          <FaEdit className="text-base" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(staff)}
                          className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md transition cursor-pointer"
                          title="Delete staff member"
                        >
                          <FaTrash className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaUserPlus className="text-black" /> Create Staff Member
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. jdoe_mgr"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black bg-white"
                  >
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jdoe@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password * (Min 6 chars)</label>
                <input
                  type="password"
                  required
                  placeholder="Enter initial password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>

              {/* Permissions Section */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Permissions & Access
                  </label>
                  <div className="flex gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => applyPermissionPreset("all")}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => applyPermissionPreset("products")}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      Products
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => applyPermissionPreset("orders")}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      Orders
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.addProduct}
                      onChange={() => handlePermissionChange("addProduct")}
                      className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Add Product</span>
                      <span className="text-[11px] text-gray-500">Can create new products and update existing ones</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.listProducts}
                      onChange={() => handlePermissionChange("listProducts")}
                      className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">List Items Management</span>
                      <span className="text-[11px] text-gray-500">Can view product inventory and delete listings</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.orderManagement}
                      onChange={() => handlePermissionChange("orderManagement")}
                      className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Order Management</span>
                      <span className="text-[11px] text-gray-500">Can view all orders and update dispatch/delivery status</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-lg cursor-pointer font-medium disabled:opacity-50"
                >
                  {actionLoading ? "Creating..." : "Create Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {isEditModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaEdit className="text-black" /> Edit Staff: @{selectedStaff.username}
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateStaff} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black bg-white"
                  >
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Account Status</label>
                  <select
                    value={formData.isActive ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black bg-white"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive / Deactivated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Reset Password (Leave blank to keep unchanged)
                </label>
                <input
                  type="password"
                  placeholder="New password (optional)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>

              {/* Permissions Section */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Permissions & Access
                  </label>
                  <div className="flex gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => applyPermissionPreset("all")}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => applyPermissionPreset("products")}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      Products
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => applyPermissionPreset("orders")}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer"
                    >
                      Orders
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.addProduct}
                      onChange={() => handlePermissionChange("addProduct")}
                      className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Add Product</span>
                      <span className="text-[11px] text-gray-500">Can create new products and update existing ones</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.listProducts}
                      onChange={() => handlePermissionChange("listProducts")}
                      className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">List Items Management</span>
                      <span className="text-[11px] text-gray-500">Can view product inventory and delete listings</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.orderManagement}
                      onChange={() => handlePermissionChange("orderManagement")}
                      className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Order Management</span>
                      <span className="text-[11px] text-gray-500">Can view all orders and update dispatch/delivery status</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-lg cursor-pointer font-medium disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Delete Staff Member</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete staff account{" "}
              <strong className="text-gray-900">@{selectedStaff.username}</strong> ({selectedStaff.fullname})? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStaff}
                disabled={actionLoading}
                className="px-4 py-2 text-sm text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer font-medium disabled:opacity-50"
              >
                {actionLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
