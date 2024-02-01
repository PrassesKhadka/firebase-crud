import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collectionName, db, storage } from "@/app/firebase/initialise";
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
  QueryDocumentSnapshot,
  DocumentSnapshot,
  DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { Idata, IuserDocument } from "@/app/interfaces";
import { deleteObject, ref } from "firebase/storage";

interface IeditArg {
  documentObj: IuserDocument;
  updatedObj: Idata;
}
interface IfetchNextDataArg {
  pageSize?: number;
}

interface IdeleteArg {
  ids: string[];
  photoName: string;
}

// If you call the same useQuery hook with the same arguments in
// another component, those two will share the cache entry
// and return exactly the same data - it will not trigger another
// request to the server.
// So basically this querying is like putting data in redux state so basically you can
// can call this hook and use it everywhere
// So: just useQuery everywhere you need it :)
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
      async queryFn({ pageSize = 10 }: IfetchNextDataArg) {
        try {
          // Query the first page of docs
          const first = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            limit(pageSize)
          );
          const documentSnapshots = await getDocs(first);
          let eachPageStudentData: IuserDocument[] = [];
          // // Get the last visible document
          // const lastVisible =
          //   documentSnapshots.docs[documentSnapshots.docs.length - 1];
          // const next = query(
          //   collection(db, collectionName),
          //   orderBy("createdAt", "desc"),
          //   startAfter(lastVisible),
          //   limit(pageSize)
          // );
          documentSnapshots.docs.forEach((doc) =>
            eachPageStudentData.push({
              id: doc.id,
              ...doc.data(),
            } as IuserDocument)
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

    // To update data:
    updateDatafromFirebase: builder.mutation({
      async queryFn({ documentObj, updatedObj: data }: IeditArg) {
        try {
          const collectionRef = collection(db, collectionName);
          const documentRef = doc(collectionRef, documentObj.id);
          await updateDoc(documentRef, {
            ...documentObj,
            data,
            lastUpdatedAt: serverTimestamp(),
          } satisfies IuserDocument);

          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },
    }),

    // To delete data: Also delete the photo of user in fire storage
    deleteDataFromFirebase: builder.mutation({
      async queryFn({ ids, photoName }: IdeleteArg) {
        console.log(photoName);
        try {
          const collectionRef = collection(db, collectionName);
          ids.forEach(async (id) => {
            const documentRef = doc(collectionRef, id);
            await deleteDoc(documentRef);
            if (photoName === "avatar.png") return;
            // To also delete the photo of the user stored in fire storage
            const storageRef = ref(storage, photoName);
            await deleteObject(storageRef);
          });
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
  useUpdateDatafromFirebaseMutation,
  useDeleteDataFromFirebaseMutation,
} = firestoreApi;
