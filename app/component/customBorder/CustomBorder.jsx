import React from "react";

const CustomBorder = () => {
  return (
    <div className="flex items-center gap-1.5 mt-2 mb-6">
      <div className="w-2.5 h-[5px] rounded-full bg-gradient-to-r from-[#4ade80] to-[#2dd4bf]"></div>
      <div className="w-14 h-[5px] rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#4ade80]"></div>
    </div>
  );
};

export default CustomBorder;
