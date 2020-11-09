import "../public/spinning.css";
import React from "react";

const Spinner = () => {
  return (
    <div className="absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center z-50">
      <div className="h-12 w-12 border-2 border-gray-300 rounded-full spinner z-50" />
    </div>
  );
};

export default Spinner;
