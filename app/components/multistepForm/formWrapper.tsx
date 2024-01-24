import React from "react";
import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className="flex justify-center items-center mb-4 text-2xl font-bold">
        {title}
      </h2>
      <div className="border-red-500 border-1 flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
