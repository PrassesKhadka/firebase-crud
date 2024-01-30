import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collectionName, db } from "@/app/firebase/initialise";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  limit,
  query,
  where,
  orderBy,
  startAfter,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Idata, IuserDocument } from "@/app/interfaces";

interface IeditArg {
  documentObj: IuserDocument;
  updatedObj: Partial<IuserDocument>;
}

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
          const queryRef = query(collectionRef, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(queryRef);
          let studentData: IuserDocument[] = [];
          querySnapshot.forEach((doc) => {
            studentData.push({ id: doc.id, ...doc.data() } as IuserDocument);
          });

          return { data: studentData };
        } catch (e) {
          console.log(e);
          return { error: e };
        }
      },
    }),
    // To fetch only 5 data
    fetchNextLimitedDataFromFirebase: builder.query({
      // queryFn only takes one argument so pass an object instead
      async queryFn({ pageSize = 5 }) {
        try {
          // Query the first page of docs
          const first = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            limit(pageSize)
          );
          const documentSnapshots = await getDocs(first);
          let eachPageStudentData: IuserDocument[] = [];
          // Get the last visible document
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          const next = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(pageSize)
          );
          documentSnapshots.docs.forEach((doc) =>
            eachPageStudentData.push({ ...doc.data() } as IuserDocument)
          );
          return { data: eachPageStudentData };
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
          const actuallData: Omit<IuserDocument, "id"> = {
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
    // To edit data:

    editDatafromFirebase: builder.mutation({
      async queryFn({ documentObj, updatedObj }: IeditArg) {
        try {
          const collectionRef = collection(db, collectionName);
          const documentRef = doc(collectionRef, documentObj.id);
          await updateDoc(documentRef, {
            updatedObj,
            lastUpdatedAt: serverTimestamp(),
          } as Partial<IuserDocument>);

          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const {
  useAddDataToFirebaseMutation,
  useFetchDataFromFirebaseQuery,
  useFetchNextLimitedDataFromFirebaseQuery,
  useEditDatafromFirebaseMutation,
} = firestoreApi;
