import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCartStore } from "~/store/cart";

import Button from "./button";
import CartItem from "./cart-item";

export default function CartButton() {
  const { cart } = useCartStore();

  const itemCount = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex h-[45px] w-[45px] cursor-pointer items-center
            justify-center px-1.5"
        >
          <ShoppingCartIcon />
          {!!itemCount && (
            <span
              className="absolute top-0 -right-0.5 flex h-5 w-5 items-center
                justify-center rounded-full bg-red-700/90 text-xs font-bold
                text-neutral-100"
            >
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sticky={"always"}>
        {cart?.length ? (
          <>
            <DropdownMenuGroup>
              <div className="flex h-[240px] flex-col overflow-auto">
                {cart.map(item => (
                  <DropdownMenuLabel>
                    <CartItem key={item.id} cartItem={item} />
                  </DropdownMenuLabel>
                ))}
              </div>
            </DropdownMenuGroup>
            <Link className="" to="/checkout">
              <Button className="mt-auto w-full">CHECKOUT</Button>
            </Link>
          </>
        ) : (
          <div className="flex h-32 items-center justify-center text-center">
            <p>No Items</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
