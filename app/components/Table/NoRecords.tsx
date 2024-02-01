import React from "react";
import Image from "next/image";

const NoRecords = () => {
  return (
    <>
      <div>
        <Image
          src={"/public/no-records-found.jpg"}
          alt="No records found"
          height={500}
          width={400}
        />
      </div>
    </>
  );
};

export default NoRecords;
