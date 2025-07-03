import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

export default function EditTaskModal({ onEdit, onCloseModal, task }) {
  const [title, setTitle] = useState(`${task.title}`);
  const [description, setDescription] = useState(`${task.description}`);
  const [dueDate, setDueDate] = useState(`${task.dueDate}`);

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSave = () => {
    if (title.trim().length < 3) {
      toast.error("Title Minimum 3 Character.");
      return;
    }
    if (description.trim().length < 25) {
      toast.error("Description Minimum 25 Character.");
      return;
    }
    if (dueDate < getTodayString()) {
      toast.error("Date must be greater than today.");
      return;
    }
    onEdit(title, description, task.id, dueDate);
    onCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl mb-4">Edit your Task</h2>
          <MdClose onClick={onCloseModal} className="text-2xl cursor-pointer" />
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
            <div className={`mt-1 flex justify-end`}>
              <p
                className={`text-xs ${
                  title.trim().length < 3 ? "text-red-500" : "text-black"
                }`}
              >
                {title.trim().length}
                <span className=" text-black">/50</span>
              </p>
            </div>
          </div>

          <div>
            <label className="block">Description</label>
            <textarea
              rows="3"
              value={description}
              placeholder="Description..."
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
            />
            <div className={`mt-1 flex justify-end`}>
              <p
                className={`text-xs ${
                  description.trim().length < 25 ? "text-red-500" : "text-black"
                }`}
              >
                {description.trim().length}
                <span className=" text-black">/50</span>
              </p>
            </div>
          </div>

          <div>
            <label className="block">Due Date</label>
            <input
              type="date"
              value={dueDate}
              placeholder="Description..."
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() =>
                handleSave({ title, description, id: task.id, dueDate })
              }
              className="mt-2 w-1/2 bg-teal-500 text-white py-2 rounded cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
