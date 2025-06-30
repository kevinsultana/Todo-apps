import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TaskCard({
  item,
  onClickEdit,
  onClickDelete,
  onCheckBox,
}) {
  const [showDesc, setShowDesc] = useState(false);

  const handleEdit = () => {
    onClickEdit(item);
  };

  const handleDelete = () => {
    onClickDelete(item);
  };

  const checkDate = () => {
    const today = new Date();
    const dueDate = new Date(item.dueDate);

    const timeDifference = dueDate - today;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (dayDifference === 0) {
      return "bg-red-200";
    } else if (dayDifference === 1) {
      return "bg-yellow-200";
    } else if (dayDifference > 1) {
      return "bg-green-200";
    }
    return "bg-gray-200";
  };

  const backgroundColor = checkDate();

  return (
    <div
      className={`${
        item.isDone !== true ? backgroundColor : "bg-gray-300"
      } p-2 rounded-xl mb-2`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          style={{ fontSize: "20px" }}
          onChange={(e) => onCheckBox(item, e)}
          checked={item.isDone}
        />
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
          <p className="text-sm ml-6 mt-2">Deadline : {item.dueDate}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleEdit}
              className="text-xl p-1 bg-teal-400 dark:bg-teal-600 text-black dark:text-white rounded-md transition-all duration-300"
            >
              <MdEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-xl p-1 bg-red-400 dark:bg-red-600 text-black dark:text-white transition-all duration-300 rounded-md"
            >
              <MdDelete />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
