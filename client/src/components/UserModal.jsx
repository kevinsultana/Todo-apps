import React, { useState } from "react";
import { MdClose } from "react-icons/md";

export default function UserModal({ onClose, isOpen, onCloseModal }) {
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between">
              <h2 className="text-xl mb-4">User Menu</h2>
              <MdClose
                onClick={onCloseModal}
                className="text-2xl cursor-pointer"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block">Edit Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2 w-full"
                />
                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
                  Save Name
                </button>
              </div>

              <div>
                <label className="block">Edit Password</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="border p-2 w-full"
                />
                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
                  Save Password
                </button>
              </div>

              <div className="flex justify-center items-center">
                <button
                  onClick={onClose}
                  className="mt-2 w-1/2 bg-red-500 text-white py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
