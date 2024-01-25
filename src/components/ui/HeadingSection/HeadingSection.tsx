import React from "react";
import { Button } from "../Button";
import { FaFileCirclePlus } from "react-icons/fa6";

export interface HeadingSectionProps {
  title: string;
  loading?: boolean;
  showButton?: boolean;
  buttonVariant?: "outline" | "save";
  onButtonClick?: () => void;
}

export const HeadingSection: React.FC<HeadingSectionProps> = ({
  title,
  loading,
  showButton = false,
  buttonVariant = "outline",
  onButtonClick,
}) => {
  return (
    <div className="bg-white my-4 py-4 rounded-md shadow-lg flex-between px-4">
      <strong>{title}</strong>
      {showButton && (
        <Button
          isLoading={loading}
          leftIcon={() => <FaFileCirclePlus color="white" fontSize={24} />}
          onClick={onButtonClick}
          variant={buttonVariant}
        ></Button>
      )}
    </div>
  );
};
