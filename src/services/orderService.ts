import {
  collection,
  addDoc,
  getDocs,
  doc,
  serverTimestamp,
  orderBy,
  query,
  writeBatch,
  increment, // ✅ Imported directly at the top
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Order, OrderItem } from "../types";

// ✅ Create a new order when customer clicks checkout
export const createOrder = async (
  items: OrderItem[],
  totalAmount: number, // ✅ Matched property name
): Promise<string> => {
  const docRef = await addDoc(collection(db, "orders"), {
    items,
    totalAmount, // ✅ Matched property name
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// ✅ Fetch all orders for admin dashboard
export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      items: data.items || [],
      totalAmount: data.totalAmount || 0, // ✅ Matched property name
      status: data.status || "pending",
      createdAt: data.createdAt?.toDate?.() || new Date(),
      customerName: data.customerName || "",
      customerEmail: data.customerEmail || "",
      customerPhone: data.customerPhone || "",
      notes: data.notes || "",
    } as Order;
  });
};

// ✅ Mark order as completed AND automatically deduct stock
export const completeOrder = async (
  orderId: string,
  items: OrderItem[],
): Promise<void> => {
  const batch = writeBatch(db);

  // 1. Update order status to 'completed'
  const orderRef = doc(db, "orders", orderId);
  batch.update(orderRef, { status: "completed" });

  // 2. Deduct stock for each product
  for (const item of items) {
    const productRef = doc(db, "products", item.productId);
    batch.update(productRef, {
      stockCount: increment(-item.quantity), // ✅ Uses the imported increment
    });
  }

  // Execute all updates at once
  await batch.commit();
};
