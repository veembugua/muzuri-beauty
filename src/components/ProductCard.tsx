import { Link } from "react-router-dom";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  return (
    <Link to={`/product/${product.id}`} className="card-product group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Sold Out</span>
          </div>
        )}

        {product.featured && product.inStock && (
          <div className="absolute top-3 right-3 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-rose-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
