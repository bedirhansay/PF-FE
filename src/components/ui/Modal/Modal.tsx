"use client";

import React, { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Button } from "../Button";
import style from "./Modal.module.scss";

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
    <div className={style["modal-overlay"]}>
      <div className={style["modal"]}>
        <Button variant="close" onClick={() => onClose(!open)}>
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};
