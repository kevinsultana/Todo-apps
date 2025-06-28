import React, { useState } from "react";
import { MdClose } from "react-icons/md";

export default function EditTaskModal({ onEdit, isOpen, onCloseModal, task }) {
  const [title, setTitle] = useState(`${task.title}`);
  const [description, setDescription] = useState(`${task.description}`);

  const handleSave = (title, description, id) => {
    // console.log(title, description, id);
    onEdit(title, description, id);
    // setTitle("");
    // setDescription("");
    onCloseModal();
  };

  // console.log(task);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between">
              <h2 className="text-xl mb-4">Edit your Task</h2>
              <MdClose
                onClick={onCloseModal}
                className="text-2xl cursor-pointer"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block">Title</label>
                <input
                  type="text"
                  value={title}
                  placeholder="Title..."
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>

              <div>
                <label className="block">Description</label>
                <input
                  type="text"
                  value={description}
                  placeholder="Description..."
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>

              <div className="flex justify-center items-center">
                <button
                  onClick={() =>
                    handleSave({ title, description, id: task.id })
                  }
                  className="mt-2 w-1/2 bg-teal-500 text-white py-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
