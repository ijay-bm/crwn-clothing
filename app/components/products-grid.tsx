import type { Product } from "~/types/product.types";

import ProductCard from "./product-card";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-12">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
