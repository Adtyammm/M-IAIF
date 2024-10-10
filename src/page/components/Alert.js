import React, { useEffect } from "react";

const Alert = ({ show, handleClose, message, timeout }) => {
  useEffect(() => {
    if (show && timeout) {
      const timer = setTimeout(() => {
        handleClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [show, timeout, handleClose]);

  if (!show) return null; // Hide the modal if not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Notifikasi</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p>{message}</p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
