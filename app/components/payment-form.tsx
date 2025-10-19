import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";

import Button from "./button";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  // const totalAmount = useSelector(selectCartTotal);

  const { profile } = useAuthStore();

  const { cart } = useCartStore();

  const totalAmount = cart.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
    0,
  );

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    setIsLoading(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({ amount: totalAmount * 100 }),
    }).then(res => res.json());
    console.log(response);

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: profile ? profile.displayName : "Guest",
        },
      },
    });

    setIsLoading(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <form
        className="flex w-full max-w-96 min-w-72 flex-col"
        onSubmit={onSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                lineHeight: "1.2",
                fontSize: "18px",
                color: "#424770",
                "::placeholder": {
                  color: "#9ca3af",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
            hidePostalCode: false,
          }}
        />
        <Button className="mt-7" isLoading={isLoading} disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
}
