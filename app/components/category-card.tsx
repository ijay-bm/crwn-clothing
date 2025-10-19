import clsx from "clsx";
import { EllipsisIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";

import type { Category } from "../types/category.types";

export default function CategoryCard({
  category,
  loading,
}: {
  category: Category;
  loading: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      className={clsx(
        `group relative flex h-[350px] min-w-[30%] flex-1 items-center
        justify-center overflow-hidden transition-all`,
        imageLoaded &&
          `cursor-pointer shadow-[0_0_1rem_#868686] hover:scale-[1.05]
          hover:shadow-[0_0_0.3rem_#3c3c3c]`,
      )}
      to={{
        pathname: "/shop",
        search: `?categoryId=${category.id}`,
      }}
    >
      <img
        src={category.imageUrl}
        alt={category.title}
        onLoad={() => {
          setImageLoaded(true);
        }}
        className={clsx(
          `absolute inset-0 z-10 h-full w-full object-cover transition-all
          duration-[1000ms] ease-[cubic-bezier(0.25,0.45,0.45,0.95)]
          group-hover:scale-[1.1] hover:duration-[6000ms]`,
          imageLoaded ? "opacity-100" : "opacity-0",
        )}
      />

      {(loading || !imageLoaded) && (
        <div
          className="absolute z-20 flex h-full w-full items-center
            justify-center"
        >
          <ImageIcon size="50" className="text-neutral-300" />
          <EllipsisIcon size="50" className="text-neutral-300" />

          <div
            className="absolute z-20 flex h-full w-full items-center
              justify-center"
          >
            <Skeleton className="h-full w-full rounded-none bg-neutral-200" />
          </div>
        </div>
      )}

      {!loading && (
        <div
          className={clsx(
            `z-30 flex flex-col items-center justify-center px-6 py-4
            text-neutral-200 uppercase`,
            {
              "bg-neutral-600/20 shadow-2xl shadow-neutral-800 backdrop-blur-xs":
                imageLoaded,
              "-translate-y-8 self-end bg-neutral-600/50": !imageLoaded,
            },
          )}
        >
          <h2 className="bold text-2xl">{category.title}</h2>
          <p className="text-lg">Shop Now</p>
        </div>
      )}
    </Link>
  );
}
