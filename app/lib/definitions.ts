import React from "react";

export type TBook = {
  id?: string;
  img?: string | string[];
  name?: string;
  price?: number;
  author?: string;
  category?: string;
  quantity?: number;
  owner?: { name?: string; rate?: number };
};
