import mongoose from "mongoose";
import Order from "../../orders/order.js";
import Promo from "../../promos/promo.js";

export async function up() {
  // Find all orders with promo_code as string
  const orders = await Order.find({
    promo_code: { $exists: true, $type: "string" },
  });

  for (const order of orders) {
    if (!order.promo_code) continue;

    // Find corresponding promo document
    const promo = await Promo.findOne({ promo_code: order.promo_code.toLowerCase() });

    if (promo) {
      // Update order to reference promo document
      order.promo = promo._id;
      await order.save();
    } else {
      console.log(`Warning: Could not find promo with code ${order.promo_code.toLowerCase()} for order ${order._id}`);
    }
  }
}

export async function down() {
  // Find all orders with promo references
  const orders = await Order.find({
    promo: { $exists: true },
  }).populate("promo");

  for (const order of orders) {
    if (!order.promo) continue;

    // Convert back to string format
    order.promo_code = order.promo.promo_code;
    order.promo = undefined;
    await order.save();
  }
}
