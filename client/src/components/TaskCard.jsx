import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    if (item.isDone === true) {
      toast.error("Cannot edit completed task.");
    } else {
      onClickEdit(item);
    }
  };

  const handleDelete = () => {
    if (item.isDone === true) {
      toast.error("Cannot Delete completed task.");
    } else {
      onClickDelete(item);
    }
  };

  const getDayStatus = () => {
    const today = new Date();
    const dueDate = new Date(item.dueDate);

    const timeDifference = dueDate.getTime() - today.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference === 1) {
      return { text: "Tommorrow", color: "bg-yellow-200" };
    } else if (dayDifference === 0) {
      return { text: "Due Today", color: "bg-red-200" };
    } else if (dayDifference === -1) {
      return { text: "Yesterday", color: "bg-gray-400" };
    } else if (dayDifference < -1) {
      return {
        text: `${Math.abs(dayDifference)} days ago`,
        color: "bg-gray-400",
      };
    } else {
      return { text: `${dayDifference} days left`, color: "bg-green-200" };
    }
  };

  const { text: dayStatusText, color: backgroundColor } = getDayStatus();

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
          onChange={(e) => onCheckBox(item, e.target.checked)}
          checked={item.isDone}
        />
        <h1
          onClick={() => setShowDesc(!showDesc)}
          className="text-lg flex-1 w-auto font-bold"
        >
          {item.title}
        </h1>
        <div className="flex gap-2 items-center">
          {item.isDone ? (
            <p className="text-sm">Completed</p>
          ) : (
            <p className="text-sm">{dayStatusText}</p>
          )}
          <button onClick={() => setShowDesc(!showDesc)}>
            {showDesc ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      {showDesc && (
        <>
          <p className="text-sm ml-6 mt-2">{item.description}</p>
          <div className="flex justify-between gap-4">
            <p className="text-sm ml-6 mt-2">Deadline : {item.dueDate}</p>
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="text-xl p-1 bg-teal-400 dark:bg-teal-600 text-black dark:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                <MdEdit />
              </button>
              <button
                onClick={handleDelete}
                className="text-xl p-1 bg-red-400 dark:bg-red-600 text-black dark:text-white transition-all duration-300 cursor-pointer rounded-md"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
