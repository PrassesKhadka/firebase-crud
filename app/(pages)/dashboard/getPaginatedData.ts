import { collectionName, db } from "@/app/firebase/initialise";
import { IuserDocument } from "@/app/interfaces";
import {
  collection,
  orderBy,
  query,
  limit,
  getDocs,
  DocumentSnapshot,
  Query,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

interface IgetPaginatedDataProps {
  currentPage: number;
  eachPage: number;
}

export const getPaginatedData = async ({
  currentPage,
  eachPage,
}: IgetPaginatedDataProps) => {
  let studentData: IuserDocument[] = [];
  // last visible document for each page stored here suppose for first page last visible document stored at
  // cursors[0]
  let cursors: any[] = [];
  let queryRef;

  try {
    const collectionRef = collection(db, collectionName);
    if (currentPage === 1) {
      queryRef = query(
        collectionRef,
        orderBy("createdAt", "desc"),
        limit(eachPage)
      );
    } else {
      queryRef = query(
        collectionRef,
        orderBy("createdAt", "desc"),
        startAfter(cursors[currentPage - 2]),
        limit(eachPage)
      );
    }
    // getting all the docs as queried
    const documentSnapshots = await getDocs(queryRef);

    // storing the data in studentData
    documentSnapshots.docs.forEach((doc) =>
      studentData.push({ ...(doc.data() as IuserDocument) })
    );

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    cursors[currentPage - 1] = lastVisible;
    console.log(studentData);
    console.log(cursors);
  } catch (e) {
    console.log(e);
  }

  return { studentData };
};
