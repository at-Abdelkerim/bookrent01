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

export async function getBook(id?: string) {
  if (id) {
    return [
      {
        id: id,
        img: ["book01.png", "book02.jpeg"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
    ];
    redirect("/");
  } else {
    return [
      {
        id: "test01",
        img: ["book01.png"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
      {
        id: "test02",
        img: ["book01.png"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
      {
        id: "test03",
        img: ["book01.png"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
      {
        id: "test04",
        img: ["book01.png"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
      {
        id: "test05",
        img: ["book01.png"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
      {
        id: "test06",
        img: ["book01.png"],
        title: "Deep Work",
        price: 72.5,
        owner: { name: "abdelkerim", rate: 45 },
      },
    ];
  }
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

export async function getOwnerDashboardData() {
  return {
    pieChart: [
      { name: "A1", value: 100 },
      { name: "A2", value: 300 },
      { name: "B1", value: 100 },
      { name: "B2", value: 80 },
      { name: "B3", value: 40 },
    ],
    table: [
      { no: 1, bookNo: 1223, name: "DertoGada", status: true, price: 40 },
      { no: 2, bookNo: 1221, name: "Ramatohara", status: false, price: 50 },
      { no: 3, bookNo: 1224, name: "Ramatohara", status: false, price: 50 },
      { no: 4, bookNo: 4554, name: "Ramatohara", status: false, price: 50 },
      { no: 5, bookNo: 4556, name: "Ramatohara", status: false, price: 50 },
    ],
    areaChart: [
      { month: "Jan", thisYear: 5, lastYear: 30 },
      { month: "Feb", thisYear: 20, lastYear: 3 },
      { month: "Mar", thisYear: 10, lastYear: 20 },
      { month: "Apr", thisYear: 20, lastYear: 26 },
      { month: "May", thisYear: 5, lastYear: 5 },
      { month: "Jun", thisYear: 20, lastYear: 20 },
      { month: "Jul", thisYear: 0, lastYear: 30 },
      { month: "Sep", thisYear: 0, lastYear: 3 },
      { month: "Sep", thisYear: 0, lastYear: 20 },
      { month: "Oct", thisYear: 0, lastYear: 26 },
      { month: "Nov", thisYear: 0, lastYear: 5 },
      { month: "Dec", thisYear: 0, lastYear: 20 },
    ],
  };
}
