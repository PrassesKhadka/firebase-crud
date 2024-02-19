import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authInit } from "../initialise";
import { TloginStatus, Tuser } from "@/app/interfaces";

interface IreturnUseAuthObserver {
  currentUser: Tuser;
  loginStatus: TloginStatus;
}

// Custom hook for the current logged in user instead of storing it in a store
// one of Way to store and access state cross component #custom-react-hooks

export function useAuthObserver(): IreturnUseAuthObserver {
  const [currentUser, setCurrentUser] = useState<Tuser>(null);
  const [loginStatus, setLoginStatus] = useState<TloginStatus>("checking");

  useEffect(() => {
    console.log("Component did mount!!!");
    const unsubscribe = onAuthStateChanged(authInit, (user) => {
      console.log("onAuthStateChange runs!!!");
      if (user) {
        setCurrentUser(user);
        setLoginStatus(true);
      } else {
        setCurrentUser(null);
        setLoginStatus(false);
      }
    });

    // clean up
    return () => {
      unsubscribe();
      console.log("Component did unmount");
    };
  }, []);

  return { currentUser, loginStatus };
}
