import { useCartStore } from "~/store/cart";

import ShoppingBagSvg from "../assets/svgs/shopping-bag.svg";

export default function CartButton() {
  const { isOpen, setIsOpen } = useCartStore();

  return (
    <button
      className="relative flex h-[45px] w-[45px] cursor-pointer items-center
        justify-center px-1.5"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <ShoppingBagSvg />
      <span className="absolute bottom-[8px] text-[12px]">12</span>
    </button>
  );
}
