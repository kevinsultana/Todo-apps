import React from "react";

export default function DeleteTaskModal({
  onClickCancel,
  onClickDelete,
  item,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h1>Are you sure you want to delete this task</h1>
        <div className="px-4 p-2 py-6">
          <h2 className="font-bold">Title : {item.title}</h2>
          <h2>Desc : {item.description}</h2>
        </div>
        <div className="grid grid-cols-2 mt-6 gap-4">
          <button
            onClick={onClickCancel}
            className="bg-teal-400 p-2 rounded-xl text-black dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onClickDelete}
            className="bg-red-400 p-2 rounded-xl text-black dark:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
