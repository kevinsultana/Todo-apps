import React from "react";
import { ClipLoader } from "react-spinners";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 flex flex-col gap-4 items-center justify-center rounded-lg shadow-lg w-1/2 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <ClipLoader color="#36d7b7" />
        <h1>Loading...</h1>
      </div>
    </div>
  );
}
