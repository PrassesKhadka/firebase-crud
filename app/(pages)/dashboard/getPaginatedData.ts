import { collectionName, db } from "@/app/firebase/initialise";
import { IuserDocument } from "@/app/interfaces";
import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";

interface IgetPaginatedDataProps {
  currentPage: number;
  eachPage: number;
}

export const getPaginatedData = async ({
  currentPage,
  eachPage,
}: IgetPaginatedDataProps) => {
  try {
    const collectionRef = collection(db, collectionName);
    const queryRef = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limit(eachPage)
    );
    const documentSnapshot = await getDocs(queryRef);
    let studentData: IuserDocument[] = [];
    documentSnapshot.docs.forEach((doc) =>
      studentData.push({ ...(doc.data() as IuserDocument) })
    );
    return { studentData };
  } catch (e) {
    console.log(e);
    return { studentData: [] };
  }
};
