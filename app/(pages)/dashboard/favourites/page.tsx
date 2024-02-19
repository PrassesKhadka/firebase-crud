"use client";

import ReactTable from "@/app/components/Table/Table";
import { columns } from "@/app/components/Table/columns";
import { useFetchFavouriteStudentDataQuery } from "@/app/redux/features/firestore/firestoreAPI";
import React from "react";

const Favourites = () => {
  const { data, isSuccess, isError, isFetching } =
    useFetchFavouriteStudentDataQuery("");
  return (
    <>
      {isSuccess ? (
        <ReactTable data={data} columns={columns} />
      ) : isError ? (
        "Error"
      ) : null}
    </>
  );
};

export default Favourites;
