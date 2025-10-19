import { useEffect, useState } from "react";
import CategoryCard from "~/components/category-card";
import { errorHandler } from "~/firebase/errorHandler";
import { categoryService } from "~/services/category.service";
import type { Category } from "~/types/category.types";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Big React Project" },
    { name: "description", content: "YEET!" },
  ];
}

/**
 * * Actually a categories page rather than a home page
 */
export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      categoryService.all().then(setCategories);
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-10">
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} loading={loading} />
      ))}
    </div>
  );
}
