"use client";

import React from "react";
import { useFetchDataFromFirebaseQuery } from "../redux/features/firestore/firestoreAPI";

const Table = () => {
  const { data } = useFetchDataFromFirebaseQuery(5);
  console.log(data);
  return <></>;
};

export default Table;
