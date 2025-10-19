import clsx from "clsx";
import { EllipsisIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "~/store/cart";
import type { Product } from "~/types/product.types";

import Button from "./button";
import { Skeleton } from "./ui/skeleton";

export default function ProductCard({ product }: { product: Product }) {
  const { addProductToCart } = useCartStore();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={clsx(
        `pointer relative flex h-[500px] w-full flex-col items-center
        overflow-hidden transition-all duration-200`,
        {
          "shadow-2xl hover:shadow-sm": imageLoaded,
        },
      )}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        onLoad={() => {
          setImageLoaded(true);
        }}
        className={clsx(
          "h-full w-full object-cover transition-all",
          imageLoaded ? "opacity-100" : "opacity-0",
        )}
      />

      {!imageLoaded && (
        <div
          className="absolute z-20 flex h-full w-full items-center
            justify-center"
        >
          <ImageIcon size="50" className="text-neutral-300" />
          <EllipsisIcon size="50" className="text-neutral-300" />

          <div
            className="absolute z-20 flex h-full w-full items-center
              justify-center"
          >
            <Skeleton className="h-full w-full rounded-none bg-neutral-200" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full">
        <div
          className="m-5 flex justify-between p-2.5 text-[1.125rem] font-medium
            text-[#e4e4e4e4] backdrop-blur-[5px]"
        >
          <h2 className="">{product.name}</h2>
          <p className="">${product.price}</p>
        </div>
      </div>

      <Button
        className="absolute top-[255px] bg-transparent px-1 py-1 opacity-[0.85]
          backdrop-blur-sm"
        onClick={() => {
          addProductToCart(product);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
