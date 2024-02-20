"use client";

import * as React from "react";
import { Dialog } from "@radix-ui/react-dialog";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  DotsHorizontalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { type RowSelectionState } from "@tanstack/react-table";
import {
  useFetchNextLimitedDataFromFirebaseQuery,
  useDeleteDataFromFirebaseMutation,
} from "@/app/redux/features/firestore/firestoreAPI";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";
import { PascalCase } from "@/app/utils/pascalCase";

interface IdataTableMultipleRowActionsProps {
  isSomeRowsSelected: boolean;
  isAllRowsSelected: boolean;
  selectedRows: RowSelectionState;
}
export function DataTableMultipleRowActions({
  isSomeRowsSelected,
  isAllRowsSelected,
  selectedRows,
}: IdataTableMultipleRowActionsProps) {
  const [open, setIsOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const { data } = useFetchNextLimitedDataFromFirebaseQuery({});
  const [deleteDataFromFirebase] = useDeleteDataFromFirebaseMutation();
  const { copyFunction } = useCopyToClipboard();

  const deleteStudentData = async () => {
    let photoName = "";
    if (data) {
      const toDeleteData = Object.keys(selectedRows).map((index: string) => {
        const i = Number(index);
        photoName = data[i].data.additionalInfo.photo.name;
        return data[i].id;
      });
      await deleteDataFromFirebase({ ids: toDeleteData, photoName });
    }
  };

  const copyStudentData = async () => {
    let studentName = "";
    if (data) {
      const toCopyData = Object.keys(selectedRows).map((index: string) => {
        const i = Number(index);
        studentName = PascalCase(
          data[i].data.personalInfo.name.firstName +
            data[i].data.personalInfo.name.lastName
        );
        return studentName;
      });
      await copyFunction(toCopyData);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => copyStudentData()}
            disabled={!isAllRowsSelected && !isSomeRowsSelected}
            className="cursor-pointer"
          >
            Copy Selected Names
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!isAllRowsSelected && !isSomeRowsSelected}
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600 cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This records will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={async () => {
                setShowDeleteDialog(false);
                await deleteStudentData();
                toast({
                  variant: "success",
                  description: `${
                    Object.keys(selectedRows).length
                  } records have been successfully deleted.`,
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
