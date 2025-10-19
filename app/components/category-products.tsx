import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { errorHandler } from "~/firebase/errorHandler";
import { categoryService } from "~/services/category.service";
import { productService } from "~/services/product.service";
import type { Category } from "~/types/category.types";
import type { Product } from "~/types/product.types";

import ProductCard from "./product-card";

export default function CategoryProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [category, setCategory] = useState<Category>();

  const [products, setProducts] = useState<Product[]>([]);

  async function findCategory() {
    try {
      setLoadingCategory(true);
      const categoryResponse = await categoryService.find(categoryId);
      if (!categoryResponse) {
        return;
      }
      setCategory(categoryResponse);
      return categoryResponse;
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setLoadingCategory(false);
    }
  }

  async function getProducts() {
    try {
      setLoadingProducts(true);
      const productsResponse = await productService.getByCategoryIds([
        categoryId,
      ]);
      setProducts(productsResponse);
      return productsResponse;
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function findCategoryAndGetProductsByCategoryIds() {
    try {
      setLoading(true);
      const categoryResponse = await findCategory();
      if (!categoryResponse) {
        return;
      }
      await getProducts();
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findCategoryAndGetProductsByCategoryIds();
  }, []);

  return (
    category && (
      <div className="mb-8 flex flex-col">
        <div className="mb-6 flex justify-center">
          <Link
            className={clsx(
              `flex w-min cursor-pointer text-3xl font-normal text-neutral-800
              transition-all duration-300 hover:opacity-80`,
              {},
            )}
            to={{
              pathname: "/shop",
              search: `?categoryId=${category.id}`,
            }}
          >
            {category.title.toUpperCase()}
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-x-5 gap-y-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  );
}
