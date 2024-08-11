import React, { createContext, useContext } from "react";

export const CartContext = createContext<{
  cart: string[];
  setCart: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  cart: [""],
  setCart: (val) => val,
});

export const useCart = () => useContext(CartContext);
