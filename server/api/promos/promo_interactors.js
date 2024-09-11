import { product_db } from "../products";
import { make_private_code } from "../../utils/util";
import promo_db from "./promo_db";
import { category_db } from "../categorys";
import { Affiliate } from "../affiliates";
import Promo from "./promo";
import { determineCartTotal } from "./promo_helpers";
import { cart_db } from "../carts";

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

export const validatePromoCode = async (promo_code, cart, current_user, shipping) => {
  console.log("Starting validatePromoCode function");
  const errors = { promo_code: [] };
  const isValid = true;
  try {
    const validCart = await cart_db.findById_carts_db(cart._id);
    const cartItems = validCart.cartItems;
    const itemsPrice = determineCartTotal(cartItems, current_user.isWholesaler);
    console.log("Cart total:", itemsPrice);

    // Check if promo_code exists in the database
    const promo = await promo_db.findByCode_promos_db(promo_code.toLowerCase());
    console.log("Found promo:", promo);
    if (!promo) {
      console.log("Promo code not found");
      return { isValid: false, errors: { promo_code: "Invalid promo code." } };
    }

    // Check if promo is active
    if (!promo.active) {
      console.log("Promo code is not active");
      return { isValid: false, errors: { promo_code: "This promo code is not active." } };
    }
    if (promo.time_limit) {
      console.log("Promo has time limit");
      // Check if promo has expired
      const now = new Date();
      if (promo.end_date && now > new Date(promo.end_date)) {
        console.log("Promo has expired");
        return { isValid: false, errors: { promo_code: "This promo code has expired." } };
      }

      // Check if promo is yet to start
      if (promo.start_date && now < new Date(promo.start_date)) {
        console.log("Promo not yet active");
        return { isValid: false, errors: { promo_code: "This promo code is not yet active." } };
      }
    }

    // Check if promo is admin_only and current_user is not admin
    if (promo.admin_only && !current_user.isAdmin) {
      console.log("Promo is admin-only and user is not admin");
      return { isValid: false, errors: { promo_code: "This promo code is restricted to admins." } };
    }

    // Check if promo is sponsor_only
    if (promo.sponsor_only) {
      console.log("Checking if user is a sponsor");
      const affiliate = await Affiliate.findOne({ user: current_user._id }).exec();
      if (!affiliate || !affiliate.sponsor) {
        console.log("User is not a sponsor");
        return { isValid: false, errors: { promo_code: "This promo code is restricted to sponsors." } };
      }
    }

    // Check if promo is affiliate_only and current_user is not an affiliate
    if (promo.affiliate_only && !current_user.is_affiliated) {
      console.log("Promo is affiliate-only and user is not an affiliate");
      return { isValid: false, errors: { promo_code: "This promo code is restricted to affiliates." } };
    }

    // Check if the promo is single_use and has been used
    if (promo.single_use && promo.used_once) {
      console.log("Promo is single-use and has been used");
      return { isValid: false, errors: { promo_code: "This promo code has already been used." } };
    }

    // Check if minimum_total is met
    if (promo.minimum_total > itemsPrice) {
      console.log("Minimum total not met");
      return { isValid: false, errors: { promo_code: `Minimum total of ${promo.minimum_total} is required.` } };
    }

    const affiliates = await Affiliate.find({ deleted: false, active: true }).populate("user").exec();
    console.log("Found affiliates:", affiliates.length);
    const affiliate = affiliates.find(affiliate => affiliate.public_code.toString() === promo._id.toString());
    console.log("Matching affiliate:", affiliate);

    if (affiliate && affiliate.user) {
      const affiliateEmail = affiliate.user.email ? affiliate.user.email.toLowerCase() : null;
      const currentEmail = current_user.email ? current_user.email.toLowerCase() : null;
      const affiliateFirstName = affiliate.user.first_name ? affiliate.user.first_name.toLowerCase() : null;
      const affiliateLastName = affiliate.user.last_name ? affiliate.user.last_name.toLowerCase() : null;
      const shippingFirstName = shipping.first_name ? shipping.first_name.toLowerCase() : null;
      const shippingLastName = shipping.last_name ? shipping.last_name.toLowerCase() : null;
      const shippingEmail = shipping.email ? shipping.email.toLowerCase() : null;

      console.log("Comparing user details with affiliate");
      if (Object.keys(current_user).length > 0) {
        if (currentEmail && affiliateEmail === currentEmail) {
          console.log("User email matches affiliate email");
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
        if (shippingFirstName === affiliateFirstName && shippingLastName === affiliateLastName) {
          console.log("Shipping name matches affiliate name");
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
      } else {
        if (shippingFirstName === affiliateFirstName && shippingLastName === affiliateLastName) {
          console.log("Shipping name matches affiliate name");
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
        if (shippingEmail && affiliateEmail === shippingEmail) {
          console.log("Shipping email matches affiliate email");
          return { isValid: false, errors: { promo_code: "You can't use your own public promo code." } };
        }
      }
    }
    console.log({
      cartItemsCategories: cartItems.map(item => item.category),
      requiredCategories: promo.requiredCategories,
    });

    if (promo.promotionType === "freeItem") {
      console.log("Promo type is freeItem");

      const eligibleItems = cartItems.filter(
        item =>
          promo.requiredCategories.includes(item.category) ||
          promo.requiredTags.some(tag => item.tags.map(tag => tag.pathname).includes(tag.pathname))
      );
      console.log("Eligible items:", eligibleItems.length);

      if (eligibleItems.length < promo.requiredQuantity) {
        console.log("Not enough eligible items");
        return {
          isValid: false,
          errors: {
            promo_code: `You need to add ${promo.requiredQuantity - eligibleItems.length} more eligible items to use this promotion.`,
          },
        };
      }

      const freeItemExists = cartItems.some(
        item =>
          item.category === promo.freeItemCategory ||
          promo.freeItemTags.some(tag => item.tags.map(tag => tag.pathname).includes(tag.pathname))
      );
      console.log("Free item exists:", freeItemExists);

      if (!freeItemExists) {
        console.log("No eligible free item in cart");
        return {
          isValid: false,
          errors: { promo_code: "Your cart doesn't contain an eligible free item for this promotion." },
        };
      }
    }

    // Check if the promo code has included products/categories and if cart contains them
    if (promo.included_products.length > 0 || promo.included_categories.length > 0) {
      console.log("Checking included products/categories");
      if (!containsIncludedItems(cartItems, promo.included_products, promo.included_categories)) {
        console.log("Cart does not contain included items");
        return { isValid: false, errors: { promo_code: "Cart does not contain included products or categories." } };
      }
    }

    // Check if the promo code has excluded products/categories and if cart contains only these
    if (promo.excluded_products.length > 0 || promo.excluded_categories.length > 0) {
      console.log("Checking excluded products/categories");
      if (containsOnlyExcludedItems(cartItems, promo.excluded_products, promo.excluded_categories)) {
        console.log("Cart contains only excluded items");
        return { isValid: false, errors: { promo_code: "Cart contains only excluded products or categories." } };
      }
    }

    console.log("Promo code is valid");
    return { isValid, errors, promo };
  } catch (error) {
    console.error("Error in validatePromoCode:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return { isValid, errors };
};
