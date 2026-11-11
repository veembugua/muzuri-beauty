import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/productService";
import type { ProductCategory } from "../../types";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("dresses");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [stockCount, setStockCount] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const product = await fetchProductById(id);
        if (product) {
          setImageUrl(product.images[0] || "");
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setCategory(product.category);
          setSizes(product.sizes?.join(", ") || "");
          setColors(product.colors?.join(", ") || "");
          setStockCount(product.stockCount.toString());
          setFeatured(product.featured);
        } else {
          toast.error("Product not found");
          navigate("/admin/dashboard");
        }
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      toast.error("Please provide an image URL");
      return;
    }

    setSaving(true);
    try {
      await updateProduct(id!, {
        name,
        description,
        price: parseFloat(price),
        category,
        images: [imageUrl.trim()],
        sizes: sizes ? sizes.split(",").map((s) => s.trim()) : [],
        colors: colors ? colors.split(",").map((c) => c.trim()) : [],
        stockCount: parseInt(stockCount) || 0,
        inStock: true,
        featured,
      });
      toast.success("Product updated successfully!");
      navigate("/admin/dashboard");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Edit Product
          </h1>
          <Link
            to="/admin/dashboard"
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image URL *
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="input-field"
            />
            {imageUrl && (
              <div className="mt-4 h-48 w-full rounded-lg overflow-hidden bg-gray-100 border">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (KES) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="input-field"
              >
                <option value="dresses">Dresses</option>
                <option value="bags">Bags</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sizes (comma separated)
              </label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="e.g. S, M, L"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colors (comma separated)
              </label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="e.g. Red, Blue"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Count *
              </label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
              />
              <label
                htmlFor="featured"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Mark as Featured
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
