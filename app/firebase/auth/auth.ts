import { authInit } from "../initialise";
import { IuserEmailAndPassword } from "@/app/interfaces";
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function registerUser({
  email,
  password,
}: IuserEmailAndPassword): Promise<User | undefined> {
  let user: User | undefined = undefined;
  await createUserWithEmailAndPassword(authInit, email, password)
    .then((userCredential) => {
      // Signed up
      user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      return;
    });
  return user;
}

export async function loginUser({ email, password }: IuserEmailAndPassword) {
  await signInWithEmailAndPassword(authInit, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export async function logoutUser() {
  await signOut(authInit)
    .then((userCredential) => {
      // Signed out
      // console.log("User signed out !!!", userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode + " " + errorMessage);
    });
}
