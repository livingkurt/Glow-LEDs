import { product_db } from "../products";
import { make_private_code } from "../../utils/util";
import promo_db from "./promo_db";
import { category_db } from "../categorys";
import { Affiliate } from "../affiliates";
import Promo from "./promo";

export const normalizePromoFilters = input => {
  const output = {};
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

export const normalizePromoSearch = query => {
  const search = query.search
    ? {
        promo_code: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};

export const deactivateOldCodes = async affiliate => {
  try {
    const old_codes = await promo_db.findAll_promos_db({ affiliate: affiliate._id, active: true }, {}, "2", "1");
    await Promise.all(
      old_codes.map(async code => {
        await promo_db.update_promos_db(code.id, { active: false });
      })
    );
  } catch (err) {}
};

export const generateSponsorCodes = async affiliate => {
  try {
    const start_date = new Date();
    const next_date = new Date();
    const end_date = new Date(next_date.setMonth(next_date.getMonth() + 1));
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

    const refreshPackProducts = await product_db.findAll_products_db({ subcategory: "refresh" }, {}, "0", "0");

    const refreshPackProductIds = refreshPackProducts.map(product => product._id);

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
      active: true,
    };
    const refresh_private_code = {
      affiliate: affiliate._id,
      user: affiliate.user._id,
      promo_code: `r${make_private_code(5)}`,
      admin_only: false,
      sponsor_only: false,
      single_use: true,
      used_once: false,
      excluded_categories: [],
      included_products: refreshPackProductIds,
      percentage_off: 0,
      amount_off: 34.99,
      free_shipping: true,
      include: true,
      time_limit: true,
      start_date: start_date,
      end_date: end_date,
      active: true,
    };
    const refresh_pack_code = await promo_db.create_promos_db(refresh_private_code);
    const allowance_code = await promo_db.create_promos_db(private_code);
    return { refresh_pack_code, allowance_code };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const validatePromoCode = async (promo_code, cartItems, current_user, shipping) => {
  const errors = { promo_code: [] };
  const isValid = true;
  try {
    const itemsPrice = determineCartTotal(cartItems, current_user.isWholesaler);

    // Check if promo_code exists in the database
    const promo = await Promo.findOne({ promo_code: promo_code.toLowerCase(), deleted: false });
    if (!promo) {
      return { isValid: false, errors: { promo_code: "Invalid promo code." } };
    }

    // Check if promo is active
    if (!promo.active) {
      return { isValid: false, errors: { promo_code: "This promo code is not active." } };
    }
    if (promo.time_limit) {
      // Check if promo has expired
      const now = new Date();
      if (promo.end_date && now > new Date(promo.end_date)) {
        return { isValid: false, errors: { promo_code: "This promo code has expired." } };
      }

      // Check if promo is yet to start
      if (promo.start_date && now < new Date(promo.start_date)) {
        return { isValid: false, errors: { promo_code: "This promo code is not yet active." } };
      }
    }

    // Check if promo is admin_only and current_user is not admin
    if (promo.admin_only && !current_user.isAdmin) {
      return { isValid: false, errors: { promo_code: "This promo code is restricted to admins." } };
    }

    // Check if promo is sponsor_only
    if (promo.sponsor_only) {
      const affiliate = await Affiliate.findOne({ user: current_user._id }).exec();
      if (!affiliate || !affiliate.sponsor) {
        return { isValid: false, errors: { promo_code: "This promo code is restricted to sponsors." } };
      }
    }

    // Check if promo is affiliate_only and current_user is not an affiliate
    if (promo.affiliate_only && !current_user.is_affiliated) {
      return { isValid: false, errors: { promo_code: "This promo code is restricted to affiliates." } };
    }

    // Check if the promo is single_use and has been used
    if (promo.single_use && promo.used_once) {
      return { isValid: false, errors: { promo_code: "This promo code has already been used." } };
    }

    // Check if minimum_total is met
    if (promo.minimum_total > itemsPrice) {
      return { isValid: false, errors: { promo_code: `Minimum total of ${promo.minimum_total} is required.` } };
    }

    const affiliates = await Affiliate.find({ deleted: false, active: true }).populate("user").exec();
    const affiliate = affiliates.find(affiliate => affiliate.public_code.toString() === promo._id.toString());

    if (affiliate && affiliate.user) {
      const affiliateEmail = affiliate.user.email ? affiliate.user.email.toLowerCase() : null;
      const currentEmail = current_user.email ? current_user.email.toLowerCase() : null;
      const affiliateFirstName = affiliate.user.first_name ? affiliate.user.first_name.toLowerCase() : null;
      const affiliateLastName = affiliate.user.last_name ? affiliate.user.last_name.toLowerCase() : null;
      const shippingFirstName = shipping.first_name ? shipping.first_name.toLowerCase() : null;
      const shippingLastName = shipping.last_name ? shipping.last_name.toLowerCase() : null;
      const shippingEmail = shipping.email ? shipping.email.toLowerCase() : null;

      if (Object.keys(current_user).length > 0) {
        if (currentEmail && affiliateEmail === currentEmail) {
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
        if (shippingFirstName === affiliateFirstName && shippingLastName === affiliateLastName) {
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
      } else {
        if (shippingFirstName === affiliateFirstName && shippingLastName === affiliateLastName) {
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
        if (shippingEmail && affiliateEmail === shippingEmail) {
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
      }
    }

    if (promo.promotionType === "freeItem") {
      const eligibleItems = cartItems.filter(
        item =>
          promo.requiredCategories.includes(item.category) || promo.requiredTags.some(tag => item.tags.includes(tag))
      );

      if (eligibleItems.length < promo.requiredQuantity) {
        return {
          isValid: false,
          errors: {
            promo_code: `You need to add ${promo.requiredQuantity - eligibleItems.length} more eligible items to use this promotion.`,
          },
        };
      }

      const freeItemExists = cartItems.some(
        item => item.category === promo.freeItemCategory || promo.freeItemTags.some(tag => item.tags.includes(tag))
      );

      if (!freeItemExists) {
        return {
          isValid: false,
          errors: { promo_code: "Your cart doesn't contain an eligible free item for this promotion." },
        };
      }
    }

    // Check if the promo code has included products/categories and if cart contains them
    if (promo.included_products.length > 0 || promo.included_categories.length > 0) {
      if (!containsIncludedItems(cartItems, promo.included_products, promo.included_categories)) {
        return { isValid: false, errors: { promo_code: "Cart does not contain included products or categories." } };
      }
    }

    // Check if the promo code has excluded products/categories and if cart contains only these
    if (promo.excluded_products.length > 0 || promo.excluded_categories.length > 0) {
      if (containsOnlyExcludedItems(cartItems, promo.excluded_products, promo.excluded_categories)) {
        return { isValid: false, errors: { promo_code: "Cart contains only excluded products or categories." } };
      }
    }

    return { isValid, errors, promo };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return { isValid, errors };
};
