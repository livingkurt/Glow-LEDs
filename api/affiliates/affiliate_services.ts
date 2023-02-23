import { determine_filter, make_private_code, snake_case } from "../../util";
import dotenv from "dotenv";
import { IAffiliate } from "../../types/affiliateTypes";
import { IUser } from "../../types/userTypes";
import affiliate_db from "./affiliate_db";
import { user_db } from "../users";
const bcrypt = require("bcryptjs");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

export default {
  findAll_affiliates_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const page: any = query.page ? query.page : 1;
      const limit: any = query.limit ? query.limit : 0;
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
      const count = await affiliate_db.count_affiliates_db(filter);
      return {
        affiliates,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_affiliates_s: async (params: { pathname: string }) => {
    try {
      return await affiliate_db.findByPathname_affiliates_db(params.pathname);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_affiliates_s: async (params: { id: string }) => {
    try {
      return await affiliate_db.findById_affiliates_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_affiliates_s: async (body: { artist_name: string; email: string; user: IUser }) => {
    const public_code = {
      promo_code: body.artist_name.toLowerCase(),
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
      active: true
    };
    const private_code = {
      promo_code: make_private_code(6),
      admin_only: false,
      affiliate_only: true,
      single_use: false,
      used_once: false,
      excluded_categories: [],
      excluded_products: [],
      percentage_off: 10,
      free_shipping: false,
      time_limit: false,
      start_date: "2021-01-01",
      end_date: "2021-01-01",
      active: true
    };
    try {
      return await affiliate_db.create_affiliates_db(body, public_code, private_code);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_affiliates_s: async (params: { pathname: string }, body: IAffiliate) => {
    try {
      return await affiliate_db.update_affiliates_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_rave_mob_affiliates_affiliates_s: async (params: any, body: any) => {
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
      "I understand that being on the Festival Gloving Team has responsibilities. If selected, I will be required to participate in all Glow LEDs Festival meetups as well as promote the brand during my time at the festival. Promoting includes giving lightshows with Glow LEDs products and spreading information about the brand to other festival attendees verbally and with free stickers and business cards. You will also be required to take pictures and videos with the products while at the festival."
    ];

    try {
      for (let line = 1; line < csv.length; line++) {
        const object: any = {};
        for (let i = 0; i < csv[line].length; i++) {
          object[properties[i]] = csv[line][i];
        }
        rave_mobers.push(object);
      }

      rave_mobers.forEach(async member => {
        const affiliate: any = {};
        const user: any = {};
        user.first_name = member["First and Last Name"].split(" ")[0];
        user.last_name = member["First and Last Name"].split(" ")[1];
        user.email = member["Email Address"].toLowerCase();
        user.promoter = true;
        user.password = process.env.TEMP_PASS;
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
          active: true
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
          active: true
        };

        const user_found = await user_db.findByEmail_users_db(user.email);

        if (user_found) {
          return await affiliate_db.create_affiliates_db({ ...affiliate, user: user_found._id }, public_code, private_code);
        } else {
          try {
            let hashed_password = "";
            const temporary_password = process.env.TEMP_PASS;
            bcrypt.genSalt(10, (err: any, salt: any) => {
              bcrypt.hash(temporary_password, salt, async (err: any, hash: any) => {
                if (err) throw err;
                hashed_password = hash;
                const user_w_password = { ...user, password: hashed_password };
                try {
                  const new_user: any = await user_db.create_users_db(user_w_password);

                  return await affiliate_db.create_affiliates_db({ ...affiliate, user: new_user._id }, public_code, private_code);
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
  remove_affiliates_s: async (params: { pathname: string }) => {
    try {
      return await affiliate_db.remove_affiliates_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
