import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Footer() {
  return (
    <div className="bg-teal-100 dark:bg-teal-700 transition-all duration-300">
      <div className="space-y-1 py-1">
        <div className="flex items-center justify-center gap-4">
          <FaLinkedinIn className="text-lg lg:text-2xl dark:text-white" />
          <FaGithub className="text-lg lg:text-2xl dark:text-white" />
          <CgWebsite className="text-lg lg:text-2xl dark:text-white" />
        </div>
        <div>
          <p className="text-center text-sm lg:text-base dark:text-white">
            &copy; 2023 Tasktify. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
