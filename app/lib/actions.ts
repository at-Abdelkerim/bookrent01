"use server";

import { redirect } from "next/navigation";
import { CustomError, signIn } from "./auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  let error = null;
  await signIn("old", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
  }).catch((err) => {
    if (err instanceof CustomError && err.type === "CredentialsSignin") {
      error = err.message.split(".")[0];
    } else {
      error = "something was wrong";
    }
  });
  if (error) return error;
  redirect("/");
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  let error = null;
  await signIn("new", {
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    name: formData.get("name"),
    location: formData.get("location"),
    redirect: false,
  }).catch((err) => {
    if (err instanceof CustomError && err.type === "CredentialsSignin") {
      error = err.message.split(".")[0];
    } else {
      error = "Something went wrong.";
    }
  });
  if (error) return error;
  redirect("/");
}
