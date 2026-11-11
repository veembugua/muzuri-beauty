export type ProductCategory = "dresses" | "bags" | "accessories";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: OrderItem[]; // ✅ FIXED: Changed from CartItem[] to OrderItem[]
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "completed"; // ✅ FIXED: Added 'completed'
  createdAt: Date;
  notes?: string;
}

export interface User {
  uid: string;
  email: string;
  role: "admin" | "customer";
  name?: string;
  phone?: string;
}
