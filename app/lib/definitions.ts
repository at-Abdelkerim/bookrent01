import React from "react";

type TRole = "admin" | "owner" | "customer";

export type TUser = {
  id?: string;
  name?: string;
  role?: TRole;
  email?: string;
  phoneNumber?: string;
  password?: string;
  location?: string;
  status?: boolean;
  approved?: boolean;
  rate?: number;
  book?: TBook;
  rent?: TRent;
};

export type TBook = {
  id?: string;
  no?: number;
  name?: string;
  author?: string;
  category?: string;
  img?: string[];
  price?: number;
  quantity?: number;
  owner?: TUser;
  ownerId?: string;
  status?: boolean;
  rent?: TRent;
};

export type TRent = {
  id?: string;
  customer?: TUser;
  customerId?: string;
  book?: TBook;
  bookId?: string;
  date?: Date;
};

export type TSelectedOwner = {
  name?: string;
  email?: string;
  location?: string;
  phoneNumber?: string;
};
