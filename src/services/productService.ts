import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product, ProductCategory } from "../types";

export const updateProduct = async (
  productId: string,
  productData: Omit<Product, "id" | "createdAt">,
): Promise<void> => {
  const docRef = doc(db, "products", productId);
  await updateDoc(docRef, productData);
};

// ✅ Helper function using the official Firebase TypeScript type instead of 'any'
const parseProduct = (doc: QueryDocumentSnapshot): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    images: data.images || [],
    sizes: data.sizes || [],
    colors: data.colors || [],
    inStock: data.inStock ?? true,
    stockCount: data.stockCount ?? 0,
    featured: data.featured ?? false,
    createdAt: data.createdAt?.toDate?.() || new Date(),
  } as Product;
};

// ✅ FETCH ALL: Fetches everything, then sorts in JavaScript. NO INDEX REQUIRED.
export const fetchAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map(parseProduct);

  // Sort by newest first using JavaScript
  return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// ✅ FILTER BY CATEGORY: Fetches everything, filters in JavaScript. NO INDEX REQUIRED.
export const fetchProductsByCategory = async (
  category: ProductCategory,
): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs
    .map(parseProduct)
    .filter((p) => p.category === category && p.inStock === true);

  return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// ✅ FILTER FEATURED: Fetches everything, filters in JavaScript. NO INDEX REQUIRED.
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs
    .map(parseProduct)
    .filter((p) => p.featured === true && p.inStock === true);

  return products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const fetchProductById = async (
  productId: string,
): Promise<Product | null> => {
  const docSnap = await getDoc(doc(db, "products", productId));
  if (!docSnap.exists()) return null;
  return parseProduct(docSnap);
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
