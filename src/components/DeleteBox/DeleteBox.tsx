import { Button } from "@components/ui";
import React from "react";

export const DeleteBox = ({
  onClick,
  title,
  loading,
}: {
  onClick: () => void;
  title: string | undefined;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col items-center">
      <strong className="my-40 ">
        {title} silinmek üzere onaylıyor musunuz?
      </strong>
      <strong></strong>
      <Button isLoading={loading} onClick={() => onClick()} variant="outline">
        Onayla
      </Button>
    </div>
  );
};
