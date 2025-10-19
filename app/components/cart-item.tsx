import { useCartStore } from "~/store/cart";
import type { CartItem } from "~/types/cart.types";

export default function CartItem({ cartItem }: { cartItem: CartItem }) {
  const { incrementQuantity, decrementQuantity } = useCartStore();

  return (
    <div className="g-[80px] mb-[15px] flex w-full">
      <img
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
        className="w-[30%] object-cover"
      />
      <div
        className="flex w-[70%] flex-col items-start justify-center gap-1
          px-[20px] py-[10px]"
      >
        <h2 className="">{cartItem.product.name}</h2>
        <div className="flex gap-[5px]">
          <button
            onClick={() => decrementQuantity(cartItem.product.id)}
            className="flex h-[24px] w-[24px] cursor-pointer items-center
              justify-center border border-neutral-400 text-sm font-light
              text-neutral-600 transition-colors hover:border-neutral-600
              hover:text-neutral-800"
          >
            -
          </button>
          {cartItem.quantity}
          <button
            onClick={() => incrementQuantity(cartItem.product.id)}
            className="flex h-[24px] w-[24px] cursor-pointer items-center
              justify-center border border-neutral-400 text-sm font-light
              text-neutral-600 transition-colors hover:border-neutral-600
              hover:text-neutral-800"
          >
            +
          </button>
        </div>

        <p className="text-sm text-neutral-600">
          ${cartItem.product.price}/item
        </p>
        <p className="">${cartItem.product.price * cartItem.quantity}</p>
      </div>
    </div>
  );
}
