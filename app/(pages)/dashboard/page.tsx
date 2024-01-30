import React from "react";
import { useFetchDataFromFirebaseQuery } from "@/app/redux/features/firestore/firestoreAPI";
import ReactTable from "@/app/components/Table/Table";
import { columns } from "@/app/components/Table/columns";

const Dashboard = () => {
  // If you call the same useQuery hook with the same arguments in
  // another component, those two will share the cache entry
  // and return exactly the same data - it will not trigger another
  // request to the server.
  // So: just useQuery everywhere you need it :)

  const { data } = useFetchDataFromFirebaseQuery("");
  return (
    <>
      <ReactTable columns={columns} data={data ?? []} />
    </>
  );
};

export default Dashboard;
