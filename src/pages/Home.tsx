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
      <div className="min-h-screen flex items-center justify-center">
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
            Muzuri Beauty
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

      {/* Category Showcase */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/shop?category=dresses"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-gradient-to-br from-rose-200 to-rose-400 flex items-end p-8 hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2">Dresses</h3>
                <p className="text-lg">Elegant & Unique</p>
              </div>
            </Link>

            <Link
              to="/shop?category=bags"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-gradient-to-br from-gold-200 to-gold-400 flex items-end p-8 hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2">Bags</h3>
                <p className="text-lg">Shoulder & Clutch</p>
              </div>
            </Link>

            <Link
              to="/shop?category=accessories"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-gradient-to-br from-rose-300 to-gold-300 flex items-end p-8 hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2">
                  Accessories
                </h3>
                <p className="text-lg">Complete Your Look</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="py-16 px-4">
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
