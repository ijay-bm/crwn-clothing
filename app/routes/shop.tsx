import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CategoryPreview from "~/components/category-preview";
import CategoryProducts from "~/components/category-products";
import { Skeleton } from "~/components/ui/skeleton";
import { errorHandler } from "~/firebase/errorHandler";
import { categoryService } from "~/services/category.service";
import type { Category } from "~/types/category.types";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Shop" }];
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categoryId) {
      return;
    }
    try {
      setLoading(true);
      categoryService.all().then(setCategories);
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  return (
    <div>
      {categoryId ? (
        <CategoryProducts categoryId={categoryId} />
      ) : loading ? (
        <div className="flex flex-col">
          <div className="mb-8 flex flex-col">
            <Skeleton className="mb-6 h-12 w-60 bg-neutral-200" />
            <div className="grid grid-cols-4 gap-x-5">
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
            </div>
          </div>
          <div className="mb-8 flex flex-col">
            <Skeleton className="mb-6 h-12 w-60 bg-neutral-200" />
            <div className="grid grid-cols-4 gap-x-5">
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
              <Skeleton className="h-[500px] w-full bg-neutral-200" />
            </div>
          </div>
        </div>
      ) : (
        categories.map(category => (
          <CategoryPreview key={category.id} category={category} />
        ))
      )}
    </div>
  );
}
