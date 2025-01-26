import { month_dates } from "../../utils/util.js";
import affiliate_db from "../affiliates/affiliate_db.js";
import order_db from "../orders/order_db.js";
import paycheck_db from "./paycheck_db.js";
import team_db from "../teams/team_db.js";
import { getFilteredData } from "../api_helpers.js";
import { normalizePaycheckFilters, normalizePaycheckSearch } from "./paycheck_interactors.js";
import user_db from "../users/user_db.js";
import mongoose from "mongoose";

export default {
  get_table_paychecks_s: async query => {
    try {
      const sort_options = ["paid_at", "paid", "amount"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "affiliate",
        normalizeFilters: normalizePaycheckFilters,
        normalizeSearch: normalizePaycheckSearch,
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
  get_affiliate_table_paychecks_s: async (query, params) => {
    try {
      const sort_options = ["createdAt", "affiliate.first_name", "totalPrice"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "shipping.first_name",
      });
      const affiliate_id = query.affiliate_id ? query.affiliate_id : "";
      const team_id = query.team_id ? query.team_id : "";
      if (affiliate_id.length > 0 && team_id.length === 0) {
        filter.affiliate = new mongoose.Types.ObjectId(affiliate_id);
      }
      if (team_id.length > 0) {
        filter.team = new mongoose.Types.ObjectId(team_id);
      }
      const paychecks = await paycheck_db.table_paychecks_db(filter, sort, limit, page);
      const count = await paycheck_db.count_paychecks_db(filter);
      return {
        data: paychecks,
        total_count: count,
        currentPage: parseInt(page, 10),
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
        // normalizeSearch: normalizePaycheckSearch,
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
      const paycheck = await paycheck_db.create_paychecks_db(body);
      return await paycheck_db.findById_paychecks_db(paycheck._id);
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
