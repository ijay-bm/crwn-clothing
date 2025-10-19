import { Link } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { useAuthStore } from "~/store/auth";

import CrownLogo from "../assets/svgs/crown.svg";
import CartButton from "./cart-button";

export default function TopNavBar() {
  const { user, loading } = useAuthStore();

  const { logout } = useAuth();

  async function onSignOutButtonClick() {
    await logout();
  }

  return (
    <nav className="mb-6 flex h-[70px] w-full justify-between">
      <Link className="cursor-pointer" to="/">
        <CrownLogo className="h-full w-[70px] p-6" />
      </Link>

      <div className="flex h-full items-center justify-end">
        <Link className="cursor-pointer px-3.5 py-2.5" to="/shop">
          SHOP
        </Link>
        {!user ? (
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
        <CartButton />
      </div>
    </nav>
  );
}
