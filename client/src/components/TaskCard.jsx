import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { data } from "react-router";

export default function TaskCard({ item, onClickEdit, onClickDelete }) {
  const [showDesc, setShowDesc] = useState(false);
  // console.log(item.item);

  const handleEdit = () => {
    onClickEdit(item);
  };

  const handleDelete = () => {
    onClickDelete(item);
  };

  return (
    <div className="bg-orange-200 p-2 rounded-xl mb-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" style={{ fontSize: "20px" }} />
        <h1
          onClick={() => setShowDesc(!showDesc)}
          className="text-lg w-full font-bold"
        >
          {item.title}
        </h1>
        <div className="flex">
          <button onClick={() => setShowDesc(!showDesc)}>
            {showDesc ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      {showDesc && (
        <>
          <p className="text-sm ml-6 mt-2">{item.description}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleEdit}
              className="text-xl p-1 bg-teal-400 rounded-md"
            >
              <MdEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-xl p-1 bg-red-600 rounded-md"
            >
              <MdDelete />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
