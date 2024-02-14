import React, { useEffect, useState } from "react";
import { IuserDocument } from "@/app/interfaces";
import { type Getter, type Row, type Table } from "@tanstack/react-table";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import {
  useAddToFavouriteMutation,
  useDeleteFromFavouriteMutation,
} from "@/app/redux/features/firestore/firestoreAPI";
import Spinner from "../../Spinner";

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
  const { id, favourite } = row.original;
  const [isFavourite, setIsFavourite] = useState<boolean>(
    favourite === "true" ? true : false
  );
  const [
    addToFavourite,
    {
      isLoading: isLoadingAddToFavourite,
      isError: isErrorAddToFavourite,
      isSuccess: isSuccessAddToFavourite,
    },
  ] = useAddToFavouriteMutation();
  const [
    deleteFromFavourite,
    {
      isLoading: isLoadingDeleteFromFavourite,
      isError: isErrorDeleteFromFavourite,
      isSuccess: isSuccessDeleteFromFavourite,
    },
  ] = useDeleteFromFavouriteMutation();

  // For toast to appear
  // useEffect(() => {}, [isErrorAddToFavourite, isErrorDeleteFromFavourite]);

  const handleOnClick = async () => {
    if (!isFavourite) {
      await addToFavourite({ ids: [id] });
    } else {
      await deleteFromFavourite({ ids: [id] });
    }
    // if the operation is complete then ;
    if (!isErrorAddToFavourite || !isErrorDeleteFromFavourite) {
      setIsFavourite((prev) => (prev = !prev));
    }
  };

  return (
    <>
      <button
        onClick={handleOnClick}
        disabled={isLoadingAddToFavourite || isLoadingDeleteFromFavourite}
      >
        {isLoadingAddToFavourite || isLoadingDeleteFromFavourite ? (
          "Loading..."
        ) : isFavourite ? (
          <HeartFilledIcon className="text-3xl text-red-500 " />
        ) : (
          <HeartIcon className="text-3xl" />
        )}
      </button>
    </>
  );
};

export default FavouriteRowAction;
