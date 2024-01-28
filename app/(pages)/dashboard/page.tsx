import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getPaginatedData } from "./getPaginatedData";

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
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams) : 1;
  const eachPage =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const { studentData } = await getPaginatedData({ currentPage, eachPage });
  return (
    <>
      Hello
      <Link href={`?page=${currentPage}&limit=${eachPage}`}>
        <Button>Click</Button>
      </Link>
      <h1>{searchParams.page}</h1>
    </>
  );
};

export default Dashboard;
