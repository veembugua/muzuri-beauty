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

    // ✅ 1. SET YOUR BUSINESS WHATSAPP NUMBER HERE (Include country code, NO '+' or '00')
    // Example for Kenya: 254712345678
    const BUSINESS_PHONE = "254794372740";

    // ✅ 2. Build a clean, professional message
    let message =
      "Hello Muzuri Beauty! 👗 I'd like to inquire about the following items:\n\n";

    cart.forEach((item) => {
      const itemTotal = item.product.price * item.quantity;
      message += `• *${item.product.name}*\n`;
      if (item.selectedSize) message += `   Size: ${item.selectedSize}\n`;
      if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`;
      message += `   Qty: ${item.quantity} — ${formatPrice(itemTotal)}\n\n`;
    });

    message += `💰 *Total Amount: ${formatPrice(totalPrice)}*\n\n`;
    message +=
      "Please confirm availability and share payment/delivery details. Thank you!";

    // ✅ 3. Add the BUSINESS_PHONE to the URL
    const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;

    // Open in a new tab securely
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition shadow-md mb-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Checkout via WhatsApp
              </button>

              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-900 py-2"
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
