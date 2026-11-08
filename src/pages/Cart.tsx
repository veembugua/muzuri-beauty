import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const items = cart.map((item) => {
      const details = [item.product.name];
      if (item.selectedSize) details.push(`Size: ${item.selectedSize}`);
      if (item.selectedColor) details.push(`Color: ${item.selectedColor}`);
      details.push(`Qty: ${item.quantity}`);
      details.push(formatPrice(item.product.price * item.quantity));
      return details.join(" | ");
    });

    const message = `Hi! I'd like to order:\n\n${items.join("\n")}\n\nTotal: ${formatPrice(totalPrice)}\n\nIs this available?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/shop" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl shadow-md p-4 flex gap-4"
              >
                <Link
                  to={`/product/${item.product.id}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="font-serif text-lg font-semibold text-gray-900 hover:text-rose-600"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-sm text-gray-600 mt-1">
                    {item.selectedSize && (
                      <span>Size: {item.selectedSize} • </span>
                    )}
                    {item.selectedColor && (
                      <span>Color: {item.selectedColor}</span>
                    )}
                  </div>
                  <div className="text-rose-600 font-bold mt-2">
                    {formatPrice(item.product.price)}
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-rose-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mb-3"
              >
                💬 Checkout via WhatsApp
              </button>

              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
