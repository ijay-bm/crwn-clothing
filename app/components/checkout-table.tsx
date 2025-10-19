import { useCartStore } from "~/store/cart";
import type { Cart } from "~/types/cart.types";

export default function CheckOutTable({ cart }: { cart: Cart }) {
  const { decrementQuantity, incrementQuantity, removeFromCart } =
    useCartStore();

  return (
    <div className="mx-auto my-[50px] grid max-w-[800px] grid-cols-5">
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
          <div>
            <img
              src={cartItem.product.imageUrl}
              alt={cartItem.product.name}
              className="w-[30%] object-cover"
            />
          </div>
          <div>
            <p>{cartItem.product.name}</p>
          </div>
          <div>
            <div className="flex gap-[5px]">
              <button
                onClick={() => decrementQuantity(cartItem.product.id)}
                className="flex h-[24px] w-[24px] cursor-pointer items-center
                  justify-center border border-neutral-400 text-sm font-light
                  text-neutral-600 transition-colors hover:border-neutral-600
                  hover:text-neutral-800"
              >
                -
              </button>
              {cartItem.quantity}
              <button
                onClick={() => incrementQuantity(cartItem.product.id)}
                className="flex h-[24px] w-[24px] cursor-pointer items-center
                  justify-center border border-neutral-400 text-sm font-light
                  text-neutral-600 transition-colors hover:border-neutral-600
                  hover:text-neutral-800"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p className="">${cartItem.product.price * cartItem.quantity}</p>
          </div>
          <div>
            <button
              onClick={() => {
                removeFromCart(cartItem.id);
              }}
            >
              X
            </button>
          </div>
        </>
      ))}
    </div>
  );
}
