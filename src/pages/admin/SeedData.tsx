import { useState } from "react";
import { Link } from "react-router-dom";
import { seedSampleProducts } from "../../services/seedService";
import toast from "react-hot-toast";

const SeedData = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      await seedSampleProducts();
      toast.success("12 sample products added successfully! 🎉");
      setSeeded(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to seed data";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="text-rose-600 hover:text-rose-700 font-medium mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            🔧 Admin: Seed Sample Data
          </h1>
          <p className="text-gray-600 mb-6">
            Click the button below to add 12 sample products (4 dresses, 4 bags,
            4 accessories) to Firestore. This is a one-time setup for demo
            purposes.
          </p>

          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-rose-800">
              <strong>⚠️ Warning:</strong> This will add 12 products to your
              Firestore database. Only click once unless you want duplicates!
            </p>
          </div>

          <button
            onClick={handleSeed}
            disabled={loading || seeded}
            className="w-full py-4 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Seeding..."
              : seeded
                ? "✓ Products Seeded!"
                : "Seed 12 Sample Products"}
          </button>

          {seeded && (
            <div className="mt-6 text-center">
              <p className="text-green-600 font-medium mb-4">
                ✓ Success! Visit the shop to see your products.
              </p>
              <Link to="/shop" className="btn-primary inline-block">
                Go to Shop →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeedData;
