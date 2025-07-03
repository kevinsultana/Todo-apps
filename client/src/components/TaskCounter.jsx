import React from "react";

export default function TaskCounter({ total, completed }) {
  const progress = (completed / total) * 100;

  return (
    <div className="flex w-full justify-between items-center px-10 py-1">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl text-black dark:text-white">
          Complete Task
        </h1>
        <p className="font-bold text-2xl text-black dark:text-white">
          {completed} / {total}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl text-black dark:text-white">
          {Math.floor(progress)}%
        </h1>
        <span className="text-base text-black dark:text-white">Completed</span>
      </div>
    </div>
  );
}
