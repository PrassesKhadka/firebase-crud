import { authInit } from "../initialise";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export interface IuserEmailAndPassword {
  email: string;
  password: string;
}

export function registerUser({ email, password }: IuserEmailAndPassword) {
  createUserWithEmailAndPassword(authInit, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
}
