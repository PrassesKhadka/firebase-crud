"use client";

import React, { useState } from "react";
import { type Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast, useToast } from "@/components/ui/use-toast";
import { Copy, Edit, Heart, Trash } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IuserDocument } from "@/app/interfaces";
import { PascalCase } from "@/app/utils/pascalCase";
import Link from "next/link";
import { useDeleteDataFromFirebaseMutation } from "@/app/redux/features/firestore/firestoreAPI";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";

interface DataTableRowActionsProps {
  row: Row<IuserDocument>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { id, data } = row.original;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteDataFromFirebase, { isLoading, isError, isSuccess }] =
    useDeleteDataFromFirebaseMutation();
  const { copiedText, copyFunction } = useCopyToClipboard();

  const fullName = PascalCase({
    string1: data.personalInfo.name.firstName,
    string2: data.personalInfo.name.lastName,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer ml-2"
          >
            <DotsHorizontalIcon className="h-4 w-4 " />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px] mt-2 bg-white border flex flex-col justify-around gap-1 rounded-md p-2 z-50"
        >
          <Link href={`/form/${id}`}>
            <DropdownMenuItem className="flex justify-between items-center">
              Edit
              <Edit className="text-blue-500 w-4 h-6" />
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              copyFunction([fullName]);
            }}
            className="flex justify-between items-center cursor-pointer"
          >
            Copy name
            <Copy className="text-gray-500 w-4 h-6" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
            <div className="flex justify-between items-center cursor-pointer">
              Delete
              <Trash className="text-red-500 w-4 h-6" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This record will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
                deleteDataFromFirebase({
                  ids: [id],
                  photoName: data.additionalInfo.photo.name,
                });
                toast({
                  variant: "success",
                  description: "The record has been deleted.",
                });
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
