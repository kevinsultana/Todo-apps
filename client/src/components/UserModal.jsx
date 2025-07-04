import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import DeleteUserModal from "./DeleteUserModal";

export default function UserModal({
  onClose,
  isOpen,
  onCloseModal,
  userData,
  onSaveEditUser,
  onDeleteUser,
}) {
  const [editName, setEditName] = useState(`${userData?.userName}`);
  const [editPassword, setEditPassword] = useState(`${userData?.password}`);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEditUser = () => {
    onSaveEditUser(editName, editPassword, userData?.id);
    setIsEditing(false);
    setShowPassword(false);
  };

  const handleDeleteUser = () => {
    onDeleteUser(userData);
    setShowConfirm(false);
    setIsEditing(false);
    setShowPassword(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 lg:w-1/4">
            <div className="flex justify-between">
              <h2 className="text-xl mb-4">User Menu</h2>
              <MdClose
                onClick={onCloseModal}
                className="text-2xl cursor-pointer"
              />
            </div>
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block">Edit Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block">Edit Password</label>
                    <div className="flex p-2 border rounded-md text-black ">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className="w-full outline-none"
                      />
                      <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-6 justify-between">
                    <button
                      onClick={handleSaveEditUser}
                      className="mt-2 w-1/2 bg-blue-500 text-white py-2 rounded"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="mt-2 w-1/2 bg-gray-300 text-black py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex flex-col space-y-4 mb-4">
                    <span>Name: {editName || "Your Name"}</span>
                    <span>
                      Password: {editPassword ? "••••••" : "No Password Set"}
                    </span>
                  </div>
                  <div className="flex gap-6 justify-between">
                    <button
                      onClick={handleEditToggle}
                      className="mt-2 w-1/2 bg-blue-500 text-white py-2 rounded self-center"
                    >
                      Edit User
                    </button>
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="mt-2 w-1/2 bg-red-500 text-white py-2 rounded self-center"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-center items-center">
                <button
                  onClick={onClose}
                  className=" w-1/2 bg-red-500 text-white py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <DeleteUserModal
          onClickCancel={() => setShowConfirm(false)}
          onClickDelete={handleDeleteUser}
          item={userData}
        />
      )}
    </div>
  );
}
