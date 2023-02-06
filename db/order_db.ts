import { Product } from "../models";
import Order from "../models/order";

export default {
  findAll_orders_db: async (filter: any, sort: any, limit = 10, page = 1) => {
    try {
      return await Order.find(filter)
        .sort(sort)
        .populate("user")
        .populate("orderItems.product")
        .populate("orderItems.secondary_product")
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  findById_orders_db: async (id: string) => {
    try {
      return await Order.findOne({ _id: id }).populate("user").populate("orderItems.product").populate("orderItems.secondary_product");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  findBy_orders_db: async (params: any) => {
    try {
      return await Order.findOne(params).populate("user").populate("orderItems.product").populate("orderItems.secondary_product");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_orders_db: async (body: any) => {
    try {
      return await Order.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_orders_db: async (id: string, body: any) => {
    try {
      const order: any = await Order.findOne({ _id: id });
      if (order) {
        return await Order.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_orders_db: async (id: string) => {
    try {
      const order: any = await Order.findOne({ _id: id });
      if (order) {
        return await Order.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_orders_db: async (filter: any) => {
    try {
      return await Order.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_product_quantities_orders_db: async () => {
    try {
      const products = await Order.aggregate([
        {
          $match: { deleted: false }
        },
        {
          $unwind: "$orderItems"
        },
        {
          $group: {
            _id: "$orderItems.product",
            quantity: { $sum: "$orderItems.qty" }
          }
        }
      ]);

      // Loop through products and get the name
      const products_with_names = await Promise.all(
        products.map(async (product: any) => {
          // Get the product
          const p = await Product.findOne({ _id: product._id });
          // Return the product with the name
          return {
            name: p ? p.name : "No Name",
            category: p ? p.category : "No Category",
            quantity: product.quantity
          };
        })
      );

      return products_with_names;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_shipping_orders_db: async () => {
    try {
      const dedupedShippingAddresses = await Order.aggregate([
        {
          $group: {
            _id: "$shipping",
            count: { $sum: 1 }
          }
        },
        {
          $match: {
            count: { $gt: 1 }
          }
        }
      ]);
      return dedupedShippingAddresses;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_revenue_orders_db: async () => {
    try {
      const result = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalPrice" }
          }
        }
      ]);
      return result[0].total;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_product_all_time_revenue_orders_db: async (id: string) => {
    try {
      const result = await Order.aggregate([
        { $match: { deleted: false, isPaid: true, "orderItems.product": id } },
        {
          $group: {
            _id: "$orderItems.product",
            totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
          }
        }
      ]).exec();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_product_range_revenue_orders_db: async (id: string, startDate: string, endDate: string) => {
    try {
      const result = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate)
            },
            "orderItems.product": id
          }
        },
        {
          $group: {
            _id: "$orderItems.product",
            totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
          }
        }
      ]).exec();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_revenue_orders_db: async (startDate: string, endDate: string) => {
    try {
      const totalPrice = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate)
            }
          }
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: "$totalPrice"
            }
          }
        }
      ]).exec();
      return totalPrice;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_tips_orders_db: async (startDate: string, endDate: string) => {
    try {
      const total_tips = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate)
            }
          }
        },
        {
          $group: {
            _id: null,
            total_tips: {
              $sum: "$tip"
            }
          }
        }
      ]).exec();
      return total_tips;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_monthly_revenue_orders_db: async () => {
    try {
      const totalPrice = await Order.aggregate([
        {
          $group: {
            _id: { month: { $month: "$date" } },
            revenue: { $sum: "$totalPrice" }
          }
        },
        {
          $project: {
            _id: 0,
            month: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id.month", 1] }, then: "January" },
                  { case: { $eq: ["$_id.month", 2] }, then: "February" },
                  { case: { $eq: ["$_id.month", 2] }, then: "March" },
                  { case: { $eq: ["$_id.month", 2] }, then: "April" },
                  { case: { $eq: ["$_id.month", 2] }, then: "May" },
                  { case: { $eq: ["$_id.month", 2] }, then: "June" },
                  { case: { $eq: ["$_id.month", 2] }, then: "July" },
                  { case: { $eq: ["$_id.month", 2] }, then: "August" },
                  { case: { $eq: ["$_id.month", 2] }, then: "September" },
                  { case: { $eq: ["$_id.month", 2] }, then: "October" },
                  { case: { $eq: ["$_id.month", 2] }, then: "November" },
                  { case: { $eq: ["$_id.month", 12] }, then: "December" }
                ],
                default: "Unknown"
              }
            },
            revenue: 1
          }
        }
      ]).exec();

      return totalPrice;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_category_revenue_orders_db: async (startDate: string, endDate: string) => {
    try {
      const category_totals = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate)
            }
          }
        },
        {
          $unwind: "$orderItems"
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "product"
          }
        },
        {
          $unwind: "$product"
        },
        {
          $group: {
            _id: "$product.category",
            revenue: { $sum: { $multiply: ["$orderItems.qty", "$product.price"] } }
          }
        }
      ]);
      return category_totals;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_category_revenue_orders_db: async () => {
    try {
      const category_totals = await Order.aggregate([
        {
          $match: { deleted: false, isPaid: true }
        },
        {
          $unwind: "$orderItems"
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "product"
          }
        },
        {
          $unwind: "$product"
        },
        {
          $group: {
            _id: "$product.category",
            revenue: { $sum: { $multiply: ["$orderItems.qty", "$product.price"] } }
          }
        }
      ]);
      return category_totals;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_category_quantities_orders_db: async (startDate: string, endDate: string) => {
    try {
      const products = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate)
            }
          }
        },
        {
          $unwind: "$orderItems"
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "product"
          }
        },
        {
          $unwind: "$product"
        },
        {
          $group: {
            _id: "$product.category",
            quantity: { $sum: "$orderItems.qty" }
          }
        }
      ]);
      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_category_quantities_orders_db: async () => {
    try {
      const products = await Order.aggregate([
        {
          $match: { deleted: false, isPaid: true }
        },
        {
          $unwind: "$orderItems"
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "product"
          }
        },
        {
          $unwind: "$product"
        },
        {
          $group: {
            _id: "$product.category",
            quantity: { $sum: "$orderItems.qty" }
          }
        }
      ]);
      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
