"use client";

import { useCart } from "../hooks/providers";

export default function AddToCart({ id }: { id: string }) {
  const { setCart } = useCart();
  return (
    <button
      onClick={() => {
        setCart((prev) =>
          prev.includes(id) ? prev.filter((val) => val !== id) : prev.concat(id)
        );
      }}
      className="bg-gray-800 rounded-full w-full p-4 text-2xl text-white"
    >
      Add to Cart
    </button>
  );
}
