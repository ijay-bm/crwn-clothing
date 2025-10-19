import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAuth } from "~/hooks/useAuth";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";

import Button from "./button";
import CartItem from "./cart-item";

export default function CartButton() {
  const { user, loading } = useAuthStore();

  const { logout } = useAuth();

  const { cart } = useCartStore();

  async function onSignOutButtonClick() {
    await logout();
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex h-[45px] w-[45px] cursor-pointer items-center
            justify-center px-1.5"
        >
          <ShoppingCartIcon />
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
