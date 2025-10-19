import { Link } from "react-router";

import type { Category } from "../types/category.types";

/**
 * TODO - add skeletal loader and loading state
 */
export default function CategoryCard({ category }: { category: Category }) {
  return (
    // TODO TBC -> should it be a Link? Eh. no harm
    <Link
      className="group relative flex h-[350px] min-w-[30%] flex-1 cursor-pointer
        items-center justify-center overflow-hidden shadow-[0_0_1rem_#868686]
        transition-all hover:scale-[1.05] hover:shadow-[0_0_0.3rem_#3c3c3c]"
      to={{
        pathname: "/shop",
        search: `?categoryId=${category.id}`,
      }}
    >
      <div
        className="absolute z-10 h-full w-full bg-cover bg-center
          transition-transform duration-[1000ms]
          ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-[1.1]
          hover:duration-[6000ms]"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      />

      <div
        className="z-20 flex flex-col items-center justify-center rounded-2xl
          bg-neutral-600/20 px-6 py-4 text-neutral-200 uppercase shadow-2xl
          shadow-neutral-800 backdrop-blur-xs"
      >
        <h2 className="bold text-2xl">{category.title}</h2>
        <p className="text-lg">Shop Now</p>
      </div>
    </Link>
  );
}
