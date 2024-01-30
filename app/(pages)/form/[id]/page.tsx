"use client";

import React from "react";
import Form from "@/app/components/multistepForm";

interface Props {
  params: Object;
}
interface Object {
  id: string;
}
const EditForm = ({ params }: Props) => {
  return (
    <>
      {params.id}
      <Form />
    </>
  );
};

export default EditForm;