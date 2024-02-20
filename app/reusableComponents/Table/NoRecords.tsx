import React from "react";
import Image from "next/image";

const NoRecords = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[75vw] h-[90vh]">
        <Image
          src={"/images/no-records-found.jpg"}
          alt="No records found"
          height={500}
          width={400}
        />
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Oops !!! No Records To Show For.
        </h2>
      </div>
    </>
  );
};

export default NoRecords;
