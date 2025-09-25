import React, { useRef, useEffect } from "react";

const Modal = ({ closeModal, children, title }) => {
  const modalRef = useRef();
  

  // Close when clicking outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed  inset-0  flex items-center justify-center z-50">

      <div
        ref={modalRef}
        className=" rounded-lg bg-white shadow-lg w-11/12 md:w-1/3 p-6 relative"
      >
        {/* ❌ Big Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-3xl font-bold text-gray-500 hover:text-red-600 transition"
        >
          &times;
        </button>

        {/* Title (optional) */}
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

        {/* Render passed content */}
        <div >{children}</div>
      </div>
    </div>
  );
};

export default Modal;
