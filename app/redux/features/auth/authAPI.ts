// import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
// import { authCollectionName, db } from "@/app/firebase/initialise";
// import {
//   addDoc,
//   collection,
//   serverTimestamp,
//   getDoc,
//   doc,
//   setDoc,
// } from "firebase/firestore";
// import { IauthUserData } from "@/app/interfaces";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fakeBaseQuery(),
//   tagTypes: ["Auth"],
//   endpoints: (builder) => ({
//     // To fetch Authenticated user's data
//     fetchAuthUserData: builder.query({
//       async queryFn(id: string) {
//         try {
//           const collectionRef = collection(db, authCollectionName);
//           const docRef = doc(collectionRef, id);
//           const data = await getDoc(docRef);
//           return { data };
//         } catch (e) {
//           console.log(e);
//           return { error: e };
//         }
//       },
//       providesTags: ["Auth"],
//     }),

//     // To add authenticated user's Data to firestore
//     addAuthUserData: builder.mutation({
//       // a queryFn should return something otherwise error will occur
//       async queryFn(id: string) {
//         try {
//           const collectionRef = collection(db, authCollectionName);
//           const actuallData: Omit<IuserDocument, "id"> = {
//             data,
//             favourite: "false",
//             createdAt: serverTimestamp(),
//             lastUpdatedAt: serverTimestamp(),
//           };
//           await setDoc(collectionRef, actuallData);
//           return { data: "ok" };
//         } catch (e) {
//           return { error: e };
//         }
//       },
//       invalidatesTags: ["Firestore"],
//     }),
//   }),
// });

// export const {} = authApi;
