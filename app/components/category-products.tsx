import { useEffect, useState } from "react";
import { Link } from "react-router";
import { categoryService } from "~/services/category.service";
import { productService } from "~/services/product.service";
import type { Category } from "~/types/category.types";
import type { Product } from "~/types/product.types";

import ProductCard from "./product-card";

/**
 * TODO - add skeletal loader and loading state
 * TODO - Pass loading state to ProductCard for control over the loader
 * TODO - should I have one loader for this whole preview or have indidividualloaders for each ProductCard
 */
export default function CategoryProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  // TODO fetch products here since we only need four?

  const [category, setCategory] = useState<Category>();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    categoryService.find(categoryId).then(category => {
      if (!category) {
        return;
      }
      setCategory(category);

      productService.getByCategoryIds([category.id]).then(setProducts);
    });

    return;
  }, []);

  return (
    // TODO handle better later
    category && (
      <div className="mb-8 flex flex-col">
        <Link
          className="mb-6 flex w-min cursor-pointer text-3xl font-normal
            transition-all duration-300 hover:opacity-80"
          // to={`/shop/${category.title.toLowerCase()}?categoryId=${category.id}`}
          to={{
            pathname: "/shop",
            search: `?categoryId=${category.id}`,
          }}
        >
          {category.title.toUpperCase()}
        </Link>

        <div className="grid grid-cols-4 gap-x-5 gap-y-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  );
}
