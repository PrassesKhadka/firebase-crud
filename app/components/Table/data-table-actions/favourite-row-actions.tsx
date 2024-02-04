import React, { useState } from "react";
import { IuserDocument } from "@/app/interfaces";
import { type Getter, type Row, type Table } from "@tanstack/react-table";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import {
  useAddToFavouriteMutation,
  useDeleteFromFavouriteMutation,
} from "@/app/redux/features/firestore/firestoreAPI";

interface IFavouriteRowActionProps {
  row: Row<IuserDocument>;
  table: Table<IuserDocument>;
  getValue: Getter<IuserDocument>;
}

const FavouriteRowAction = ({
  row,
  table,
  getValue,
}: IFavouriteRowActionProps) => {
  const { id, data } = row.original;
  const [isFavourite, setIsFavourite] = useState<boolean>(
    data.favourite ?? false
  );
  const [addToFavourite] = useAddToFavouriteMutation();
  const [deleteFromFavourite] = useDeleteFromFavouriteMutation();

  const handleOnClick = async () => {
    await addToFavourite({ ids: [id] });
    // if the operation is complete then ;
    setIsFavourite((prev) => (prev = !prev));
  };

  return (
    <>
      <div onClick={handleOnClick}>
        {isFavourite ? (
          <HeartFilledIcon className="text-2xl" />
        ) : (
          <HeartIcon className="text-2xl" />
        )}
      </div>
    </>
  );
};

export default FavouriteRowAction;
