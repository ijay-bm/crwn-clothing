import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";
import { useShallow } from "zustand/shallow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCartStore } from "~/store/cart";

import Button from "./button";
import CartButtonCount from "./cart-button-count";
import CartItem from "./cart-item";

export default function CartButton() {
  // Testing isolated rendering by plucking IDs instead of the array of objects
  const cartIds = useCartStore(
    useShallow(state => state.cart.map(item => item.id)),
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex h-[45px] w-[45px] cursor-pointer items-center
            justify-center px-1.5"
        >
          <ShoppingCartIcon />
          <CartButtonCount />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sticky={"always"}>
        {cartIds?.length ? (
          <>
            <DropdownMenuGroup>
              <div className="flex h-[240px] flex-col overflow-auto">
                {cartIds.map(cartId => (
                  <DropdownMenuLabel key={cartId}>
                    <CartItem cartId={cartId} />
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
