import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // ✅ Direct Firebase import
import { auth } from "../../lib/firebase"; // ✅ Your firebase config
import { fetchAllProducts, deleteProduct } from "../../services/productService";
import type { Product } from "../../types";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Gold Standard React Data Fetching Pattern
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        if (isMounted) setProducts(data);
      } catch {
        if (isMounted) toast.error("Failed to load products");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");

      const data = await fetchAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
      toast.success("Logged out successfully");
    } catch {
      // ✅ Fixed: Removed unused 'error' variable
      toast.error("Failed to log out");
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="flex gap-3">
            <Link
              to="/admin/orders"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              📦 Manage Orders
            </Link>
            <Link
              to="/admin/add-product"
              className="px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
            >
              + Add New Product
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Inventory ({products.length} items)
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No products found.{" "}
              <Link
                to="/admin/add-product"
                className="text-rose-600 hover:underline"
              >
                Add your first product
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat("en-KE", {
                          style: "currency",
                          currency: "KES",
                        }).format(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${product.inStock && product.stockCount > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {product.stockCount} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
