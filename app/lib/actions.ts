"use server";

import { redirect } from "next/navigation";
import { auth, CustomError, signIn, signOut } from "./auth";
import { cookies } from "next/headers";
import { z } from "zod";
import prisma from "./db";
import fs from "fs";
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

export async function unauthentic(
  prevState: string | undefined,
  formData: FormData
) {
  await signOut();
  redirect("/");
  return "";
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

export async function getCustomerBook(id?: string) {
  try {
    return await prisma.book
      .findMany({
        where: { id: id || undefined },
        select: {
          id: true,
          img: true,
          name: true,
          price: true,
          author: true,
          owner: { select: { id: true, name: true, rate: true } },
        },
      })
      .then((books) =>
        books.map(({ img, ...rest }) => ({ ...rest, img: img || [] }))
      );
  } catch (error) {
    console.log("ERROR :: ", error);
    return [];
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

export async function getDashboardData() {
  const session = await auth();
  try {
    const newDate = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const income: { month: string; thisYear: number; lastYear: number }[] = [];
    for (let index = 0; index < months.length; index++) {
      const thisYear = await prisma.rent.findMany({
        where: {
          book: {
            ownerId:
              session?.user?.role === "owner" ? session?.user?.id : undefined,
          },
          date: {
            gte: new Date(
              `${index + 1}/1/${newDate.getFullYear()}`
            ).toISOString(),
            lte: new Date(
              `${index + 1}/31/${newDate.getFullYear()}`
            ).toISOString(),
          },
        },
        select: {
          id: true,
          book: { select: { quantity: true, price: true } },
        },
      });
      const lastYear = await prisma.rent.findMany({
        where: {
          book: {
            ownerId:
              session?.user?.role === "owner" ? session?.user?.id : undefined,
          },
          date: {
            gte: new Date(
              `${index + 1}/1/${newDate.getFullYear() + 1}`
            ).toISOString(),
            lte: new Date(
              `${index + 1}/31/${newDate.getFullYear() + 1}`
            ).toISOString(),
          },
        },
        select: {
          id: true,
          book: { select: { quantity: true, price: true } },
        },
      });
      income.push({
        month: months[index],
        thisYear: thisYear.reduce((result, { book: { quantity, price } }) => {
          return result + quantity * price;
        }, 0),
        lastYear: lastYear.reduce((result, { book: { quantity, price } }) => {
          return result + quantity * price;
        }, 0),
      });
    }

    const categoryData = await prisma.book
      .groupBy({
        by: "category",
        where:
          session?.user?.role === "owner"
            ? {
                ownerId: session?.user?.id,
              }
            : undefined,
        _sum: {
          quantity: true,
        },
      })
      .then((res) =>
        res.map(({ category, _sum: { quantity } }) => ({
          category,
          quantity: quantity || 0,
        }))
      );

    const books = await prisma.book.findMany({
      where:
        session?.user?.role === "owner"
          ? { ownerId: session?.user?.id }
          : undefined,
      select: {
        id: true,
        no: true,
        name: true,
        price: true,
        status: true,
        owner:
          session?.user?.role === "owner"
            ? { select: { name: true } }
            : undefined,
      },
    });

    return { income, categoryData, books };
  } catch (err) {
    console.log(err);
  }
}

export async function getOwnerBookName() {
  try {
    const books = await prisma.book.findMany({
      distinct: ["name"],
      select: { id: true, name: true },
    });
    return books || [];
  } catch (err) {
    return [];
  }
}

export async function uploadBook(
  prevState: boolean | undefined,
  formData: FormData
) {
  const session = await auth();
  const dir = `./public/image/book/${session?.user?.id}/`;
  const file = formData.get("bookCover") as File;
  const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
  let fileName =
    new Date().toLocaleString().replace(/[\/\s:,]/g, "") + "." + ext;
  if (fs.existsSync(dir)) {
    let temp = true;
    while (temp) {
      try {
        fs.statSync(dir + fileName);
        fileName =
          new Date().toLocaleString().replace(/[\/\s:,]/g, "") + "." + ext;
      } catch (err) {
        temp = false;
      }
    }
  } else {
    try {
      fs.mkdirSync(dir);
    } catch (err) {
      return false;
    }
  }

  try {
    fs.writeFileSync(dir + fileName, new Uint8Array(await file.arrayBuffer()));
  } catch (err) {
    return false;
  }

  try {
    const parsedData = z
      .object({
        book: z.string().min(1),
        quantity: z.coerce.number().min(1),
        price: z.coerce.number(),
      })
      .safeParse({
        book: formData.get("book"),
        quantity: formData.get("quantity"),
        price: formData.get("price"),
      });
    if (parsedData.success) {
      let { book, price, quantity } = parsedData.data;
      let name, author, category;
      const extractData = book.split(" ");
      if (extractData.length == 1) {
        const oldData = await prisma.book.findUnique({
          where: { id: book },
          select: { name: true, author: true, category: true },
        });
        name = oldData?.name;
        author = oldData?.author;
        category = oldData?.category;
      } else {
        [name, author, category] = extractData;
      }
      if (name && author && category) {
        const newBook = await prisma.book.create({
          data: {
            name,
            author,
            category,
            img: [fileName],
            price,
            quantity,
            ownerId: session?.user?.id!,
          },
        });
        if (newBook) return true;
      }
    }
  } catch (err) {
    return false;
  }
}

export async function getBookList() {
  // prevState: boolean | undefined,
  // formData: FormData
  try {
    return await prisma.book.findMany({
      select: {
        id: true,
        no: true,
        name: true,
        category: true,
        author: true,
        status: true,
        owner: { select: { name: true } },
      },
    });
  } catch (err) {
    return [];
  }
}

export async function getOwnerList() {
  try {
    return await prisma.user
      .findMany({
        where: { role: "owner" },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          name: true,
          location: true,
          status: true,
          approved: true,
          book: { select: { quantity: true } },
        },
      })
      .then((res) =>
        res.map(({ book, ...res }) => ({
          ...res,
          bookNumber: book.reduce(
            (result, { quantity }) => result + quantity,
            0
          ),
        }))
      );
  } catch (err) {
    return [];
  }
}

export async function toggleStatus(
  prevState: boolean | undefined,
  formData: FormData
) {
  try {
    const parsedData = z
      .object({
        id: z.string().min(1),
        dataType: z.string().min(1),
        status: z.coerce.boolean(),
      })
      .safeParse({
        id: formData.get("id"),
        dataType: formData.get("dataType"),
        status: formData.get("status"),
      });
    if (parsedData.success) {
      const { id, dataType, status } = parsedData.data;
      if (dataType === "book") {
        const updated = await prisma.book.update({
          where: { id },
          data: { status },
          select: { status: true },
        });
        revalidatePath("/admin/dashboard/books");
        return updated.status;
      } else {
        const updated = await prisma.user.update({
          where: { id, role: "owner" },
          data: { status },
          select: { status: true },
        });
        revalidatePath("/admin/dashboard/owners");
        return updated.status;
      }
    }
  } catch (err) {}
}

export async function toggleApprove(
  prevState: boolean | undefined,
  formData: FormData
) {
  try {
    const parsedData = z
      .object({ id: z.string(), approved: z.coerce.boolean() })
      .safeParse({
        id: formData.get("id"),
        approved: formData.get("approved"),
      });
    if (parsedData.success) {
      const { id, approved } = parsedData.data;
      const updatedData = await prisma.user.update({
        where: { id, role: "owner" },
        data: { approved },
        select: { approved: true },
      });
      revalidatePath("/admin/dashboard/owners");
      return updatedData.approved;
    }
  } catch (err) {}
}
