"use client";

import React, { useState, useEffect } from "react";
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
import { IuserDocument } from "@/app/interfaces";

interface ColumnMeta<IuserDocument extends RowData> {
  updateFavouriteRowSelection: (rowId: string) => void;
  favouriteRowSelection: { [key: string]: boolean };
}

type ReactTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
};

const ReactTable = <T,>({
  data,
  columns,
  pageSize = 5,
}: ReactTableProps<T>) => {
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
    meta: {
      updateFavouriteRowSelection: (rowId: string) =>
        setFavouriteRowSelection((prev) => (prev = { ...prev, [rowId]: true })),
      favouriteRowSelection,
    },
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
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row._getAllVisibleCells().map((cell) => (
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
