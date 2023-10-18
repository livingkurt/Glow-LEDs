import { month_dates } from "../../util";
import { affiliate_db } from "../affiliates";
import { order_db } from "../orders";
import { paycheck_db } from "../paychecks";
import { team_db } from "../teams";
import { getFilteredData } from "../api_helpers";
import { normalizePaycheckFilters, normalizePaycheckSearch } from "./paycheck_interactors";
import { user_db } from "../users";

export default {
  get_table_paychecks_s: async query => {
    try {
      const sort_options = ["createdAt", "paid_at", "paid", "amount"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "affiliate",
        normalizeFilters: normalizePaycheckFilters,
        // normalizeSearch: normalizePaycheckSearch
      });
      const paychecks = await paycheck_db.findAll_paychecks_db(filter, sort, limit, page);
      const count = await paycheck_db.count_paychecks_db(filter);
      return {
        data: paychecks,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_user_table_paychecks_s: async query => {
    try {
      const sort_options = ["createdAt", "paid_at", "paid", "amount"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "affiliate",
        normalizeFilters: normalizePaycheckFilters,
        // normalizeSearch: normalizePaycheckSearch
      });
      const paychecks = await paycheck_db.findAll_paychecks_db(filter, sort, limit, page);
      const count = await paycheck_db.count_paychecks_db(filter);
      return {
        data: paychecks,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_paychecks_s: async query => {
    try {
      const sort_options = ["createdAt", "paid_at", "paid", "amount"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "affiliate",
        normalizeFilters: normalizePaycheckFilters,
        // normalizeSearch: normalizePaycheckSearch
      });
      const paychecks = await paycheck_db.findAll_paychecks_db(filter, sort, limit, page);
      const count = await paycheck_db.count_paychecks_db(filter);
      return {
        data: paychecks,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_paychecks_s: async query => {
    const affiliates = await affiliate_db.findAll_affiliates_db({ active: true }, {}, "0", "1");
    const users = await user_db.findAll_users_db({ is_employee: true }, {}, "0", "1");
    try {
      const availableFilters = {
        paid: [],
        affiliates: affiliates.map(affiliate => ({ display: affiliate.artist_name, value: affiliate._id })),
        // employees: users.map((user) => ({ display: `${user.first_name} ${user.last_name}`, value: user._id }))
      };
      const booleanFilters = {
        paid: {
          label: "Show Paid",
        },
      };
      return { availableFilters, booleanFilters };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_paychecks_s: async params => {
    try {
      return await paycheck_db.findById_paychecks_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_paychecks_s: async params => {
    try {
      return await paycheck_db.findMy_paychecks_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_paychecks_s: async body => {
    try {
      return await paycheck_db.create_paychecks_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_affiliate_paychecks_s: async params => {
    try {
      let a_filter = {};
      let o_filter = {};
      let t_filter = {};
      let discount = 0.1;
      if (params.position === "promoter") {
        a_filter = { deleted: false, active: true, promoter: true };
        discount = 0.1;
      } else if (params.position === "sponsor") {
        a_filter = { deleted: false, active: true, sponsor: true };
        discount = 0.15;
      }
      if (params.position === "team") {
        t_filter = { deleted: false, active: true, rave_mob: false };
        discount = 0.15;
      }
      if (params.month && params.month.length > 0) {
        const start_date = month_dates(params.month, params.year).start_date;
        const end_date = month_dates(params.month, params.year).end_date;
        o_filter = {
          deleted: false,
          isPaid: true,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        };
      } else if (params.year && params.year.length > 0) {
        const start_date = params.year + "-01-01";
        const end_date = params.year + "-12-31";
        o_filter = {
          deleted: false,
          isPaid: true,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        };
      } else {
        o_filter = { deleted: false, isPaid: true };
      }
      let affiliates = [];
      let teams = [];
      if (params.position !== "team") {
        affiliates = await affiliate_db.findAll_affiliates_db(a_filter, {}, "0", "1");
      } else {
        teams = await team_db.findAll_teams_db(t_filter, {}, "0", "1");
      }
      const orders = await order_db.findAll_orders_db(o_filter, {}, "0", "1");

      let paychecks = [];
      if (params.position !== "team") {
        paychecks = await Promise.all(
          affiliates.map(async affiliate => {
            return await paycheck_db.create_paychecks_db({
              affiliate: affiliate._id,
              amount: orders
                .filter(
                  order =>
                    order.promo_code &&
                    order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
                )
                .reduce(
                  (a, order) =>
                    a +
                    (order.totalPrice -
                      order.taxPrice -
                      (order.payment.refund ? order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 : 0)) *
                      discount,
                  0
                )
                .toFixed(2),
              venmo: affiliate.venmo,
              promo_code: affiliate.public_code.promo_code.toLowerCase(),
              revenue: orders
                .filter(
                  order =>
                    order.promo_code &&
                    order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
                )
                .reduce(
                  (a, order) =>
                    a +
                    (order.totalPrice -
                      order.taxPrice -
                      (order.payment.refund ? order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 : 0)),
                  0
                )
                .toFixed(2),
              uses: orders.filter(
                order =>
                  order.promo_code && order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
              ).length,
            });
          })
        );
      } else {
        paychecks = await Promise.all(
          teams.map(async team => {
            return await paycheck_db.create_paychecks_db({
              team: team._id,
              amount: orders
                .filter(order => order.promo_code && order.promo_code.toLowerCase() === team.promo_code)
                .reduce(
                  (a, order) =>
                    a +
                    (order.totalPrice -
                      order.taxPrice -
                      (order.payment.refund ? order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100 : 0)) *
                      discount,
                  0
                )
                .toFixed(2),
              venmo: team.venmo,
              promo_code: team.promo_code,
              revenue: orders
                .filter(order => order.promo_code && order.promo_code.toLowerCase() === team.promo_code)
                .reduce(
                  (a, order) =>
                    a +
                    (order.totalPrice -
                      order.taxPrice -
                      (order.refundAmmount ? order.refundAmmount.reduce((a, c) => a + c, 0) / 100 : 0)),
                  0
                )
                .toFixed(2),
              uses: orders.filter(order => order.promo_code && order.promo_code.toLowerCase() === team.promo_code)
                .length,
            });
          })
        );
      }

      return paychecks;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_paychecks_s: async (params, body) => {
    try {
      return await paycheck_db.update_paychecks_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_paychecks_s: async params => {
    try {
      return await paycheck_db.remove_paychecks_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_paychecks_s: async body => {
    try {
      return await paycheck_db.remove_multiple_paychecks_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
