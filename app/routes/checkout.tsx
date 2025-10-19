import { Elements } from "@stripe/react-stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { useMemo } from "react";
import PaymentForm from "~/components/payment-form";
import { stripePromise } from "~/components/stripe";
import { useCartStore } from "~/store/cart";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Checkout" }];
}

export default function Checkout() {
  const { cart, decrementQuantity, incrementQuantity, removeFromCart } =
    useCartStore();

  const total = cart.reduce(
    (acc, { product: { price }, quantity }) => acc + price * quantity,
    0,
  );

  const promise = useMemo(() => {
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then(res => res.json())
      .then(data => data.clientSecret);
  }, []);

  return (
    <div className="">
      <div
        className="mx-auto my-[50px] grid max-w-[800px] grid-cols-5 gap-y-[5px]"
      >
        <h2 className="text-center text-[0.8rem] font-semibold uppercase">
          Product
        </h2>
        <h2 className="text-center text-[0.8rem] font-semibold uppercase">
          Description
        </h2>
        <h2 className="text-center text-[0.8rem] font-semibold uppercase">
          Quantity
        </h2>
        <h2 className="text-center text-[0.8rem] font-semibold uppercase">
          Price
        </h2>
        <h2 className="text-center text-[0.8rem] font-semibold uppercase"></h2>

        {cart.map(cartItem => (
          <>
            <hr className="col-span-5 border-neutral-200" />
            <div className="h-full min-h-[200px] w-full">
              <img
                src={cartItem.product.imageUrl}
                alt={cartItem.product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex h-full items-center justify-center">
              <p>{cartItem.product.name}</p>
            </div>

            <div className="flex h-full items-center justify-center gap-2">
              <button
                onClick={() => decrementQuantity(cartItem.product.id)}
                className="flex h-[30px] w-[30px] cursor-pointer items-center
                  justify-center text-xl text-neutral-600 transition-colors"
              >
                &#10094;
              </button>
              {cartItem.quantity}
              <button
                onClick={() => incrementQuantity(cartItem.product.id)}
                className="flex h-[30px] w-[30px] cursor-pointer items-center
                  justify-center text-xl text-neutral-600 transition-colors"
              >
                &#10095;
              </button>
            </div>

            <div className="flex h-full items-center justify-center">
              <p className="">${cartItem.product.price * cartItem.quantity}</p>
            </div>

            <div className="flex h-full items-center justify-center">
              <button
                onClick={() => {
                  removeFromCart(cartItem.id);
                }}
                className="flex h-[30px] w-[30px] cursor-pointer items-center
                  justify-center text-xl text-neutral-600 transition-colors"
              >
                &#10005;
              </button>
            </div>
          </>
        ))}

        <hr className="col-span-5 border-neutral-200" />
        <div className="col-span-5 mt-[30px] flex items-baseline justify-end">
          <p className="text-[24px] font-light">TOTAL </p>
          <p className="text-[36px] font-light">{total}</p>
          <p className="text-[24px] font-light">$</p>
        </div>
      </div>

      <CheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: promise }}
      >
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </CheckoutProvider>
    </div>
  );
}
