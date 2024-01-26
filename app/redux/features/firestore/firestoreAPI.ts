import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collectionName, db } from "@/app/firebase/initialise";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  limit,
  query,
  orderBy,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Idata, IuserDocument } from "@/app/interfaces";

// Since we are not fetching data from an api,we use fakeBaseQuery instead of fetchBaseQuery
//  and also queryFn instead of query
export const firestoreApi = createApi({
  reducerPath: "firestoreApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // To fetch all data
    fetchDataFromFirebase: builder.query({
      // a queryFn should return something otherwise error will occur
      async queryFn() {
        try {
          const collectionRef = collection(db, collectionName);
          const querySnapshot = await getDocs(collectionRef);
          let studentData: IuserDocument[] = [];
          querySnapshot.forEach((doc) => {
            studentData.push({ ...doc.data() } as IuserDocument);
          });
          return { data: studentData };
        } catch (e) {
          console.log(e);
          return { error: e };
        }
      },
    }),
    // To fetch only 10 data
    fetchNextLimitedDataFromFirebase: builder.query({
      async queryFn(recordsEachPage: number) {
        try {
          // Query the first page of docs
          const first = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            limit(recordsEachPage)
          );
          const documentSnapshots = await getDocs(first);

          // Get the last visible document
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];

          // Construct a new query starting at this document,
          // get the next 25 cities.
          const next = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(recordsEachPage)
          );
          return { data: "ok" };
        } catch (e) {
          console.log(e);
          return { error: e };
        }
      },
    }),
    // To add Data
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

export const { useAddDataToFirebaseMutation, useFetchDataFromFirebaseQuery } =
  firestoreApi;