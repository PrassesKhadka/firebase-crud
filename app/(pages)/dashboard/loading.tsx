import { DataTableSkeleton } from "@/app/components/Table/Skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <DataTableSkeleton columnCount={5} rowCount={5} />
    </>
  );
}
