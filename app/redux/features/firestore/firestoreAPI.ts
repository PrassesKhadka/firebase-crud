import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collectionName, db } from "@/app/firebase/initialise";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Idata, IuserDocument } from "@/app/interfaces";

// Since we are not fetching data from an api,we use fakeBaseQuery instead of fetchBaseQuery
//  and also queryFn instead of query
export const firestoreApi = createApi({
  reducerPath: "firestoreApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    addDataToFirebase: builder.mutation({
      // a queryFn should return something otherwise error will occur
      async queryFn(data: Idata) {
        try {
          const collectionRef = collection(db, collectionName);
          const actuallData: IuserDocument = {
            data,
            createdAt: serverTimestamp(),
            lastUpdatedAt: serverTimestamp(),
          };
          await addDoc(collectionRef, actuallData);
          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const { useAddDataToFirebaseMutation } = firestoreApi;
