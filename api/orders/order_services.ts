import { affiliate_db } from "../affiliates";
import { expense_db } from "../expenses";
import { order_db } from "../orders";
import { promo_db } from "../promos";
import { user_db } from "../users";
import {
  categories,
  dates_in_year,
  determine_filter,
  determine_promoter_code_tier,
  determine_sponsor_code_tier,
  isEmail,
  month_dates,
  removeDuplicates,
  subcategories,
  toCapitalize
} from "../../util";
const scraper = require("table-scraper");

const today = new Date();

export default {
  findAll_orders_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "10";
      let search: any;
      if (query.search && query.search.match(/^[0-9a-fA-F]{24}$/)) {
        search = query.search ? { _id: query.search } : {};
      } else if (query.search && isEmail(query.search)) {
        search = query.search
          ? {
              $expr: {
                $regexMatch: {
                  input: "$shipping.email",
                  regex: query.search,
                  options: "i"
                }
              }
            }
          : {};
      } else if (query.search && query.search.substring(0, 1) === "#") {
        search = query.search
          ? {
              promo_code: query.search.slice(1, query.search.length).toLowerCase()
            }
          : {};
      } else {
        search = query.search
          ? {
              $expr: {
                $regexMatch: {
                  input: {
                    $concat: ["$shipping.first_name", " ", "$shipping.last_name"]
                  },
                  regex: query.search,
                  options: "i"
                }
              }
            }
          : {};
      }
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort: any = { createdAt: -1 };
      let filter: any = { deleted: false };
      if (sort_query === "lowest") {
        sort = { totalPrice: 1 };
      } else if (sort_query === "highest") {
        sort = { totalPrice: -1 };
      } else if (sort_query === "date") {
        sort = { createdAt: -1 };
      } else if (sort_query === "paid") {
        filter = {
          deleted: false,
          isPaid: true,
          isManufactured: false,
          isPackaged: false,
          isShipped: false,
          isDelivered: false
        };
      } else if (sort_query === "manufactured") {
        filter = {
          deleted: false,
          isPaid: true,
          isManufactured: true,
          isPackaged: false,
          isShipped: false,
          isDelivered: false
        };
      } else if (sort_query === "packaged") {
        filter = {
          deleted: false,
          isPaid: true,
          isManufactured: true,
          isPackaged: true,
          isShipped: false,
          isDelivered: false
        };
      } else if (sort_query === "shipped") {
        filter = {
          deleted: false,
          isPaid: true,
          isManufactured: true,
          isPackaged: true,
          isShipped: true,
          isDelivered: false
        };
      } else if (sort_query === "delivered") {
        filter = {
          deleted: false,
          isPaid: true,
          isManufactured: true,
          isPackaged: true,
          isShipped: true,
          isDelivered: true
        };
      }
      const orders = await order_db.findAll_orders_db({ ...filter, ...search }, sort, limit, page);
      const count = await order_db.count_orders_db({ ...filter, ...search });
      // const count = await Product.countDocuments(filter);
      return {
        orders,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_orders_s: async (params: any) => {
    try {
      const sort = { _id: -1 };
      const filter = { deleted: false, user: params.id };
      const limit = "0";
      const page = "1";
      return await order_db.findAll_orders_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_orders_s: async (params: any) => {
    try {
      return await order_db.findById_orders_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_orders_s: async (body: any) => {
    try {
      return await order_db.create_orders_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_orders_s: async (params: any, body: any) => {
    try {
      return await order_db.update_orders_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_orders_s: async (params: any) => {
    try {
      return await order_db.remove_orders_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  occurrences_orders_s: async () => {
    try {
      return await order_db.get_occurances_products_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  top_customers_orders_s: async (params: any) => {
    try {
      const users = await user_db.findAll_users_db({ deleted: false }, { _id: -1 }, "0", "1");
      const orders = await Promise.all(
        users.map(async (user: any) => {
          const orders = await order_db.findAll_orders_db({ deleted: false, user: user._id }, { _id: -1 }, "0", "1");
          const amount = orders.reduce((total: any, c: any) => parseFloat(total) + parseFloat(c.totalPrice), 0);
          return {
            user: user,
            number_of_orders: orders.length,
            amount: amount
          };
        })
      );
      const sorted_orders = orders
        .map((order: any) => {
          return {
            user: order.user,
            number_of_orders: order.number_of_orders,
            amount: order.amount
          };
        })
        .sort((a: any, b: any) => (a.amount > b.amount ? -1 : 1))
        .slice(0, 20);
      return sorted_orders;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  category_occurrences_orders_s: async (params: any) => {
    try {
      const sort = {};
      const filter = { deleted: false, user: params._id };
      const limit = "50";
      const page = "1";
      const orders = await order_db.findAll_orders_db(filter, sort, limit, page);
      const products: any = [];
      const ids: any = [];
      orders.forEach((order: any) => {
        order.orderItems.map((item: any) => {
          products.push(item.category);
          ids.push(item._id);
          if (item.secondary_product) {
            products.push(item.secondary_product.category);
            ids.push(item.secondary_product._id);
          }
        });
      });
      // //
      const result: any = {};
      const ids_result: any = {};
      for (let i = 0; i < products.length; ++i) {
        if (!result[products[i]]) {
          result[products[i]] = 0;
          ids_result[ids[i]] = 0;
        }
        ++result[products[i]];
        ++ids_result[ids[i]];
      }
      // //
      const final_result = [];
      for (const i in result) {
        const entry = { category: i, occurrence: result[i], id: ids_result[i] };
        final_result.push(entry);
      }
      final_result.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
      return final_result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  code_usage_orders_s: async (params: any, query: any) => {
    const { start_date, end_date, sponsor } = query;
    const { promo_code } = params;
    try {
      const sort = {};

      const filter = {
        deleted: false,
        isPaid: true,
        createdAt: {
          $gte: start_date,
          $lte: end_date
        },
        promo_code: new RegExp(promo_code, "i")
      };

      const limit = "0";
      const page = "1";

      const orders = await order_db.findAll_orders_db(filter, sort, limit, page);

      const number_of_uses = orders
        .filter((order: any) => order.promo_code)
        .filter((order: any) => order.promo_code.toLowerCase() === promo_code.toLowerCase()).length;
      const revenue = orders
        .filter((order: any) => order.promo_code)
        .filter((order: any) => order.promo_code.toLowerCase() === promo_code.toLowerCase())
        .reduce(
          (a: any, order: any) =>
            a +
            order.totalPrice -
            order.taxPrice -
            (order.payment.refund ? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100 : 0),
          0
        );
      const earnings = sponsor === "true" ? revenue * 0.15 : revenue * 0.1;

      return { number_of_uses, revenue, earnings };
      // return "Success";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  affiliate_code_usage_orders_s: async (params: any, query: any) => {
    try {
      const sort = {};
      let filter = {};
      // const filter = {
      //   deleted: false,
      //   promo_code: params.promo_code,
      //   isPaid: true,
      //   createdAt: {
      //     $gte: new Date(start_date),
      //     $lte: new Date(end_date)
      //   }
      // };

      if (query.month && query.month.length > 0) {
        const start_date = month_dates(query.month, query.year).start_date;
        const end_date = month_dates(query.month, query.year).end_date;
        filter = {
          deleted: false,
          isPaid: true,
          promo_code: params.promo_code,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        };
      } else if (query.year && query.year.length > 0) {
        const start_date = query.year + "-01-01";
        const end_date = query.year + "-12-31";
        filter = {
          deleted: false,
          isPaid: true,
          promo_code: params.promo_code,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        };
      } else {
        filter = { deleted: false, promo_code: params.promo_code, isPaid: true };
      }

      const limit = "0";
      const page = "1";

      const orders = await order_db.findAll_orders_db(filter, sort, limit, page);

      const number_of_uses = orders
        .filter((order: any) => order.promo_code)
        .filter((order: any) => order.promo_code.toLowerCase() === params.promo_code.toLowerCase()).length;
      const revenue = orders
        .filter((order: any) => order.promo_code)
        .filter((order: any) => order.promo_code.toLowerCase() === params.promo_code.toLowerCase())
        .reduce(
          (a: any, order: any) =>
            a +
            order.totalPrice -
            order.taxPrice -
            (order.payment.refund ? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100 : 0),
          0
        )
        .toFixed(2);

      return { number_of_uses, revenue };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  tax_rates_orders_s: async () => {
    try {
      const updatedSalesTaxes = "http://www.salestaxinstitute.com/resources/rates";
      const result: any = {};

      const tableData = await scraper.get(updatedSalesTaxes);

      const tempData = tableData[1];
      tempData.map((state: any) => {
        const percentage = state["State Rate"];
        result[state["State"]] = percentage.slice(0, percentage.indexOf("%") + 1);
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  all_affiliate_code_usage_orders_s: async (params: any, query: any) => {
    try {
      const sort = {};

      let o_filter = {};

      if (params.month && params.month.length > 0) {
        const start_date = month_dates(params.month, params.year).start_date;
        const end_date = month_dates(params.month, params.year).end_date;
        o_filter = {
          deleted: false,
          isPaid: true,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        };
      } else if (params.year && params.year.length > 0) {
        const start_date = params.year + "-01-01";
        const end_date = params.year + "-12-31";
        o_filter = {
          deleted: false,
          isPaid: true,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        };
      } else {
        o_filter = { deleted: false, isPaid: true };
      }

      let a_filter: any = { deleted: false, active: true };
      if (query.position === "promoter") {
        a_filter = { deleted: false, active: true, promoter: true };
      } else if (query.position === "sponsor") {
        a_filter = { deleted: false, active: true, sponsor: true };
      }

      // const o_filter = determine_o_filter(query, {});
      const limit = "0";
      const page = "1";

      const orders = await order_db.findAll_orders_db(o_filter, sort, limit, page);
      let affiliates = await affiliate_db.findAll_affiliates_db(a_filter, {}, "0", "1");
      if (!query.position) {
        affiliates = [...affiliates, { public_code: { promo_code: "inkybois" } }];
      }

      const affiliate_earnings_dups: any = affiliates.map((affiliate: any) => {
        const code_usage = orders.filter((order: any) => {
          return order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase();
        }).length;
        return {
          "Promo Code": toCapitalize(affiliate.public_code.promo_code),
          Uses: code_usage,
          Revenue: `${
            orders &&
            orders
              .filter((order: any) => order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase())
              .reduce(
                (a: any, order: any) =>
                  a +
                  order.totalPrice -
                  order.taxPrice -
                  (order.payment.refund ? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100 : 0),
                0
              )
              .toFixed(2)
          }`,
          Earned: affiliate.promoter
            ? orders &&
              orders
                .filter(
                  (order: any) => order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
                )
                .reduce(
                  (a: any, order: any) =>
                    a +
                    (order.totalPrice -
                      order.taxPrice -
                      (order.payment.refund ? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100 : 0)) *
                      0.1,
                  0
                )
                .toFixed(2)
            : orders &&
              orders
                .filter(
                  (order: any) => order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
                )
                .reduce(
                  (a: any, order: any) =>
                    a +
                    (order.totalPrice -
                      order.taxPrice -
                      (order.payment.refund ? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100 : 0)) *
                      0.15,
                  0
                )
                .toFixed(2),
          "Percentage Off":
            !affiliate.team && affiliate.promoter
              ? `${determine_promoter_code_tier(code_usage)}%`
              : `${determine_sponsor_code_tier(code_usage)}%`
        };
      });
      //
      // const sorted_by_uses = affiliate_earnings_dups.sort(
      // 	(a: any, b: any) => (parseFloat(a.Uses) > parseFloat(b.Uses) ? -1 : 1)
      // );
      // const sorted_by_earned = affiliate_earnings_dups.sort(
      // 	(a: any, b: any) => (parseFloat(a.Earned) > parseFloat(b.Earned) ? -1 : 1)
      // );
      // const sorted_by_revenue = affiliate_earnings_dups.sort(
      // 	(a: any, b: any) => (parseFloat(a.Revenue) > parseFloat(b.Revenue) ? -1 : 1)
      // );
      // const affiliate_s_earned: any = removeDuplicates(sorted_by_earned, 'Promo Code');
      // const uses_s_earned: any = affiliate_s_earned.reduce((a: any, affiliate: any) => a + affiliate.Uses, 0);
      // const revenue_s_earned: any = affiliate_s_earned.reduce(
      // 	(a: any, affiliate: any) => parseFloat(a) + parseFloat(affiliate.Revenue),
      // 	0
      // );
      // const earned_s_earned: any = affiliate_s_earned.reduce(
      // 	(a: any, affiliate: any) => parseFloat(a) + parseFloat(affiliate.Earned),
      // 	0
      // );
      const affiliate_s: any = removeDuplicates(affiliate_earnings_dups, "Promo Code");
      const uses_s: any = affiliate_s.reduce((a: any, affiliate: any) => a + affiliate.Uses, 0);
      const revenue_s: any = affiliate_s.reduce((a: any, affiliate: any) => parseFloat(a) + parseFloat(affiliate.Revenue), 0);
      const earned_s: any = affiliate_s.reduce((a: any, affiliate: any) => parseFloat(a) + parseFloat(affiliate.Earned), 0);
      // const affiliate_s_uses: any = removeDuplicates(sorted_by_uses, 'Promo Code');
      // const uses_s_uses: any = affiliate_s_uses.reduce((a: any, affiliate: any) => a + affiliate.Uses, 0);
      // const revenue_s_uses: any = affiliate_s_uses.reduce(
      // 	(a: any, affiliate: any) => parseFloat(a) + parseFloat(affiliate.Revenue),
      // 	0
      // );
      // const earned_s_uses: any = affiliate_s_uses.reduce(
      // 	(a: any, affiliate: any) => parseFloat(a) + parseFloat(affiliate.Earned),
      // 	0
      // );
      //

      // return { affiliate_earnings, uses, revenue, earned };

      return {
        affiliates: affiliate_s,
        uses: uses_s,
        revenue: revenue_s,
        earned: earned_s
      };
      // return 'Success';
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  promo_code_usage_orders_s: async (params: any, query: any) => {
    try {
      const sort = {};

      let o_filter = {};

      if (params.month && params.month.length > 0) {
        const start_date = month_dates(params.month, params.year).start_date;
        const end_date = month_dates(params.month, params.year).end_date;
        o_filter = {
          deleted: false,
          isPaid: true,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        };
      } else if (params.year && params.year.length > 0) {
        const start_date = params.year + "-01-01";
        const end_date = params.year + "-12-31";
        o_filter = {
          deleted: false,
          isPaid: true,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        };
      } else {
        o_filter = { deleted: false, isPaid: true };
      }

      const p_filter = determine_filter(query, {});

      const limit = "0";
      const page = "1";
      const orders = await order_db.findAll_orders_db(o_filter, sort, limit, page);
      const promos = await promo_db.findAll_promos_db(p_filter, {}, "0", "1");
      //
      const promos_earnings: any = promos.map((code: any) => {
        return {
          "Promo Code": toCapitalize(code.promo_code),
          Uses: orders.filter((order: any) => {
            return order.promo_code && order.promo_code.toLowerCase() === code.promo_code.toLowerCase();
          }).length,
          Revenue: orders
            .filter((order: any) => order.promo_code && order.promo_code.toLowerCase() === code.promo_code.toLowerCase())
            .reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
            .toFixed(2),
          Discount: orders
            .filter((order: any) => order.promo_code && order.promo_code.toLowerCase() === code.promo_code.toLowerCase())
            .reduce((a: any, order: any) => a + ((order.totalPrice - order.taxPrice) * code.percentage_off) / 100, 0)
            .toFixed(2)
        };
      });
      const uses_s: any = promos_earnings.reduce((a: any, promo: any) => a + promo.Uses, 0);
      const revenue_s: any = promos_earnings.reduce((a: any, promo: any) => parseFloat(a) + parseFloat(promo.Revenue), 0);
      const discount_s: any = promos_earnings.reduce((a: any, promo: any) => parseFloat(a) + parseFloat(promo.Discount), 0);
      return {
        promos: promos_earnings,
        uses: uses_s,
        revenue: revenue_s,
        discount: discount_s
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  each_day_income_orders_s: async (params: any) => {
    try {
      const date = params.date;

      const sort = {};
      const filter = {
        deleted: false,
        createdAt: {
          $gt: new Date(<any>new Date(date).setHours(0, 0, 0)),
          $lt: new Date(<any>new Date(date).setHours(23, 59, 59))
        }
      };
      const limit = "50";
      const page = "1";
      return await order_db.findAll_orders_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  each_month_income_orders_s: async (params: any) => {
    try {
      const start_date = params.date;
      const year = start_date.split("-")[0];
      const month = start_date.split("-")[1];
      const day = dates_in_year[parseInt(start_date.split("-")[1]) - 1].number_of_days;
      const end_date = year + "-" + month + "-" + day;
      const sort = {};
      const filter = {
        deleted: false,
        createdAt: {
          $gt: new Date(<any>new Date(start_date).setHours(0, 0, 0) - 30 * 60 * 60 * 24 * 1000),
          $lt: new Date(<any>new Date(end_date).setHours(23, 59, 59))
        }
      };
      const limit = "50";
      const page = "1";
      return await order_db.findAll_orders_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  previous_income_orders_s: async (params: any) => {
    try {
      const sort = {};
      const filter = {
        deleted: false,
        createdAt: {
          $gte: new Date(<any>new Date() - params.days * 60 * 60 * 24 * 1000)
        }
      };
      const limit = "50";
      const page = "1";
      return await order_db.findAll_orders_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  mark_as_shipped_orders_s: async (body: any) => {
    try {
      const sort = {};
      const filter = {
        deleted: false,
        isManufactured: true,
        isPackaged: true,
        isShipped: false,
        isDelivered: false
      };
      const limit = "0";
      const page = "1";
      return await order_db.findAll_orders_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  eligible_for_review_orders_s: async (body: any) => {
    try {
      const sort = {};
      const filter = {
        deleted: false,
        ...body
      };
      const limit = "0";
      const page = "1";
      return await order_db.findAll_orders_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  income_orders_s: async (params: any) => {
    // const { month, year } = params;
    const o_filter: any = {
      deleted: false,
      isPaid: true
    };
    const e_filter: any = {
      deleted: false
    };

    if (params.year) {
      const createdAt = {
        $gte: new Date(params.year + "-01-01"),
        $lte: new Date(params.year + "-12-31")
      };
      o_filter.createdAt = createdAt;
      e_filter.date_of_purchase = createdAt;
    }
    if (params.month) {
      const createdAt = {
        $gte: new Date(month_dates(params.month, params.year).start_date),
        $lte: new Date(month_dates(params.month, params.year).end_date)
      };
      o_filter.createdAt = createdAt;
      e_filter.date_of_purchase = createdAt;
    }
    try {
      const sort = {};

      const limit = "0";
      const page = "1";

      const orders_data = await order_db.findAll_orders_db(o_filter, sort, limit, page);
      const expenses_data = await expense_db.findAll_expenses_db(e_filter, sort, "0", "1");
      const income = orders_data.reduce(
        (a: any, c: any) =>
          a + c.totalPrice - c.taxPrice - (c.refundAmmount ? c.refundAmmount.reduce((a: any, c: any) => a + c, 0) / 100 : 0),
        0
      );
      const expenses = expenses_data.reduce((a: any, c: any) => a + c.amount, 0);
      const category_income = categories.map((category, index) => {
        return {
          category: category,
          income: orders_data
            .map((order: any) => order.orderItems)
            .flat(1)
            .filter((item: any) => item.category === category)
            .flat(1)
            .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0)
        };
      });
      const subcategory_income = subcategories.map((subcategory, index) => {
        return {
          subcategory: subcategory,
          income: orders_data
            .map((order: any) => order.orderItems)
            .flat(1)
            .filter((item: any) => item.subcategory === subcategory)
            .flat(1)
            .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0)
        };
      });
      const category_expenses = ["Supplies", "Entertainment", "Website", "Shipping", "Equipment"].map((category, index) => {
        return {
          category: category,
          expense: expenses_data
            .filter((expense: any) => expense.category === category)
            .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.amount), 0)
        };
      });

      const batt_1620 = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.name === "Bulk CR1620 Batteries");
      const batt_1616 = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.name === "Bulk CR1616 Batteries");
      const batt_1225 = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.name === "Bulk CR1225 Batteries");
      const batt_1620_options = batt_1620
        .filter((item: any) => item.product_option)
        .reduce((a: any, c: any) => a + c.product_option.size, 0);
      const batt_1616_options = batt_1616
        .filter((item: any) => item.product_option)
        .reduce((a: any, c: any) => a + c.product_option.size, 0);
      const batt_1225_options = batt_1225
        .filter((item: any) => item.product_option)
        .reduce((a: any, c: any) => a + c.product_option.size, 0);
      const batt_1620_size = batt_1620.filter((item: any) => item.size > 0).reduce((a: any, c: any) => parseInt(a) + parseInt(c.size), 0);
      const batt_1616_size = batt_1616.filter((item: any) => item.size > 0).reduce((a: any, c: any) => parseInt(a) + parseInt(c.size), 0);
      const batt_1225_size = batt_1225.filter((item: any) => item.size > 0).reduce((a: any, c: any) => parseInt(a) + parseInt(c.size), 0);
      const batt_1620_options_total = batt_1620
        .filter((item: any) => item.product_option)
        .reduce((a: any, c: any) => a + c.product_option.price, 0);
      const batt_1616_options_total = batt_1616
        .filter((item: any) => item.product_option)
        .reduce((a: any, c: any) => a + c.product_option.price, 0);
      const batt_1225_options_total = batt_1225
        .filter((item: any) => item.product_option)
        .reduce((a: any, c: any) => a + c.product_option.price, 0);
      const batt_1620_size_total = batt_1620
        .filter((item: any) => item.size > 0)
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const batt_1616_size_total = batt_1616
        .filter((item: any) => item.size > 0)
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const batt_1225_size_total = batt_1225
        .filter((item: any) => item.size > 0)
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);

      const decals = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.category === "decals");
      const decals_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.category === "decals")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const gloves = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles");
      const s_gloves = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - S");
      const m_gloves = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - M");
      const l_gloves = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - L");
      const xl_gloves = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - XL");
      const refresh = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh");
      const s_refresh = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - S");
      const m_refresh = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - M");
      const l_refresh = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - L");
      const xl_refresh = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - XL");
      const gloves_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.category === "gloves")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const singles_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const refresh_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const s_singles_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - S")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const m_singles_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - M")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const l_singles_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - L")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const xl_singles_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "singles" && item.option_product_name === "Supreme Gloves - XL")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const s_refresh_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - S")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const m_refresh_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - M")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const l_refresh_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - L")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const xl_refresh_total = orders_data
        .map((order: any) => order.orderItems)
        .flat(1)
        .filter((item: any) => item.subcategory === "refresh" && item.option_product_name === "Supreme Gloves - XL")
        .reduce((a: any, c: any) => parseFloat(a) + parseFloat(c.price), 0);
      const breakdown = {
        macro_income: {
          income,
          expenses,
          profit: income + expenses,
          category_income,
          subcategory_income,
          category_expenses
        },
        batteries: {
          batt_1620_qty_sold: batt_1620_options + batt_1620_size,
          batt_1616_qty_sold: batt_1616_options + batt_1616_size,
          batt_1225_qty_sold: batt_1225_options + batt_1225_size,
          batt_1620_total_income: batt_1620_options_total + batt_1620_size_total,
          batt_1616_total_income: batt_1616_options_total + batt_1616_size_total,
          batt_1225_total_income: batt_1225_options_total + batt_1225_size_total,
          batt_1620_total_expenses: -(batt_1620_options + batt_1620_size) * 0.0632,
          batt_1616_total_expenses: -(batt_1616_options + batt_1616_size) * 0.0632,
          batt_1225_total_expenses: -(batt_1225_options + batt_1225_size) * 0.0632,
          batt_1620_profit: batt_1620_options_total + batt_1620_size_total - (batt_1620_options + batt_1620_size) * 0.0632,
          batt_1616_profit: batt_1616_options_total + batt_1616_size_total - (batt_1616_options + batt_1616_size) * 0.0632,
          batt_1225_profit: batt_1225_options_total + batt_1225_size_total - (batt_1225_options + batt_1225_size) * 0.0632,

          refresh_qty_sold: refresh.length,
          total_qty_sold: batt_1620_options + batt_1620_size + batt_1616_options + batt_1616_size + batt_1225_options + batt_1225_size,
          total_expenses:
            -(batt_1620_options + batt_1620_size + batt_1616_options + batt_1616_size + batt_1225_options + batt_1225_size) * 0.0632,
          total_profit:
            batt_1620_options_total +
            batt_1620_size_total +
            batt_1616_options_total +
            batt_1616_size_total +
            batt_1225_options_total +
            batt_1225_size_total -
            (batt_1620_options + batt_1620_size + batt_1616_options + batt_1616_size + batt_1225_options + batt_1225_size) * 0.0632,
          total_income:
            batt_1620_options_total +
            batt_1620_size_total +
            batt_1616_options_total +
            batt_1616_size_total +
            batt_1225_options_total +
            batt_1225_size_total
        },
        decals: {
          qty_sold: decals.length * 11,
          sets: decals.length,
          total_income: decals_total
        },
        gloves: {
          singles_qty_sold: gloves.length,
          s_qty_sold: s_gloves.length,
          m_qty_sold: m_gloves.length,
          l_qty_sold: l_gloves.length,
          xl_qty_sold: xl_gloves.length,
          s_total_income: s_singles_total,
          m_total_income: m_singles_total,
          l_total_income: l_singles_total,
          xl_total_income: xl_singles_total,
          s_total_expenses: -s_gloves.length * 0.7,
          m_total_expenses: -m_gloves.length * 0.7,
          l_total_expenses: -l_gloves.length * 0.7,
          xl_total_expenses: -xl_gloves.length * 0.7,
          s_total_profit: s_gloves.length * 3.95 - s_gloves.length * 0.7,
          m_total_profit: m_gloves.length * 3.95 - m_gloves.length * 0.7,
          l_total_profit: l_gloves.length * 3.95 - l_gloves.length * 0.7,
          xl_total_profit: xl_gloves.length * 3.95 - xl_gloves.length * 0.7,
          refresh_qty_sold: refresh.length,
          total_expenses: -gloves.length * 0.7,
          total_profit: singles_total - gloves.length * 0.7,
          total_qty_sold: gloves.length,
          total_income: singles_total
        },
        refresh_packs: {
          s_qty_sold: s_refresh.length * 6,
          m_qty_sold: m_refresh.length * 6,
          l_qty_sold: l_refresh.length * 6,
          xl_qty_sold: xl_refresh.length * 6,
          s_total_income: s_refresh_total,
          m_total_income: m_refresh_total,
          l_total_income: l_refresh_total,
          xl_total_income: xl_refresh_total,
          s_total_expenses: -s_refresh.length * 6 * 0.7,
          m_total_expenses: -m_refresh.length * 6 * 0.7,
          l_total_expenses: -l_refresh.length * 6 * 0.7,
          xl_total_expenses: -xl_refresh.length * 6 * 0.7,
          s_total_profit: s_refresh.length * 6 * 3.95 - s_refresh.length * 6 * 0.7,
          m_total_profit: m_refresh.length * 6 * 3.95 - m_refresh.length * 6 * 0.7,
          l_total_profit: l_refresh.length * 6 * 3.95 - l_refresh.length * 6 * 0.7,
          xl_total_profit: xl_refresh.length * 6 * 3.95 - xl_refresh.length * 6 * 0.7,
          refresh_qty_sold: refresh.length,
          total_expenses: -(refresh.length * 6) * 0.7,
          total_profit: refresh_total - refresh.length * 6 * 0.7,
          total_qty_sold: refresh.length * 6,
          total_income: refresh_total
        },
        total_gloves: {
          singles_qty_sold: gloves.length,
          s_qty_sold: s_gloves.length + s_refresh.length * 6,
          m_qty_sold: m_gloves.length + m_refresh.length * 6,
          l_qty_sold: l_gloves.length + l_refresh.length * 6,
          xl_qty_sold: xl_gloves.length + xl_refresh.length * 6,
          s_total_income: s_singles_total + s_refresh_total,
          m_total_income: m_singles_total + m_refresh_total,
          l_total_income: l_singles_total + l_refresh_total,
          xl_total_income: xl_singles_total + xl_refresh_total,
          s_total_expenses: -(s_gloves.length + s_refresh.length * 6) * 0.7,
          m_total_expenses: -(m_gloves.length + m_refresh.length * 6) * 0.7,
          l_total_expenses: -(l_gloves.length + l_refresh.length * 6) * 0.7,
          xl_total_expenses: -(xl_gloves.length + xl_refresh.length * 6) * 0.7,
          s_total_profit: (s_gloves.length + s_refresh.length * 6) * 3.95 - (s_gloves.length + s_refresh.length * 6) * 0.7,
          m_total_profit: (m_gloves.length + m_refresh.length * 6) * 3.95 - (m_gloves.length + m_refresh.length * 6) * 0.7,
          l_total_profit: (l_gloves.length + l_refresh.length * 6) * 3.95 - (l_gloves.length + l_refresh.length * 6) * 0.7,
          xl_total_profit: (xl_gloves.length + xl_refresh.length * 6) * 3.95 - (xl_gloves.length + xl_refresh.length * 6) * 0.7,
          refresh_qty_sold: refresh.length,
          total_expenses: -(gloves.length + refresh.length * 6) * 0.7,
          total_profit: gloves_total - (gloves.length + refresh.length * 6) * 0.7,
          total_qty_sold: gloves.length + refresh.length * 6,
          total_income: gloves_total
        }
      };

      return breakdown;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_product_quantities_orders_s: async () => {
    try {
      return await order_db.get_product_quantities_orders_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_shipping_orders_s: async () => {
    try {
      return await order_db.get_all_shipping_orders_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_revenue_orders_s: async () => {
    try {
      return await order_db.get_all_time_revenue_orders_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_product_all_time_revenue_orders_s: async (params: { id: string }) => {
    try {
      return await order_db.get_product_all_time_revenue_orders_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_product_range_revenue_orders_s: async (params: { id: string }, query: { start_date: string; end_date: string }) => {
    try {
      const { start_date, end_date } = query;
      return await order_db.get_product_range_revenue_orders_db(params.id, start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_revenue_orders_s: async (query: { start_date: string; end_date: string }) => {
    try {
      const { start_date, end_date } = query;
      return await order_db.get_range_revenue_orders_db(start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_daily_revenue_orders_s: async (query: { start_date: string; end_date: string }) => {
    try {
      const { start_date, end_date } = query;
      return await order_db.get_daily_revenue_orders_db(start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_monthly_revenue_orders_s: async (query: { year: string }) => {
    const { year } = query;
    try {
      return await order_db.get_monthly_revenue_orders_db(year);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_yearly_revenue_orders_s: async () => {
    try {
      return await order_db.get_yearly_revenue_orders_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_category_revenue_orders_s: async (query: { start_date: string; end_date: string }) => {
    try {
      const { start_date, end_date } = query;
      return await order_db.get_range_category_revenue_orders_db(start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_category_revenue_orders_s: async () => {
    try {
      return await order_db.get_all_time_category_revenue_orders_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_tips_revenue_orders_s: async () => {
    try {
      return await order_db.get_all_time_tips_revenue_orders_db();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_tips_reveune_orders_s: async (query: { start_date: string; end_date: string }) => {
    try {
      const { start_date, end_date } = query;
      return await order_db.get_range_tips_revenue_orders_db(start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_affiliate_earnings_code_usage_orders_s: async (query: { start_date: string; end_date: string }) => {
    try {
      const { start_date, end_date } = query;
      return await order_db.get_range_affiliate_earnings_code_usage_orders_db(start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
