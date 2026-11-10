import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchFeaturedProducts,
  fetchAllProducts,
} from "../services/productService";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [featured, all] = await Promise.all([
          fetchFeaturedProducts(),
          fetchAllProducts(),
        ]);
        setFeaturedProducts(featured);
        setAllProducts(all);
      } catch (err) {
        toast.error("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-100 via-cream-50 to-gold-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
            Muzuri Beauty Closet
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover unique dresses, elegant bags, and stunning accessories that
            celebrate your beauty
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/shop" className="btn-primary">
              Shop Collection
            </Link>
            <Link to="/shop?category=dresses" className="btn-secondary">
              View Dresses
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
              Featured Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ✅ UPDATED: Category Showcase with Real Images */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dresses Category */}
            <Link
              to="/shop?category=dresses"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] flex items-end p-8 hover:scale-[1.02] transition-transform duration-500 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                alt="Elegant Dresses"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2 drop-shadow-md">
                  Dresses
                </h3>
                <p className="text-lg drop-shadow-sm">Elegant & Unique</p>
              </div>
            </Link>

            {/* Bags Category */}
            <Link
              to="/shop?category=bags"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] flex items-end p-8 hover:scale-[1.02] transition-transform duration-500 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Bags"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2 drop-shadow-md">
                  Bags
                </h3>
                <p className="text-lg drop-shadow-sm">Shoulder & Clutch</p>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link
              to="/shop?category=accessories"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] flex items-end p-8 hover:scale-[1.02] transition-transform duration-500 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
                alt="Stunning Accessories"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2 drop-shadow-md">
                  Accessories
                </h3>
                <p className="text-lg drop-shadow-sm">Complete Your Look</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="py-16 px-4 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              New Arrivals
            </h2>
            <Link
              to="/shop"
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
