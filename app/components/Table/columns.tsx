import { type RowData, type ColumnDef } from "@tanstack/react-table";
import { IuserDocument } from "@/app/interfaces";
import { ReactNode, useMemo } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { PascalCase } from "@/app/utils/pascalCase";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./data-table-actions/row-actions";
import { DataTableMultipleRowActions } from "./data-table-actions/multiple-row-actions";
import FavouriteRow from "./data-table-actions/favourite-row-actions";
import { HeartIcon } from "@radix-ui/react-icons";
import FavouriteRowMultipleAction from "./data-table-actions/favourite-multiple-row-actions";

export const columns: ColumnDef<IuserDocument>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        // !!-> converts string or any other data structure to boolean
        // Eg: const value = "hello";const booleanValue = !!value; // true
        // Since non-empty strings are truthy in JavaScript
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] mr-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      `${PascalCase({
        string1: row.data.personalInfo.name.firstName,
        string2: row.data.personalInfo.name.lastName,
      })}`,
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
  {
    id: "actions",
    header: ({ table }) => (
      <DataTableMultipleRowActions
        isSomeRowsSelected={table.getIsSomeRowsSelected()}
        isAllRowsSelected={table.getIsAllRowsSelected()}
        selectedRows={table.getState().rowSelection}
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    id: "favourite",
    header: ({ table }) => <FavouriteRowMultipleAction table={table} />,
    cell: ({ row, table, getValue }) => (
      <FavouriteRow row={row} table={table} getValue={getValue} />
    ),
  },
];
