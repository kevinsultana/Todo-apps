import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TaskCard() {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div className="bg-orange-200 p-2 rounded-xl mb-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" style={{ fontSize: "20px" }} />
        <h1
          onClick={() => setShowDesc(!showDesc)}
          className="text-lg w-full font-bold"
        >
          Learn Javascript
        </h1>
        <div className="flex">
          <button onClick={() => setShowDesc(!showDesc)}>
            {showDesc ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      {showDesc && (
        <>
          <p className="text-sm ml-6 mt-2">Description of the task</p>
          <div className="flex justify-end gap-4">
            <button className="text-xl p-1 bg-teal-400 rounded-md">
              <MdEdit />
            </button>
            <button className="text-xl p-1 bg-red-600 rounded-md">
              <MdDelete />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
