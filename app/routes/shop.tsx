import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CategoryPreview from "~/components/category-preview";
import CategoryProducts from "~/components/category-products";
import { errorHandler } from "~/firebase/errorHandler";
import { categoryService } from "~/services/category.service";
import type { Category } from "~/types/category.types";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Shop" }];
}

/**
 * TODO - add skeletal loader and loading state
 * TODO - Pass loading state to CategoryPreview for control over the loader
 * TODO - should I have one loader for this whole preview or have indidividualloaders for each CategoryPreview
 */
export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categoryId) {
      // TODO
    } else {
      try {
        setLoading(true);
        categoryService.all().then(setCategories);
      } catch (error: unknown) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }
  }, [categoryId]);

  return (
    <div>
      {categoryId ? (
        <CategoryProducts categoryId={categoryId} />
      ) : (
        categories.map(category => (
          <CategoryPreview key={category.id} category={category} />
        ))
      )}
    </div>
  );
}
