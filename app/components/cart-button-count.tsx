import { useCartStore } from "~/store/cart";

/** Testing isolated rendering */
export default function CartButtonCount() {
  const { cart } = useCartStore();

  const itemCount = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  if (!itemCount) {
    return;
  }

  return (
    <span
      className="absolute top-full left-1/2 flex -translate-x-1/2 -translate-y-2
        items-center justify-center text-center text-xs font-bold text-nowrap
        text-neutral-500"
    >
      {itemCount} {itemCount > 1 ? "items" : "item"}
    </span>
  );
}
