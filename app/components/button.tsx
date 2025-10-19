import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import Spinner from "./spinner";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: "blue" | "black";
  isLoading?: boolean;
}

const Button = ({
  children,
  color = "black",
  isLoading = false,
  disabled,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `h-[50px] w-auto min-w-[165px] cursor-pointer border border-none px-2.5
        py-2.5 text-[15px] font-bold tracking-[0.5px] text-neutral-50 uppercase
        ring-0 transition-all duration-250 hover:ring-4 active:ring-2`,
        {
          "bg-neutral-900 enabled:ring-neutral-900": color === "black",
          "bg-blue-600 enabled:ring-blue-500": color === "blue",
          "cursor-wait": isLoading,
          "cursor-not-allowed opacity-50": disabled,
        },
        className,
      )}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading && <Spinner small />}
      {children}
    </button>
  );
};

export default Button;
