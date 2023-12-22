"use client";

import React, { ReactNode, useState, Dispatch, SetStateAction } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute w-screen h-screen inset-0 backdrop-blur-sm z-30 border rounded shadow-lg   ">
      <div className="absolute p-4 bg-white rounded-lg h-fit inset-0 w-1/2 left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2">
        <span
          className="bg-gray-100 border p-2 cursor-pointer"
          onClick={() => onClose(!open)}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};
