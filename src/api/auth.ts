import { api } from ".";
import { SignIn, SignUp } from "../types";

export const signIn = async (request: SignIn) => {
  return api.post("/v1/auth/signin", {
    ...request,
  });
};

export const signUp = async (request: SignUp) => {
  return api.post("/v1/auth/signup", {
    ...request,
  });
};
