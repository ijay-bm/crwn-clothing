import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

interface InputGroupProps {
  label: React.ReactNode;
  inputAttributes: UseFormRegisterReturn & ComponentPropsWithoutRef<"input">;
  error?: FieldError | undefined;
}

export default function InputGroup({
  label,
  inputAttributes,
  error,
}: InputGroupProps) {
  const id = inputAttributes.id ?? Math.random().toString();

  return (
    <div className="group/input-group py-[10px]">
      <div className="group/label-input-group relative">
        <input
          {...inputAttributes}
          id={id}
          placeholder={inputAttributes.placeholder ?? " "}
          className={clsx(
            `peer w-full border-b-[1px] border-b-neutral-300 p-2 text-[18px]
            tracking-[0.5px] text-neutral-800 focus:outline-0
            [type=password]:tracking-[0.3em]`,
            inputAttributes.className,
          )}
        />
        <label
          className="absolute top-0 left-0 block p-2 text-[18px]
            text-neutral-600 transition-all duration-100 ease-in-out
            group-focus-within/label-input-group:translate-y-[-15px]
            group-focus-within/label-input-group:text-[12px]
            group-focus-within/label-input-group:text-neutral-800
            peer-not-placeholder-shown:translate-y-[-15px]
            peer-not-placeholder-shown:text-[12px]"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
