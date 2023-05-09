import { determine_filter, determine_promoter_code_tier, determine_sponsor_code_tier, make_private_code, month_dates } from "../../util";
import { affiliate_db } from "../affiliates";
import { getFilteredData } from "../api_helpers";
import { order_db } from "../orders";
import { promo_db } from "../promos";
import { extractCodes } from "./promo_helpers";
import { normalizePromoFilters, normalizePromoSearch } from "./promo_interactors";

export default {
  findAll_promos_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            facebook_name: {
              $regex: query.search,
              $options: "i"
            }
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();

      let sort: any = { _id: -1 };
      if (sort_query === "admin only") {
        sort = { admin_only: -1 };
      } else if (sort_query === "affiliate only") {
        sort = { affiliate_only: -1 };
      } else if (sort_query === "active") {
        sort = { active: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }
      const promos = await promo_db.findAll_promos_db(filter, sort, limit, page);
      const count = await promo_db.count_promos_db(filter);
      return {
        promos,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllTable_promos_s: async (query: { page: string; search: string; sort: any; limit: string; filters: any }) => {
    try {
      const sort_options = ["createdAt", "active", "promo_code", "percentage_off", "amount_off", "minimum_total", "free_shipping"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizePromoFilters,
        normalizeSearch: normalizePromoSearch
      });
      const promos = await promo_db.findAll_promos_db(filter, sort, limit, page);
      const count = await promo_db.count_promos_db(filter);
      return {
        data: promos,
        total_count: count,
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_promos_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const availableFilters = {
        affiliate_only: [],
        sponsor_only: [],
        single_use: [],
        used: [],
        admin_only: [],
        active: []
      };
      const booleanFilters = {
        affiliate_only: {
          label: "Affiliate Only"
        },
        sponsor_only: {
          label: "Sponsor Only"
        },
        single_use: {
          label: "Single Use"
        },
        used: {
          label: "Used"
        },
        admin_only: {
          label: "Admin Only"
        },
        active: {
          label: "Active"
        }
      };
      return { availableFilters, booleanFilters };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_promos_s: async (params: any) => {
    try {
      return await promo_db.findById_promos_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliateId_promos_s: async (params: any) => {
    console.log({ affiliate_id: params.affiliate_id });
    try {
      const promos = await promo_db.findByAffiliateId_promos_db(params.affiliate_id);
      const { twentyFiveOffCode, refreshCode }: any = extractCodes(promos);
      return { twentyFiveOffCode, refreshCode };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByCode_promos_s: async (params: any) => {
    try {
      return await promo_db.findByCode_promos_db(params.promo_code);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_promos_s: async (body: any) => {
    try {
      return await promo_db.create_promos_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_one_time_use_code_promos_s: async (body: any) => {
    const private_code = {
      promo_code: make_private_code(6),
      admin_only: false,
      affiliate_only: false,
      single_use: true,
      used_once: false,
      excluded_categories: [],
      excluded_products: [],
      percentage_off: 10,
      free_shipping: true,
      time_limit: false,
      start_date: "2021-01-01",
      end_date: "2021-01-01",
      active: true
    };

    try {
      return await promo_db.create_promos_db(private_code);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  refresh_sponsor_codes_promos_s: async (body: any) => {
    const a_filter: any = { deleted: false, active: true, sponsor: true };
    const affiliates = await affiliate_db.findAll_affiliates_db(a_filter, {}, "0", "1");
    const start_date = new Date();
    const next_date = new Date();
    const end_date = new Date(next_date.setMonth(next_date.getMonth() + 1));
    try {
      const sponsor_codes = await Promise.all(
        affiliates.map(async (affiliate: any) => {
          const old_codes = await promo_db.findAll_promos_db({ affiliate: affiliate._id, active: true }, {}, "2", "1");
          await Promise.all(
            old_codes.map(async (code: any) => {
              await promo_db.update_promos_db(code.id, { active: false });
            })
          );
          const private_code = {
            promo_code: `${affiliate.artist_name[0].toLowerCase()}${make_private_code(5)}`,
            user: affiliate.user._id,
            admin_only: false,
            sponsor_only: false,
            single_use: true,
            used_once: false,
            excluded_categories: [],
            excluded_products: [],
            percentage_off: 0,
            amount_off: 25,
            free_shipping: true,
            affiliate: affiliate._id,
            time_limit: true,
            start_date: start_date,
            end_date: end_date,
            active: true
          };
          const refresh_private_code = {
            affiliate: affiliate._id,
            user: affiliate.user._id,
            promo_code: `r${make_private_code(5)}`,
            admin_only: false,
            sponsor_only: true,
            single_use: true,
            used_once: false,
            excluded_categories: [],
            included_products: ["61a9501f914391295a266c8b"],
            percentage_off: 0,
            amount_off: 34.99,
            free_shipping: true,
            include: true,
            time_limit: true,
            start_date: start_date,
            end_date: end_date,
            active: true
          };
          const refresh_pack_code: any = await promo_db.create_promos_db(refresh_private_code);
          const allowance_code: any = await promo_db.create_promos_db(private_code);
          return [...refresh_pack_code, ...allowance_code];
        })
      );
      return sponsor_codes;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_promos_s: async (params: any, body: any) => {
    try {
      return await promo_db.update_promos_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_affiliate_codes_promos_s: async (params: any, query: any) => {
    try {
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

      const limit = "0";
      const page = "1";
      const orders = await order_db.findAll_orders_db(o_filter, {}, limit, page);
      const affiliates = await affiliate_db.findAll_affiliates_db(a_filter, {}, "0", "1");

      affiliates
        .filter((affiliate: any) => !affiliate.deleted)
        .filter((affiliate: any) => affiliate.active)
        .filter((affiliate: any) => affiliate.private_code)
        .forEach(async (affiliate: any) => {
          const code_usage = orders.filter(
            (order: any) =>
              order.promo_code &&
              order.promo_code.toLowerCase() === affiliate.public_code.promo_code &&
              affiliate.public_code.promo_code.toLowerCase()
          ).length;
          const percentage_off =
            !affiliate.team && affiliate.promoter ? determine_promoter_code_tier(code_usage) : determine_sponsor_code_tier(code_usage);

          await promo_db.update_promos_db(affiliate.private_code._id, { percentage_off });
        });

      return "Success";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_code_used_promos_s: async (params: any, body: any) => {
    try {
      const promo: any = await promo_db.findByCode_promos_db(params.promo_code.toLowerCase());
      if (promo.single_use) {
        promo.used_once = true;

        if (promo) {
          try {
            const updatedPromo = await promo_db.update_promos_db(promo._id, promo);
            if (updatedPromo) {
              return updatedPromo;
            }
          } catch (error) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
          }
        } else {
          throw new Error("No Promo Code Found");
        }
      }
      return promo;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_promos_s: async (params: any) => {
    try {
      return await promo_db.remove_promos_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_promos_s: async (body: any) => {
    try {
      return await promo_db.remove_multiple_promos_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
