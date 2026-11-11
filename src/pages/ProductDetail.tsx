import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import type { Product } from "../types";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
          if (data.sizes && data.sizes.length > 0)
            setSelectedSize(data.sizes[0]);
          if (data.colors && data.colors.length > 0)
            setSelectedColor(data.colors[0]);
        } else {
          toast.error("Product not found");
          navigate("/shop");
        }
      } catch (err) {
        toast.error("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`Added ${quantity} x ${product.name} to cart!`);
  };

  // ✅ handleInquiry function has been completely removed

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/shop"
          className="text-rose-600 hover:text-rose-700 font-medium mb-6 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-md mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? "border-rose-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
              <span className="text-sm text-rose-600 font-medium uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-rose-600 mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
                          selectedSize === size
                            ? "border-rose-600 bg-rose-50 text-rose-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
                          selectedColor === color
                            ? "border-rose-600 bg-rose-50 text-rose-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                {product.inStock ? (
                  <p className="text-green-600 font-medium">
                    ✓ In Stock ({product.stockCount} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">✗ Out of Stock</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="font-medium w-12 text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ✅ ONLY the Add to Cart button remains here */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-4 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
