import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/firebase";
import type { Category } from "~/types/category.types";

const CATEGORY_COLLECTION = "categories";

export const categoryService = {
  async all() {
    const querySnapshot = await getDocs(collection(db, CATEGORY_COLLECTION));

    return querySnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      acc.push({
        id: doc.id,
        title: data.title,
        imageUrl: data.imageUrl,
      });
      return acc;
    }, [] as Category[]);
  },

  async findByTitle(title: string) {
    const q = query(
      collection(db, CATEGORY_COLLECTION),
      where("title", "==", title),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      imageUrl: data.imageUrl,
    };
  },

  async find(id: string) {
    const docRef = doc(db, CATEGORY_COLLECTION, id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return null;
    }

    const data = docSnapshot.data();

    return {
      id: docSnapshot.id,
      title: data.title,
      imageUrl: data.imageUrl,
    };
  },
};
