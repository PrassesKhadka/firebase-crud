import { IuserDocument } from "@/app/interfaces";
import { Row } from "@tanstack/react-table";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

import React from "react";

interface IFavouriteRowActionProps {
  row: Row<IuserDocument>;
}

const FavouriteRowAction = ({ row }: IFavouriteRowActionProps) => {
  return (
    <>
      <div>
        <HeartIcon className="text-2xl" />
      </div>
    </>
  );
};

export default FavouriteRowAction;
