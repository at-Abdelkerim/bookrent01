import React from "react";

export type TBook = {
  id: string;
  img: string | string[];
  title: string;
  price: number;
  owner: { name: string; rate: number };
};
