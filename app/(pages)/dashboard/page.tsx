"use client";

import React from "react";
import { useFetchNextLimitedDataFromFirebaseQuery } from "@/app/redux/features/firestore/firestoreAPI";
import ReactTable from "@/app/components/Table/Table";
import { columns } from "@/app/components/Table/columns";

export default async function Dashboard() {
  const { data } = useFetchNextLimitedDataFromFirebaseQuery({});

  return (
    <>
      <ReactTable columns={columns} data={data ?? []} pageSize={10} />
    </>
  );
}
