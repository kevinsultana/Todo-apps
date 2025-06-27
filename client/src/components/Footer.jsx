import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Footer() {
  return (
    <div className="bg-teal-100 dark:bg-teal-700 transition-all duration-300">
      <div>
        <div className="flex items-center justify-center py-2 gap-4">
          <FaLinkedinIn className="text-lg dark:text-white" />
          <FaGithub className="text-lg dark:text-white" />
          <CgWebsite className="text-lg dark:text-white" />
        </div>
        <div>
          <p className="text-center text-sm dark:text-white">
            &copy; 2023 Tasktify. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
