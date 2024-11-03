import mongoose from "mongoose";
import Order from "../../orders/order.js";

export async function up() {
  // Find all orders where any orderItem has quantity: 30
  const orders = await Order.find({
    "orderItems": {
      $elemMatch: {
        "quantity": 30,
      },
    },
  });

  // Update each order's items
  for (const order of orders) {
    for (const item of order.orderItems) {
      if (item.quantity === 30) {
        // Store the original qty value before overwriting
        const originalQty = item.qty;

        // Update the fields
        item.quantity = originalQty;
        item.max_quantity = 30;
        item.max_display_quantity = 30;
      }
    }
    await order.save();
  }
}

export async function down() {
  const Order = mongoose.model("Order");

  // Find all orders where any orderItem has max_quantity: 30
  const orders = await Order.find({
    "orderItems": {
      $elemMatch: {
        "max_quantity": 30,
        "max_display_quantity": 30,
      },
    },
  });

  // Restore the original state
  for (const order of orders) {
    for (const item of order.orderItems) {
      if (item.max_quantity === 30 && item.max_display_quantity === 30) {
        // Move quantity back to qty and set quantity to 30
        item.qty = item.quantity;
        item.quantity = 30;
        item.max_quantity = undefined;
        item.max_display_quantity = undefined;
      }
    }
    await order.save();
  }
}
