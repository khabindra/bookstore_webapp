import React from "react";

const Button = ({ type = "button", onClick, children, color = "blue" }) => {
  const baseStyles =
    "text-white font-semibold px-4 py-2 rounded shadow hover:brightness-110 transition";

  const colorMap = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    blue: "bg-blue-600 hover:bg-blue-700",
    gray: "bg-gray-400 hover:bg-gray-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${colorMap[color] || colorMap.blue}`}
    >
      {children}
    </button>
  );
};
export default Button;
