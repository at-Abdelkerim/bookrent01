"use server";

import { redirect } from "next/navigation";
import { CustomError, signIn } from "./auth";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

export async function giveLike(
  prevState: boolean | undefined,
  formData: FormData
) {
  const parsedData = z
    .object({ id: z.string().min(1) })
    .safeParse({ id: formData.get("id") });
  if (parsedData.success) {
    const { id } = parsedData.data;
    const cookieStore = cookies();
    const isLike = cookieStore.has(id);
    if (isLike) cookieStore.delete(id);
    else cookieStore.set(id, "like", { secure: true });
    return !isLike;
  }
}

export async function getBooks() {
  return [
    {
      id: "test01",
      img: "book01.png",
      title: "Deep Work",
      price: 72.5,
      owner: { name: "abdelkerim", rate: 45 },
    },
    {
      id: "test02",
      img: "book01.png",
      title: "Deep Work",
      price: 72.5,
      owner: { name: "abdelkerim", rate: 45 },
    },
    {
      id: "test03",
      img: "book01.png",
      title: "Deep Work",
      price: 72.5,
      owner: { name: "abdelkerim", rate: 45 },
    },
    {
      id: "test04",
      img: "book01.png",
      title: "Deep Work",
      price: 72.5,
      owner: { name: "abdelkerim", rate: 45 },
    },
    {
      id: "test05",
      img: "book01.png",
      title: "Deep Work",
      price: 72.5,
      owner: { name: "abdelkerim", rate: 45 },
    },
    {
      id: "test06",
      img: "book01.png",
      title: "Deep Work",
      price: 72.5,
      owner: { name: "abdelkerim", rate: 45 },
    },
  ];
}
