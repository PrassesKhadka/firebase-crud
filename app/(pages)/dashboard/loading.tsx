import React from "react";
import { DataTableSkeleton } from "@/app/components/Skeleton";

const Loading = () => {
  return (
    <>
      <DataTableSkeleton columnCount={6} rowCount={5} />;
    </>
  );
};

export default Loading;
