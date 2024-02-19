import { loginUser, registerUser, logoutUser } from "./auth";
import { useAuthObserver } from "./useAuthObserver";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  useAuthObserver,
};
