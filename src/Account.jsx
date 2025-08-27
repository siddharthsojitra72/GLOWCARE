import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-600">Signed in as {user.name || "Guest"} ({user.email})</p>
              </div>
              <button onClick={() => { logout(); navigate("/", { replace: true }); }} className="text-sm font-medium text-primary border border-primary px-3 py-1.5 rounded-sm hover:bg-primary/5">Log out</button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Profile</h2>
                <p className="text-sm text-gray-700">Name: {user.name || "—"}</p>
                <p className="text-sm text-gray-700">Email: {user.email}</p>
                <div className="pt-3">
                  <button onClick={() => { setName(user?.name || ""); setIsEditing(true); }} className="text-sm border border-primary text-primary px-3 py-1.5 rounded-sm hover:bg-primary/5">Edit profile</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Orders</h2>
                <p className="text-sm text-gray-600">You have no recent orders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsEditing(false)}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-lg border border-gray-200 p-5 shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Edit profile</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button onClick={() => setIsEditing(false)} className="px-3 py-2 text-sm border rounded-sm">Cancel</button>
              <button
                onClick={() => {
                  updateProfile({ name: name.trim() });
                  setIsEditing(false);
                }}
                className="px-3 py-2 text-sm bg-primary text-white rounded-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Account;


