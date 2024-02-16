"use client";

import React, { useState, useEffect, useReducer } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  useReactTable,
  type RowData,
  type ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import NoRecords from "./NoRecords";
import { useWindowSize } from "usehooks-ts";

// interface ColumnMeta<IuserDocument extends RowData> {
//   updateFavouriteRowSelection: (rowId: string) => void;
//   favouriteRowSelection: { [key: string]: boolean };
// }

type ReactTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
};

interface Istate<T> {
  columns: ColumnDef<T>[];
}
interface Ipayload {
  // Get first how many columns or last how many columns:
  getFirstNColumns: number;
  getLastNColumns?: number;
}
type Ttype = "mobileWidth" | "betweenMobileAndTabletWidth" | "tabletWidth";
interface Iaction {
  type: Ttype;
  // how many columns you would want to show
  payload: Ipayload;
}
const ReactTable = <T,>({
  data,
  columns: columnsProp,
  pageSize = 5,
}: ReactTableProps<T>) => {
  // To make it mobile responsive
  // Why did i use useReducer here:: because, my first approach was this way but since this is
  // not well readable so i used it as an alternative to useState
  // I could have also done it using redux but since this is only used in this component alone
  // i don't have to go through that approach.
  // When to Use useReducer:
  // Complex state logic: If your state logic involves multiple sub-values that interact or update frequently, useReducer allows you to organize your update logic more cleanly and efficiently.
  // Optimizing performance: For components with complex state updates that might trigger unwanted re-renders, useReducer can help control when updates occur and potentially improve performance.
  // Sharing state logic: If multiple parts of your component tree need to interact with the same state, using a global state management solution like Redux might be overkill. useReducer can help manage shared state within a component hierarchy.
  const { width } = useWindowSize();
  const [columns, setColumns] = useState(columnsProp);
  // To make it mobile responsive
  useEffect(() => {
    const mobileWidth = width < 425;
    const betweenMobileAndTabletWidth = width >= 425 && width < 768;
    const tabletWidth = width >= 768 && width < 1024;

    if (mobileWidth) {
      setColumns(() => {
        const first3 = columnsProp.slice(0, 3);
        const last2 = columnsProp.slice(-2);
        return [...first3, ...last2];
      });
    } else if (betweenMobileAndTabletWidth) {
      setColumns(() => {
        const first4 = columnsProp.slice(0, 4);
        const last2 = columnsProp.slice(-2);
        return [...first4, ...last2];
      });
    } else if (tabletWidth) {
      setColumns(() => {
        const first5 = columnsProp.slice(0, 5);
        const last2 = columnsProp.slice(-2);
        return [...first5, ...last2];
      });
    } else {
      setColumns(columnsProp);
    }
  }, [width]);

  // To Do: optimise throught userReducer
  // const initialState = { columns: columnsProp };
  // function reducer(state: Istate<T>, action: Iaction) {
  //   switch(action.type){
  //     case "mobileWidth":
  //         return {columns:}
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, initialState);
  // To use this state globally across all components you can access it through
  // table.state
  const [rowSelection, setRowSelection] = useState({});
  const [favouriteRowSelection, setFavouriteRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
    // To implement click on heart to choose all heart
    // meta: {
    //   updateFavouriteRowSelection: (rowId: string) =>
    //     setFavouriteRowSelection((prev) => (prev = { ...prev, [rowId]: true })),
    //   favouriteRowSelection,
    // },
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize]);

  return (
    <>
      {data.length === 0 ? (
        <NoRecords />
      ) : (
        <div>
          <div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow key={row.id}>
                    {row._getAllVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReactTable;
