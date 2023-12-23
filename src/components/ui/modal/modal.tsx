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
    <div className="fixed overflow-y-scroll inset-0 backdrop-blur-sm z-30 border rounded shadow-lg   ">
      <div className="absolute top-4 left-2 right-2 p-4 bg-white rounded-lg h-fit inset-0 sm:w-1/2 sm:left-1/2 sm:top-[40%] transform sm:-translate-x-1/2 sm:-translate-y-1/2">
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
