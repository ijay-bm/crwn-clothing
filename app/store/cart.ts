import { create } from "zustand";
import type { CartItem } from "~/types/cart.types";
import type { Product } from "~/types/product.types";

interface CartState {
  cart: CartItem[];
  addProductToCart: (product: Product) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeFromCart: (itemId: number) => void;
}

export const useCartStore = create<CartState>(set => ({
  cart: [],
  addProductToCart: (product: Product) => {
    set(({ cart }) => {
      const existingItem = cart.find(item => item.product.id === product.id);

      if (existingItem) {
        // Increment quantity
        return {
          cart: cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        // Add new item
        return {
          cart: [...cart, { id: Math.random(), product, quantity: 1 }],
        };
      }
    });
  },
  incrementQuantity: (productId: string) => {
    set(({ cart }) => ({
      cart: cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    }));
  },
  decrementQuantity: (productId: string) => {
    set(({ cart }) => ({
      cart: cart
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    }));
  },
  removeFromCart: (itemId: number) => {
    set(({ cart }) => ({
      cart: cart.filter(item => item.id !== itemId),
    }));
  },
}));
