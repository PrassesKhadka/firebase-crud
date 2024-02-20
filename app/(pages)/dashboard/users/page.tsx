"use client";

import React from "react";
import {
  useFetchDataFromFirebaseQuery,
  useFetchNextLimitedDataFromFirebaseQuery,
} from "@/app/redux/features/firestore/firestoreAPI";
import ReactTable from "@/app/reusableComponents/Table/Table";
import { columns } from "@/app/reusableComponents/Table/columns";

export default async function Dashboard() {
  const { data, isError, isLoading, isSuccess } =
    useFetchNextLimitedDataFromFirebaseQuery({});

  return (
    <>
      {isSuccess ? (
        <ReactTable columns={columns} data={data} />
      ) : isError ? (
        <div>Error occured</div>
      ) : null}
    </>
  );
}
