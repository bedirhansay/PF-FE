import React from "react";

import classes from "./checkboxInput.module.scss";

interface CheckboxProps {
  label: string;
  value?: string;
  isSelected?: boolean;
  onClickHandler: (value: string) => void;
}

export const CheckboxInput: React.FC<CheckboxProps> = ({
  label,
  value,
  isSelected,
  onClickHandler,
  ...props
}) => {
  return (
    <div className={classes.checkboxWrapper}>
      <input
        type="checkbox"
        value={value}
        checked={isSelected}
        onChange={(e) => onClickHandler(e.target.value)}
        {...props}
      />
      <label>{label}</label>
    </div>
  );
};
