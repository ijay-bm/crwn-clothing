import type { Product } from "./product.types";

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};
