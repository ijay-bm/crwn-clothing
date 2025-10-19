import { Link } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";

import CrownLogo from "../assets/svgs/crown.svg";
import CartDropdown from "./cart-dropdown";
import CartButton from "./cart-button";

export default function TopNavBar() {
  const { user, loading } = useAuthStore();

  const { logout } = useAuth();

  const { isOpen } = useCartStore();

  async function onSignOutButtonClick() {
    await logout();
  }

  return (
    <nav className="relative mb-6 flex h-[70px] w-full justify-between">
      <Link className="cursor-pointer" to="/">
        <CrownLogo className="h-full w-[70px] p-6" />
      </Link>

      <div className="flex h-full items-center justify-end">
        <Link className="cursor-pointer px-3.5 py-2.5" to="/shop">
          SHOP
        </Link>
        {user?.uid ? (
          <button
            className="cursor-pointer px-3.5 py-2.5"
            onClick={onSignOutButtonClick}
            disabled={loading}
          >
            SIGN OUT
          </button>
        ) : (
          <Link
            className="cursor-pointer px-3.5 py-2.5"
            to="/sign-in"
            onClick={loading ? e => e.preventDefault() : undefined}
          >
            SIGN IN
          </Link>
        )}
        <div className="relative">
          <CartButton />
          {isOpen && <CartDropdown />}
        </div>
      </div>
    </nav>
  );
}
