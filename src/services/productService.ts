import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product, ProductCategory } from "../types";

export const fetchAllProducts = async (): Promise<Product[]> => {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      images: data.images || [],
      sizes: data.sizes,
      colors: data.colors,
      inStock: data.inStock ?? true,
      stockCount: data.stockCount ?? 0,
      featured: data.featured ?? false,
      createdAt: data.createdAt?.toDate?.() || new Date(),
    } as Product;
  });
};

export const fetchProductsByCategory = async (
  category: ProductCategory,
): Promise<Product[]> => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
    where("inStock", "==", true),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      images: data.images || [],
      sizes: data.sizes,
      colors: data.colors,
      inStock: data.inStock ?? true,
      stockCount: data.stockCount ?? 0,
      featured: data.featured ?? false,
      createdAt: data.createdAt?.toDate?.() || new Date(),
    } as Product;
  });
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const q = query(
    collection(db, "products"),
    where("featured", "==", true),
    where("inStock", "==", true),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      images: data.images || [],
      sizes: data.sizes,
      colors: data.colors,
      inStock: data.inStock ?? true,
      stockCount: data.stockCount ?? 0,
      featured: data.featured ?? false,
      createdAt: data.createdAt?.toDate?.() || new Date(),
    } as Product;
  });
};

export const fetchProductById = async (
  productId: string,
): Promise<Product | null> => {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    images: data.images || [],
    sizes: data.sizes,
    colors: data.colors,
    inStock: data.inStock ?? true,
    stockCount: data.stockCount ?? 0,
    featured: data.featured ?? false,
    createdAt: data.createdAt?.toDate?.() || new Date(),
  } as Product;
};

export const addProduct = async (
  productData: Omit<Product, "id" | "createdAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await deleteDoc(doc(db, "products", productId));
};
