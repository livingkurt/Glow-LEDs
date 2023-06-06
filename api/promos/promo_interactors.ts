import { make_private_code } from "../../util";
import promo_db from "./promo_db";

export const normalizePromoFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    switch (key) {
      case "affiliate_only":
        if (!input.affiliate_only.includes(1)) {
          output["affiliate_only"] = false;
        }
        break;
      case "sponsor_only":
        if (!input.sponsor_only.includes(1)) {
          output["sponsor_only"] = false;
        }
        break;
      case "single_use":
        if (!input.single_use.includes(1)) {
          output["single_use"] = false;
        }
        break;
      case "used":
        if (!input.used.includes(1)) {
          output["used"] = false;
        }
        break;
      case "admin_only":
        if (!input.admin_only.includes(1)) {
          output["admin_only"] = false;
        }
        break;
      case "active":
        if (!input.active.includes(1)) {
          output["active"] = false;
        }
        break;

      default:
        break;
    }
  });
  return output;
};

export const normalizePromoSearch = (query: any) => {
  const search = query.search
    ? {
        promo_code: {
          $regex: query.search.toLowerCase(),
          $options: "i"
        }
      }
    : {};

  return search;
};

export const generateSponsorCodes = async (affiliate: any) => {
  try {
    const start_date = new Date();
    const next_date = new Date();
    const end_date = new Date(next_date.setMonth(next_date.getMonth() + 1));
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

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
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
