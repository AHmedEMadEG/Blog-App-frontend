import React from "react";

const Toast = ({ message, type = "success" }) => {
  // Define styles based on the type of toast
  const toastStyles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div className={`toast toast-top toast-center`}>
      <div className={`alert ${toastStyles[type]} shadow-lg rounded-lg p-4`}>
        <span className="text-center">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
