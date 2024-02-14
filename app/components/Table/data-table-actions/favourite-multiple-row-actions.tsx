import React from "react";
import { HeartIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import { IuserDocument } from "@/app/interfaces";

interface IfavouriteRowMultipleActionProps {
  table: Table<IuserDocument>;
}
const FavouriteRowMultipleAction = ({
  table,
}: IfavouriteRowMultipleActionProps) => {
  return (
    <>
      <HeartIcon className="text-3xl " />
    </>
  );
};

export default FavouriteRowMultipleAction;
