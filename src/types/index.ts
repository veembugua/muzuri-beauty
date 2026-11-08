export type ProductCategory = "dresses" | "bags" | "accessories";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[]; // URLs from Firebase Storage
  sizes?: string[]; // For dresses: S, M, L, XL
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

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
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
