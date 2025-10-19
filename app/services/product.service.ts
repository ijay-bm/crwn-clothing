import {
  QueryConstraint,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/firebase";
import type { Product } from "~/types/product.types";

const PRODUCT_COLLECTION = "products";

export const productService = {
  async getByCategoryIds(categoryIds: string[], limitCount?: number) {
    const constraints: QueryConstraint[] = [
      where("categoryIds", "array-contains-any", categoryIds),
    ];

    if (limitCount) {
      constraints.push(limit(limitCount));
    }

    const q = query(collection(db, PRODUCT_COLLECTION), ...constraints);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      categoryIds: doc.data().categoryIds,
      name: doc.data().name,
      imageUrl: doc.data().imageUrl,
      price: doc.data().price,
    })) satisfies Product[];
  },
};
