"use client";

import React, { useState } from "react";

export interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role?: string;
}

interface AdminUsersManagerProps {
  users: UserItem[];
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onDeleteUser: (id: string) => void;
}

export default function AdminUsersManager({
  users,
  onToggleStatus,
  onDeleteUser,
}: AdminUsersManagerProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-[20px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-[22px] font-semibold text-[#333333]">User Management</h2>
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-[12px] border border-[#DDD] bg-white text-[14px] text-[#333] outline-none w-full sm:w-[280px]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E0E0E0] text-[13px] font-medium text-[#777777]">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEFEF] text-[14px] text-[#333333]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-[#777]">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#F0F2F5]">
                  <td className="py-3 px-4 font-medium">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="py-3 px-4 text-[#555]">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${
                        u.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => onToggleStatus(u.id, u.isActive)}
                      className={`px-3 py-1 rounded-[8px] text-[12px] text-white ${
                        u.isActive
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => onDeleteUser(u.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-[8px] text-[12px] hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
