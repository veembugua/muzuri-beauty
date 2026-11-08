import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../services/productService";
import type { Product, ProductCategory } from "../types";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const activeCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data =
          activeCategory === "all"
            ? await fetchAllProducts()
            : await fetchProductsByCategory(activeCategory as ProductCategory);
        setProducts(data);
      } catch (err) {
        toast.error("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const categories = [
    { id: "all", label: "All Products" },
    { id: "dresses", label: "Dresses" },
    { id: "bags", label: "Bags" },
    { id: "accessories", label: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of unique dresses, elegant bags, and
            stunning accessories
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeCategory === cat.id
                  ? "bg-rose-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-rose-50 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing {products.length} product
              {products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
