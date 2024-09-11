import Content from "../contents/content";
import {
  determine_filter,
  determine_promoter_code_tier,
  determine_sponsor_code_tier,
  make_private_code,
  month_dates,
} from "../../utils/util";
import { Affiliate, affiliate_db } from "../affiliates";
import { getFilteredData } from "../api_helpers";
import { order_db } from "../orders";
import { Promo, promo_db } from "../promos";
import { containsIncludedItems, containsOnlyExcludedItems, determineCartTotal, extractCodes } from "./promo_helpers";
import {
  deactivateOldCodes,
  generateSponsorCodes,
  normalizePromoFilters,
  normalizePromoSearch,
  validatePromoCode,
} from "./promo_interactors";

export default {
  findAll_promos_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            facebook_name: {
              $regex: query.search,
              $options: "i",
            },
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();

      let sort = { _id: -1 };
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
      if (count !== undefined) {
        return {
          promos,
          totalPages: Math.ceil(count / parseInt(limit)),
          currentPage: page,
        };
      } else {
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllTable_promos_s: async query => {
    try {
      const sort_options = [
        "createdAt",
        "active",
        "promo_code",
        "percentage_off",
        "amount_off",
        "minimum_total",
        "free_shipping",
      ];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizePromoFilters,
        normalizeSearch: normalizePromoSearch,
      });
      const promos = await promo_db.findAll_promos_db(filter, sort, limit, page);
      const count = await promo_db.count_promos_db(filter);
      return {
        data: promos,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_promos_s: async query => {
    try {
      const availableFilters = {
        affiliate_only: [],
        sponsor_only: [],
        single_use: [],
        used: [],
        admin_only: [],
        active: [],
      };
      const booleanFilters = {
        affiliate_only: {
          label: "Affiliate Only",
        },
        sponsor_only: {
          label: "Sponsor Only",
        },
        single_use: {
          label: "Single Use",
        },
        used: {
          label: "Used",
        },
        admin_only: {
          label: "Admin Only",
        },
        active: {
          label: "Active",
        },
      };
      return { availableFilters, booleanFilters };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_promos_s: async params => {
    try {
      return await promo_db.findById_promos_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliateId_promos_s: async params => {
    try {
      const promos = await promo_db.findByAffiliateId_promos_db(params.affiliate_id);
      const { twentyFiveOffCode, refreshCode } = extractCodes(promos);
      return { twentyFiveOffCode, refreshCode };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByCode_promos_s: async params => {
    try {
      return await promo_db.findByCode_promos_db(params.promo_code);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_promos_s: async body => {
    try {
      return await promo_db.create_promos_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_one_time_use_code_promos_s: async body => {
    const private_code = {
      promo_code: make_private_code(6),
      admin_only: false,
      affiliate_only: false,
      single_use: true,
      used_once: false,
      excluded_categories: [],
      excluded_products: [],
      percentage_off: 10,
      free_shipping: false,
      time_limit: false,
      start_date: "2021-01-01",
      end_date: "2021-01-01",
      active: true,
    };

    try {
      return await promo_db.create_promos_db(private_code);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  refresh_sponsor_codes_promos_s: async () => {
    const affiliates = await affiliate_db.findAll_affiliates_db(
      { deleted: false, active: true, sponsor: true },
      {},
      "0",
      "1"
    );
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear();

    // const previousCheckin = affiliate?.sponsorMonthlyCheckins?.find(
    //   (checkin) => checkin.month === previousMonth && checkin.year === currentYear
    // );

    try {
      const sponsor_codes = await Promise.all(
        affiliates.map(async affiliate => {
          deactivateOldCodes(affiliate);
          //const previousMonth = date.toLocaleString("default", { month: "long" });
          const checkinCompleted = affiliate?.sponsorMonthlyCheckins?.find(
            checkin => checkin.month === currentMonth && checkin.year === currentYear
          );
          if (checkinCompleted) {
            return generateSponsorCodes(affiliate);
          }
        })
      );
      return sponsor_codes;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_promos_s: async (params, body) => {
    try {
      return await promo_db.update_promos_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_affiliate_codes_promos_s: async (params, query) => {
    try {
      let o_filter = {};
      if (params.month && params.month.length > 0) {
        const start_date = month_dates(params.month, params.year).start_date;
        const end_date = month_dates(params.month, params.year).end_date;
        o_filter = {
          deleted: false,
          status: { $nin: ["unpaid", "canceled"] },
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
          status: { $nin: ["unpaid", "canceled"] },
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        };
      } else {
        o_filter = { deleted: false, status: { $nin: ["unpaid", "canceled"] } };
      }
      let a_filter = { deleted: false, active: true };
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
        .filter(affiliate => !affiliate.deleted)
        .filter(affiliate => affiliate.active)
        .filter(affiliate => affiliate.private_code)
        .forEach(async affiliate => {
          const code_usage = orders.filter(
            order =>
              order.promo_code &&
              order.promo_code.toLowerCase() === affiliate.public_code.promo_code &&
              affiliate.public_code.promo_code.toLowerCase()
          ).length;
          const percentage_off =
            !affiliate.team && affiliate.promoter
              ? determine_promoter_code_tier(code_usage)
              : determine_sponsor_code_tier(code_usage);

          await promo_db.update_promos_db(affiliate.private_code._id, { percentage_off });
        });

      return "Success";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_code_used_promos_s: async (params, body) => {
    try {
      const promo = await promo_db.findByCode_promos_db(params.promo_code.toLowerCase());
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
  remove_promos_s: async params => {
    try {
      return await promo_db.remove_promos_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_promos_s: async body => {
    try {
      return await promo_db.remove_multiple_promos_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  validate_promo_code_promos_s: async (params, body) => {
    const { promo_code } = params;
    const { current_user, cartItems, shipping } = body;
    try {
      return await validatePromoCode(promo_code, current_user, cartItems, shipping);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  validate_current_promo_promos_s: async (params, body) => {
    const { cartItems, current_user, shipping } = body;
    try {
      const content = await Content.findOne({ active: true, deleted: false })
        .sort({ createdAt: -1 })
        .populate("current_promotions");

      if (!content || !content.current_promotions) {
        return [];
      }

      const validPromotions = [];
      const nonCombinablePromo = validPromotions.find(promo => !promo.can_be_combined);

      for (const promo of content.current_promotions) {
        const { isValid, errors } = await validate_promo_code_promos_s(
          { promo_code: promo.promo_code },
          { current_user, cartItems, shipping }
        );

        if (isValid) {
          if (!promo.can_be_combined && validPromotions.length > 0) {
            continue; // Skip this promo if it can't be combined and we already have valid promos
          }
          if (nonCombinablePromo && promo.can_be_combined) {
            continue; // Skip this promo if we already have a non-combinable promo
          }
          validPromotions.push(promo);
        }
      }

      return validPromotions;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
