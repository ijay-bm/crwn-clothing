import { Link } from "react-router";
import { useCartStore } from "~/store/cart";

import Button from "./button";
import CartItem from "./cart-item";

export default function CartDropdown() {
  const { cart } = useCartStore();

  return (
    <div
      className="absolute right-0 z-1000 flex h-[340px] w-[260px] flex-col
        bg-neutral-50/80 p-[20px] backdrop-blur-md"
    >
      {cart?.length ? (
        <div className="flex h-[240px] flex-col overflow-auto">
          {cart.map(item => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No Items</p>
        </div>
      )}
      <Link className="" to="/checkout">
        <Button className="mt-auto w-full">CHECKOUT</Button>
      </Link>
    </div>
  );
}
