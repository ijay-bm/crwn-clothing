import { useCartStore } from "~/store/cart";
import type { Product } from "~/types/product.types";

import Button from "./button";

export default function ProductCard({ product }: { product: Product }) {
  const { addProductToCart } = useCartStore();
  return (
    //  className="pointer relative flex h-[500px] w-full flex-col items-center
    //     overflow-hidden shadow-2xl transition-all duration-[0.25s]
    //     hover:scale-[1.01] hover:shadow-sm"
    <div
      className="pointer relative flex h-[500px] w-full flex-col items-center
        overflow-hidden shadow-2xl transition-all duration-200 hover:shadow-sm"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-0 w-full">
        <div
          className="m-5 flex justify-between p-2.5 text-[1.125rem] font-medium
            text-[#e4e4e4e4] backdrop-blur-[5px]"
        >
          <h2 className="">{product.name}</h2>
          <p className="">{product.price}</p>
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
