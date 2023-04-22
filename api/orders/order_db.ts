import { Product } from "../products";
import { Order } from "../orders";
import { Affiliate } from "../affiliates";

export default {
  findAll_orders_db: async (filter: any, sort: unknown, limit: string, page: string) => {
    try {
      return await Order.find(filter)
        .sort(sort)
        .populate("user")
        .populate("orderItems.product")
        .populate("orderItems.secondary_product")
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
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
    } catch (error) {}
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
            _id: {
              first_name: "$shipping.first_name",
              last_name: "$shipping.last_name",
              email: "$shipping.email",
              address: "$shipping.address",
              address_1: "$shipping.address_1",
              address_2: "$shipping.address_2",
              city: "$shipping.city",
              state: "$shipping.state",
              postalCode: "$shipping.postalCode",
              international: "$shipping.international",
              country: "$shipping.country"
            }
          }
        },
        {
          $project: {
            _id: 0,
            first_name: "$_id.first_name",
            last_name: "$_id.last_name",
            email: "$_id.email",
            address: "$_id.address",
            address_1: "$_id.address_1",
            address_2: "$_id.address_2",
            city: "$_id.city",
            state: "$_id.state",
            postalCode: "$_id.postalCode",
            international: "$_id.international",
            country: "$_id.country"
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
      const totalPrice = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true
          }
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: "$totalPrice"
            },
            refundTotal: {
              $sum: "$refundTotal"
            }
          }
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: "$totalPrice"
            },
            refundTotal: {
              $sum: "$refundTotal"
            },
            netTotalPrice: {
              $sum: {
                $subtract: ["$totalPrice", "$refundTotal"]
              }
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
  get_range_revenue_orders_db: async (start_date: string, end_date: string) => {
    try {
      const totalPrice = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(start_date),
              $lt: new Date(end_date)
            }
          }
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: "$totalPrice"
            },
            refundTotal: {
              $sum: "$refundTotal"
            }
          }
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: "$totalPrice"
            },
            refundTotal: {
              $sum: "$refundTotal"
            },
            netTotalPrice: {
              $sum: {
                $subtract: ["$totalPrice", "$refundTotal"]
              }
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
  get_daily_revenue_orders_db: async (start_date: string, end_date: string) => {
    try {
      const totalPriceByDay = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(start_date),
              $lt: new Date(end_date)
            }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt"
              }
            },
            totalPrice: {
              $sum: "$totalPrice"
            }
          }
        },
        {
          $project: {
            _id: 0,
            day: "$_id",
            totalPrice: "$totalPrice"
          }
        },
        {
          $sort: {
            day: 1
          }
        }
      ]);

      return totalPriceByDay;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_monthly_revenue_orders_db: async (year: string) => {
    try {
      const totalPriceByMonth = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(`${year}-01-01T00:00:00.000Z`),
              $lt: new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`)
            }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" }
            },
            totalPrice: {
              $sum: "$totalPrice"
            },
            refundTotal: {
              $sum: "$refundTotal"
            }
          }
        },
        {
          $group: {
            _id: null,
            data: {
              $push: {
                month: "$_id.month",
                totalPrice: {
                  $sum: "$totalPrice"
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            data: 1
          }
        }
      ]).exec();
      return totalPriceByMonth;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_yearly_revenue_orders_db: async () => {
    try {
      const totalPriceByYear = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" }
            },
            totalPrice: {
              $sum: "$totalPrice"
            },
            refundTotal: {
              $sum: "$refundTotal"
            }
          }
        },
        {
          $group: {
            _id: null,
            data: {
              $push: {
                year: "$_id.year",
                totalPrice: {
                  $sum: "$totalPrice"
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            data: 1
          }
        }
      ]).exec();
      return totalPriceByYear;
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
  get_product_range_revenue_orders_db: async (id: string, start_date: string, end_date: string) => {
    try {
      const result = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(start_date),
              $lt: new Date(end_date)
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
  get_all_time_tips_revenue_orders_db: async () => {
    try {
      const total_tips = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true
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
  get_range_tips_revenue_orders_db: async (start_date: string, end_date: string) => {
    try {
      const total_tips = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(start_date),
              $lt: new Date(end_date)
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

  get_range_category_revenue_orders_db: async (start_date: string, end_date: string) => {
    try {
      const category_totals = await Order.aggregate([
        {
          $match: {
            deleted: false,
            isPaid: true,
            createdAt: {
              $gte: new Date(start_date),
              $lt: new Date(end_date)
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
            revenue: { $sum: { $multiply: ["$orderItems.qty", "$product.price"] } },
            quantity: { $sum: "$orderItems.qty" }
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
          $match: {
            deleted: false,
            isPaid: true
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
            revenue: { $sum: { $multiply: ["$orderItems.qty", "$product.price"] } },
            quantity: { $sum: "$orderItems.qty" }
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
  get_occurances_products_db: async () => {
    const final_result = await Order.aggregate([
      {
        $match: { deleted: false }
      },
      {
        $unwind: "$orderItems"
      },
      {
        $group: {
          _id: "$orderItems.product",
          name: { $first: "$orderItems.name" },
          occurrence: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          occurrence: 1
        }
      },
      {
        $sort: { occurrence: -1 }
      }
    ]);
    return final_result;
  },
  get_range_affiliate_earnings_code_usage_orders_db: async (start_date: string, end_date: string) => {
    try {
      const affiliatesEarnings = await Affiliate.aggregate([
        {
          $match: { active: true, rave_mob: false }
        },
        {
          $lookup: {
            from: "promos",
            localField: "public_code",
            foreignField: "_id",
            as: "public_code"
          }
        },
        {
          $unwind: "$public_code"
        },
        {
          $lookup: {
            from: "orders",
            let: { affiliate_promo_code: "$public_code.promo_code" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$promo_code", "$$affiliate_promo_code"] },
                      { $gte: ["$createdAt", new Date(start_date)] },
                      { $lte: ["$createdAt", new Date(end_date)] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  number_of_uses: { $sum: 1 },
                  total_revenue: { $sum: "$totalPrice" }
                }
              }
            ],
            as: "affiliate_orders"
          }
        },
        {
          $addFields: {
            number_of_uses: { $arrayElemAt: ["$affiliate_orders.number_of_uses", 0] },
            revenue: { $arrayElemAt: ["$affiliate_orders.total_revenue", 0] }
          }
        },
        {
          $addFields: {
            earnings: {
              $cond: {
                if: { $eq: ["$sponsor", true] },
                then: { $multiply: ["$revenue", 0.15] },
                else: { $multiply: ["$revenue", 0.1] }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            artist_name: 1,
            number_of_uses: 1,
            revenue: 1,
            earnings: 1
          }
        }
      ]);

      return affiliatesEarnings;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_orders_db: async (ids: string[]) => {
    try {
      return await Order.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
