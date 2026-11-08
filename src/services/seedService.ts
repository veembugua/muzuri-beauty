import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product } from "../types";

export const seedSampleProducts = async (): Promise<void> => {
  const sampleProducts: Omit<Product, "id" | "createdAt">[] = [
    // DRESSES
    {
      name: "Sunset Maxi Dress",
      description:
        "Flowing maxi dress with vibrant sunset hues. Perfect for beach weddings and special occasions.",
      price: 4500,
      category: "dresses",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Orange", "Pink", "Red"],
      inStock: true,
      stockCount: 8,
      featured: true,
    },
    {
      name: "Floral Wrap Dress",
      description:
        "Elegant floral wrap dress with a flattering silhouette. A timeless piece for any wardrobe.",
      price: 3800,
      category: "dresses",
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["Blue", "Pink"],
      inStock: true,
      stockCount: 12,
      featured: true,
    },
    {
      name: "Elegant Evening Gown",
      description:
        "Stunning floor-length gown with delicate detailing. Make a statement at any formal event.",
      price: 7200,
      category: "dresses",
      images: [
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
      ],
      sizes: ["S", "M", "L"],
      colors: ["Black", "Burgundy", "Navy"],
      inStock: true,
      stockCount: 5,
      featured: true,
    },
    {
      name: "Casual Linen Dress",
      description:
        "Breathable linen dress perfect for warm days. Comfortable yet stylish for everyday wear.",
      price: 3200,
      category: "dresses",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Beige", "Sage"],
      inStock: true,
      stockCount: 15,
      featured: false,
    },

    // BAGS
    {
      name: "Leather Shoulder Bag",
      description:
        "Premium leather shoulder bag with gold hardware. Spacious and sophisticated.",
      price: 2800,
      category: "bags",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      ],
      colors: ["Brown", "Black", "Tan"],
      inStock: true,
      stockCount: 10,
      featured: true,
    },
    {
      name: "Gold Evening Clutch",
      description:
        "Elegant gold clutch perfect for evening events. Compact yet fits all essentials.",
      price: 1900,
      category: "bags",
      images: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
      ],
      colors: ["Gold", "Silver", "Rose Gold"],
      inStock: true,
      stockCount: 7,
      featured: true,
    },
    {
      name: "Canvas Tote Bag",
      description:
        "Spacious canvas tote with stylish prints. Perfect for work, shopping, or travel.",
      price: 2400,
      category: "bags",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
      ],
      colors: ["Natural", "Black", "Navy"],
      inStock: true,
      stockCount: 20,
      featured: false,
    },
    {
      name: "Mini Crossbody Bag",
      description:
        "Compact crossbody bag with adjustable strap. Hands-free style for busy days.",
      price: 1600,
      category: "bags",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      ],
      colors: ["Black", "Red", "Pink"],
      inStock: true,
      stockCount: 14,
      featured: false,
    },

    // ACCESSORIES
    {
      name: "Pearl Drop Earrings",
      description:
        "Classic pearl drop earrings that add elegance to any outfit. Timeless beauty.",
      price: 1200,
      category: "accessories",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      ],
      colors: ["White", "Cream"],
      inStock: true,
      stockCount: 25,
      featured: true,
    },
    {
      name: "Silk Printed Scarf",
      description:
        "Luxurious silk scarf with artistic prints. Versatile accessory for any season.",
      price: 1500,
      category: "accessories",
      images: [
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
      ],
      colors: ["Multi", "Blue", "Red"],
      inStock: true,
      stockCount: 18,
      featured: false,
    },
    {
      name: "Statement Necklace",
      description:
        "Bold statement necklace that transforms any simple outfit into a fashion statement.",
      price: 2200,
      category: "accessories",
      images: [
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
      ],
      colors: ["Gold", "Silver"],
      inStock: true,
      stockCount: 9,
      featured: true,
    },
    {
      name: "Gold Chain Bracelet",
      description:
        "Delicate gold chain bracelet with subtle shimmer. Perfect for everyday elegance.",
      price: 1800,
      category: "accessories",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      ],
      colors: ["Gold", "Rose Gold"],
      inStock: true,
      stockCount: 22,
      featured: false,
    },
  ];

  for (const product of sampleProducts) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
    });
  }
};
