import mongoose from "mongoose";
import { Order } from "../orders";

export const countScannedTickets = async eventId => {
  const result = await Order.aggregate([
    // Unwind the orderItems array
    { $unwind: "$orderItems" },
    // Match only ticket items for the specific event
    {
      $match: {
        "orderItems.itemType": "ticket",
        "orderItems.ticket": new mongoose.Types.ObjectId(eventId),
      },
    },
    // Unwind the ticketsUsed array
    { $unwind: "$orderItems.ticketsUsed" },
    // Group and count the used tickets
    {
      $group: {
        _id: null,
        scannedTicketsCount: {
          $sum: {
            $cond: ["$orderItems.ticketsUsed.used", 1, 0],
          },
        },
      },
    },
  ]);

  // Return the count or 0 if no results
  return result.length > 0 ? result[0].scannedTicketsCount : 0;
};
