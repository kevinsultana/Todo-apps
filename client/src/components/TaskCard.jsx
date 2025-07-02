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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowDesc(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      return { text: "Tomorrow", color: "bg-yellow-200" };
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

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-ID", options);
  };

  return (
    <div
      className={`${
        item.isDone !== true ? backgroundColor : "bg-gray-300"
      } p-2 rounded-xl mb-2 h-full flex flex-col`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          style={{ fontSize: "20px" }}
          onChange={(e) => onCheckBox(item, e.target.checked)}
          checked={item.isDone}
        />
        {/* mobile */}
        <h1
          onClick={() => setShowDesc(!showDesc)}
          className="text-lg flex-1 w-auto font-bold lg:hidden"
        >
          {item.title}
        </h1>
        {/* desktop */}
        <h1 className="text-2xl flex-1 w-auto font-bold hidden lg:block">
          {item.title}
        </h1>
        <div className="flex gap-2 items-center">
          {item.isDone ? (
            <p className="text-sm font-semibold lg:text-base">Completed</p>
          ) : (
            <p className="text-sm font-semibold lg:text-base">
              {dayStatusText}
            </p>
          )}
          <button onClick={() => setShowDesc(!showDesc)} className="lg:hidden">
            {showDesc ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      {showDesc && (
        <div className="flex flex-col justify-between h-full">
          <div className="ml-6 my-2 max-w-4/5 lg:max-w-xs flex-1">
            <p className="text-sm lg:text-base ">{item.description}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="text-sm lg:text-base ml-6 mt-2">
              Deadline : {formatDate(item.dueDate)}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="text-xl p-1 bg-teal-400 hover:scale-110 dark:bg-teal-600 text-black dark:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                <MdEdit />
              </button>
              <button
                onClick={handleDelete}
                className="text-xl p-1 bg-red-400 hover:scale-110 dark:bg-red-600 text-black dark:text-white transition-all duration-300 cursor-pointer rounded-md"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
