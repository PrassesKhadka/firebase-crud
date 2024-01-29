"use client";
import ReactTable from "./components/Table/Table";
import { type ColumnDef } from "@tanstack/react-table";
import { IuserDocument } from "./interfaces";
import { ReactNode } from "react";
import {
  useFetchDataFromFirebaseQuery,
  useFetchNextLimitedDataFromFirebaseQuery,
} from "./redux/features/firestore/firestoreAPI";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { PascalCase } from "./utils/pascalCase";
import { DataTableSkeleton } from "./components/Skeleton";

export default function Home() {
  const { data } = useFetchDataFromFirebaseQuery("");

  console.log(data);

  const columns: ColumnDef<IuserDocument>[] = [
    {
      header: "",
      accessorKey: "data.additionalInfo.photo.url",
      cell: (props) => (
        <Avatar>
          <AvatarImage alt="User Photo" src={props.renderValue() as string} /> :
          <AvatarFallback>{}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      header: "Name",
      accessorFn: (row) =>
        `${PascalCase(row.data.personalInfo.name.firstName)} 
        ${PascalCase(row.data.personalInfo.name.lastName)}`,
    },

    {
      header: "Email",
      accessorFn: (row) => row.data.personalInfo.email,
    },
    {
      header: "Address",
      accessorKey: "data.personalInfo.address",
    },
    {
      header: "Contact Info ",
      accessorKey: "data.personalInfo.contactInfo",
    },
    {
      header: "Gender",
      accessorKey: "data.additionalInfo.gender",
      cell: (props) => (
        <span className="uppercase">{props.renderValue() as ReactNode}</span>
      ),
    },
  ];
  return (
    <main className="">
      {!data || data.length === 0 ? (
        <DataTableSkeleton columnCount={6} rowCount={5} />
      ) : (
        <ReactTable columns={columns} data={data ?? []} />
      )}
    </main>
  );
}
