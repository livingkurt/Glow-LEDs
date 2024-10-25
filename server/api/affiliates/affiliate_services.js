import { determine_filter, make_private_code, snake_case } from "../../utils/util.js";
import affiliate_db from "./affiliate_db.js";
import { user_db } from "../users.js";
import Affiliate from "./affiliate.js";
import { generateSponsorCodes } from "../promos/promo_interactors.js";
import {
  createPrivatePromoCode,
  createPublicPromoCode,
  monthToNum,
  normalizeAffiliateSearch,
} from "./affiliate_helpers.js";
import { createStripeAccountLink } from "./affiliate_interactors.js";
import { getFilteredData } from "../api_helpers.js";
import { Cart } from "../carts/cart.js";
import bcrypt from "bcryptjs";

export default {
  findAll_affiliates_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            artist_name: {
              $regex: query.search,
              $options: "i",
            },
          }
        : {};
      const filter = determine_filter(query, search);

      const sort_query = query.sort && query.sort.toLowerCase();
      let sort = { _id: -1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "sponsor") {
        sort = { sponsor: -1 };
      } else if (sort_query === "promoter") {
        sort = { promoter: -1 };
      } else if (sort_query === "active") {
        sort = { active: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }
      const affiliates = await affiliate_db.findAll_affiliates_db(filter, sort, limit, page);
      return affiliates;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_affiliates_s: async query => {
    try {
      const sort_options = ["active", "artist_name", "percentage_off"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "artist_name",
        normalizeSearch: normalizeAffiliateSearch,
      });
      console.log({ query, filter, sort, limit, page });
      const affiliates = await affiliate_db.findAll_affiliates_db(filter, sort, limit, page);
      const count = await affiliate_db.count_affiliates_db(filter);
      return {
        data: affiliates,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_affiliates_s: async params => {
    try {
      return await affiliate_db.findByPathname_affiliates_db(params.pathname);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_affiliates_s: async params => {
    try {
      return await affiliate_db.findById_affiliates_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_affiliates_s: async body => {
    const { user, promo_code_name, artist_name } = body;

    const public_code = createPublicPromoCode(promo_code_name || artist_name);
    const private_code = createPrivatePromoCode(user);
    try {
      const newAffiliate = await affiliate_db.create_affiliates_db(body, public_code, private_code);
      if (newAffiliate) {
        const accountLink = await createStripeAccountLink();
        return { newAffiliate, accountLink };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  sponsor_monthly_checkin_affiliates_s: async (params, body) => {
    const { id } = params;
    const { questionsConcerns, numberOfContent, month, year } = body;

    // Get previous month and year
    const prevDate = new Date();
    prevDate.setMonth(prevDate.getMonth() - 1);
    const prevMonth = prevDate.toLocaleString("default", { month: "long" });
    const prevYear = prevDate.getFullYear();

    try {
      // Prepare the check-in object
      const checkin = {
        month: month,
        year: year,
        questionsConcerns: questionsConcerns,
        numberOfContent,
        // add any additional fields here
      };

      const affiliate = await Affiliate.findOne({ _id: id, deleted: false });
      if (affiliate) {
        const existingCheckinIndex = affiliate.sponsorMonthlyCheckins.findIndex(
          checkin => checkin.month === month && checkin.year === year
        );

        if (existingCheckinIndex > -1) {
          // Update the existing checkin
          affiliate.sponsorMonthlyCheckins[existingCheckinIndex] = checkin;
        } else {
          // Find the correct position for the new checkin based on month and year
          const correctPosition = affiliate.sponsorMonthlyCheckins.findIndex(
            checkin =>
              new Date(`${checkin.year}-${monthToNum(checkin.month)}-01`) > new Date(`${year}-${monthToNum(month)}-01`)
          );

          // If correct position found, insert at that position, else push to the end
          if (correctPosition !== -1) {
            affiliate.sponsorMonthlyCheckins.splice(correctPosition, 0, checkin);
          } else {
            affiliate.sponsorMonthlyCheckins.push(checkin);
          }
          // If the check-in is for the previous month and year, generate sponsor codes
          if (month === prevMonth && year === prevYear) {
            console.log("Generating sponsor codes...");
            await generateSponsorCodes(affiliate);
          }
        }

        // Save the updated affiliate
        await affiliate.save();

        return affiliate;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  checkin_status_affiliates_s: async query => {
    const { start_date, end_date } = query;
    try {
      return await affiliate_db.checkin_status_affiliates_db(start_date, end_date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_affiliates_s: async (params, body) => {
    try {
      return await affiliate_db.update_affiliates_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_rave_mob_affiliates_affiliates_s: async (params, body) => {
    const { csv } = body;

    const rave_mobers = [];
    const properties = [
      "Timestamp",
      "Which 2022 festival(s) are you applying to?",
      "First and Last Name",
      "Glover Name",
      "Phone Number",
      "Email Address",
      "Home City",
      "T-Shirt Size",
      "Instagram Username",
      "Facebook Page Link",
      "TikTok Username",
      "Link to a recent lightshow if you are not able to upload one above",
      "How familiar are you with Glow LEDs products?",
      "What makes you want to be a part of the Glow LEDs Festival Gloving Team?",
      "I understand that being on the Festival Gloving Team has responsibilities. If selected, I will be required to participate in all Glow LEDs Festival meetups as well as promote the brand during my time at the festival. Promoting includes giving lightshows with Glow LEDs products and spreading information about the brand to other festival attendees verbally and with free stickers and business cards. You will also be required to take pictures and videos with the products while at the festival.",
    ];

    try {
      for (let line = 1; line < csv.length; line++) {
        const object = {};
        for (let i = 0; i < csv[line].length; i++) {
          object[properties[i]] = csv[line][i];
        }
        rave_mobers.push(object);
      }

      rave_mobers.forEach(async member => {
        const affiliate = {};
        const user = {};
        user.first_name = member["First and Last Name"].split(" ")[0];
        user.last_name = member["First and Last Name"].split(" ")[1];
        user.email = member["Email Address"].toLowerCase();
        user.promoter = true;
        user.password = config.TEMP_PASS;
        affiliate.artist_name = member["Glover Name"];
        affiliate.instagram_handle = member["Instagram Username"];
        affiliate.facebook_name = member["Facebook Page Link"];
        affiliate.tiktok = member["TikTok Username"];
        affiliate.location = member["Home City"];
        affiliate.rave_mob = true;
        affiliate.pathname = snake_case(member["Glover Name"]);

        const public_code = {
          promo_code: affiliate.artist_name.toLowerCase(),
          admin_only: false,
          affiliate_only: false,
          single_use: false,
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
        const private_code = {
          promo_code: make_private_code(6),
          admin_only: false,
          affiliate_only: true,
          single_use: false,
          used_once: false,
          excluded_categories: [],
          excluded_products: [],
          percentage_off: 20,
          free_shipping: false,
          time_limit: false,
          start_date: "2021-01-01",
          end_date: "2021-01-01",
          active: true,
        };

        const user_found = await user_db.findByEmail_users_db(user.email);

        if (user_found) {
          return await affiliate_db.create_affiliates_db(
            { ...affiliate, user: user_found._id },
            public_code,
            private_code
          );
        } else {
          try {
            let hashed_password = "";
            const temporary_password = config.TEMP_PASS;
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(temporary_password, salt, async (err, hash) => {
                if (err) throw err;
                hashed_password = hash;
                const user_w_password = { ...user, password: hashed_password };
                try {
                  const new_user = await user_db.create_users_db(user_w_password);

                  return await affiliate_db.create_affiliates_db(
                    { ...affiliate, user: new_user._id },
                    public_code,
                    private_code
                  );
                } catch (error) {
                  if (error instanceof Error) {
                    throw new Error(error.message);
                  }
                }
              });
            });
          } catch (error) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
          }
        }
      });

      return "Succes";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_affiliates_s: async params => {
    const { id } = params;
    try {
      return await affiliate_db.remove_affiliates_db(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  generate_sponsor_codes_affiliates_s: async params => {
    const { id } = params;
    try {
      const affiliate = await Affiliate.findOne({ _id: id, deleted: false });
      await generateSponsorCodes(affiliate);
      return affiliate;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_product_bundle_affiliates_s: async (params, body) => {
    const { id, cartId } = params;
    const { title, subtitle, short_description } = body;
    console.log({ params, body });
    try {
      const originalCart = await Cart.findById(cartId);
      console.log({ originalCart });
      if (!originalCart) {
        throw new Error("Cart not found");
      }

      const newCart = new Cart({
        ...originalCart.toObject(),
        _id: undefined,
        user: undefined,
        affiliate: id,
      });
      console.log({ newCart });
      const savedCart = await newCart.save();

      const newProductBundle = {
        title,
        subtitle,
        short_description,
        cart: savedCart._id,
      };
      console.log({ newProductBundle });

      const updatedAffiliate = await Affiliate.findByIdAndUpdate(
        id,
        { $push: { product_bundles: newProductBundle } },
        { new: true }
      );
      console.log({ updatedAffiliate });

      if (!updatedAffiliate) {
        throw new Error("Affiliate not found");
      }

      return updatedAffiliate;
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
