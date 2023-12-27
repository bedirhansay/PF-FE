"use client";

import React, { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Button } from "../Button";

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
    <div className="fixed inset-0 overflow-scroll backdrop-blur-sm z-30 border rounded shadow-lg   ">
      <div className="absolute  right-20 left-20 top-20  bg-white rounded-lg ">
        <Button
          variant="close"
          className="bg-darkBlue text-white text-3xl  border-3  p-2 cursor-pointer"
          onClick={() => onClose(!open)}
        >
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};
