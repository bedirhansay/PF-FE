import React from "react";

interface ErrorMessageProps {
  message: string | undefined;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? (
    <small className="bg-red-300 font-bold px-4 py-1 mt-20 rounded">
      {message}
    </small>
  ) : null;
};
