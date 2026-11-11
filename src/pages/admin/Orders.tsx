import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders, completeOrder } from "../../services/orderService";
import type { Order } from "../../types";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Gold Standard React Data Fetching Pattern
  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        if (isMounted) setOrders(data);
      } catch {
        if (isMounted) toast.error("Failed to load orders");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  const handleComplete = async (order: Order) => {
    if (
      !window.confirm(
        `Mark Order ${order.id.slice(-6)} as completed? This will automatically deduct stock.`,
      )
    )
      return;

    try {
      await completeOrder(order.id, order.items);
      toast.success("Order completed and stock updated!");

      // Refresh the list after successful completion
      const data = await getAllOrders();
      setOrders(data);
    } catch {
      toast.error("Failed to complete order");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Customer Orders
          </h1>
          <Link
            to="/admin/dashboard"
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            No orders yet. When a customer checks out, they will appear here!
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-rose-600"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "completed" ||
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status === "completed" ||
                      order.status === "delivered"
                        ? "✅ Completed"
                        : "⏳ Pending Payment"}
                    </span>
                    <p className="text-xl font-bold text-rose-600 mt-2">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Items:
                  </h4>
                  <ul className="space-y-2">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex justify-between"
                      >
                        <span>
                          {item.quantity}x {item.productName}
                          {item.size && (
                            <span className="text-gray-400">
                              {" "}
                              (Size: {item.size})
                            </span>
                          )}
                          {item.color && (
                            <span className="text-gray-400">
                              {" "}
                              (Color: {item.color})
                            </span>
                          )}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {(order.status === "pending" ||
                  order.status === "confirmed" ||
                  order.status === "shipped") && (
                  <button
                    onClick={() => handleComplete(order)}
                    className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    ✓ Mark as Paid & Deduct Stock
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
