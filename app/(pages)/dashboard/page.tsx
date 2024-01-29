import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { getPaginatedData } from "./getPaginatedData";

// Server side component for server side pagination
export interface IpageSearchParams {
  page?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

type DashboardProps = {
  // params: IpageSearchParams;
  searchParams: { [key: string]: string | string[] | undefined };
};

// For server components searchParams are declared as a props
// But for client components, we extract searchParams using useSearchParams() hook
// which is provided out of the box by next js
const Dashboard: React.FC<DashboardProps> = async ({ searchParams }) => {
  // We are basically using the search params as the state
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const eachPage =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const studentData = getPaginatedData({
    currentPage,
    eachPage,
  });
  // const columns = getColumnData();

  return (
    <>
      {/* {studentData[0].data.personalInfo.name ?? ""} */}
      {/* <ReactTable data={studentData} columns={columns} /> */}
      <Link
        href={`?page=${
          currentPage > 1 ? currentPage - 1 : 1
        }&limit=${eachPage}`}
      >
        <Button>Previous</Button>
      </Link>
      <Link href={`?page=${currentPage + 1}&limit=${eachPage}`}>
        <Button>Next</Button>
      </Link>
      <h1>{searchParams.page}</h1>
    </>
  );
};

export default Dashboard;
