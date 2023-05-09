import { user_db } from "../users";
import { getFilteredData } from "../api_helpers";
import { normalizeUserFilters, normalizeUserSearch } from "./user_helpers";
import { getRefreshToken } from "./userInteractors";
import Token from "../tokens/token";
const bcrypt = require("bcryptjs");
require("dotenv");

export default {
  findAll_users_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const sort_options = ["createdAt", "first_name", "email", "is_guest", "is_affiliated"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizeUserFilters,
        normalizeSearch: normalizeUserSearch
      });

      const users = await user_db.findAll_users_db(filter, sort, limit, page);
      const count = await user_db.count_users_db(filter);
      return {
        data: users,
        total_count: count,
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_users_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const availableFilters = {
        affiliates: ["only_affiliated_users"],
        guests: ["only_guest_users"],
        employees: ["only_employees"],
        admins: ["only_admins"],
        wholesalers: ["only_wholesalers"]
      };
      const booleanFilters = {
        affiliates: {
          label: "Show Affiliates"
        },
        guests: {
          label: "Show Guests"
        },
        employees: {
          label: "Show Employees"
        },
        admins: {
          label: "Show Admins"
        },
        wholesalers: {
          label: "Show Wholesalers"
        }
      };
      return { availableFilters, booleanFilters };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_users_s: async (params: any) => {
    try {
      return await user_db.findById_users_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliateId_users_s: async (params: any) => {
    try {
      return await user_db.findByAffiliateId_users_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByEmail_users_s: async (params: any) => {
    try {
      return await user_db.findByEmail_users_db(params.email);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_users_s: async (body: any) => {
    try {
      let user: any = {};
      let response: any = {};
      let hashed_password = "";
      const temporary_password = process.env.TEMP_PASS;
      bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(temporary_password, salt, async (err: any, hash: any) => {
          if (err) throw err;
          hashed_password = hash;
          user = { ...body, password: hashed_password };
          response = await user_db.create_users_db(user);
        });
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_users_s: async (params: any, body: any) => {
    try {
      return await user_db.update_users_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_users_s: async (params: any) => {
    try {
      return await user_db.remove_users_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  register_users_s: async (body: any) => {
    const user: any = await user_db.findByEmail_users_db(body.email);
    if (user) {
      const isMatch = await bcrypt.compare(process.env.TEMP_PASS, user.password);
      if (isMatch) {
        return { user: user, matched: true };
      } else {
        throw new Error("User Already Exists");
      }
    } else {
      return {
        user: {
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          password: body.password,
          affiliate: body.affiliate,
          cart: body.cart,
          is_affiliated: body.is_affiliated,
          email_subscription: body.email_subscription,
          isAdmin: false,
          isVerified: true
        },
        matched: false
      };
    }
  },

  login_users_s: async (email: string, password: string) => {
    const user: any = await user_db.findByEmail_users_db(email);

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return {
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        affiliate: user.affiliate,
        email_subscription: user.email_subscription,
        is_affiliated: user.is_affiliated,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
        shipping: user.shipping,
        isWholesaler: user.isWholesaler,
        wholesaler: user.wholesaler,
        refresh_token: await getRefreshToken(user)
      };
    } else {
      throw new Error("Invalid Credentials");
    }
  },
  login_as_user_users_s: async (email: string) => {
    const user: any = await user_db.findByEmail_users_db(email);

    return {
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      affiliate: user.affiliate,
      email_subscription: user.email_subscription,
      is_affiliated: user.is_affiliated,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
      shipping: user.shipping,
      isWholesaler: user.isWholesaler,
      wholesaler: user.wholesaler,
      refresh_token: await getRefreshToken(user)
    };
  },
  refresh_login_users_s: async (email: string) => {
    const user: any = await user_db.findByEmail_users_db(email);

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const existingToken = await Token.findOne({ user: user._id });

    return {
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      affiliate: user.affiliate,
      email_subscription: user.email_subscription,
      is_affiliated: user.is_affiliated,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
      shipping: user.shipping,
      isWholesaler: user.isWholesaler,
      wholesaler: user.wholesaler,
      refresh_token: existingToken?.token
    };
  },

  check_password_s: async (params: any, body: any) => {
    try {
      const user = await user_db.findById_users_db(params.id);

      if (!user) {
        throw new Error("User Doesn't Exist");
      }
      const isMatch = await bcrypt.compare(body.current_password, user.password);

      const existingToken = await Token.findOne({ user: user._id });

      if (isMatch) {
        return {
          _id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          isAdmin: user.isAdmin,
          cart: user.cart,
          isVerified: user.isVerified,
          affiliate: user.affiliate,
          is_affiliated: user.is_affiliated,
          email_subscription: user.email_subscription,
          shipping: user.shipping,
          refresh_token: existingToken.token
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  validate_email_s: async (params: any, body: any) => {
    try {
      const user = await user_db.findByEmail_users_db(params.email);
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  // checkemail_users_s: async (req: any, res: any) => {
  // 	try {
  //
  // 		const user: any = await User.findOne({ email: req.body.email });
  //
  // 		if (user) {
  // 			return res.status(400).send({ message: 'User Already Exists' });
  // 		}
  // 		// res.json({ message: "User Already Exists" })
  // 		res.status(200).send({ message: 'No User Found' });
  // 	} catch (error) {
  //
  // 		res.send(error);
  // 	}
  // },
  // createadmin_users_s: async (req: any, res: any) => {
  // 	try {
  // 		const admin: any = new User({
  // 			first_name: 'Kurt',
  // 			last_name: 'LaVacque',
  // 			email: 'lavacquek@icloud.com',
  // 			password: 'admin',
  // 			isVerified: true,
  // 			isAdmin: true
  // 		});
  // 		const user = await User.findOne({ email: admin.email }).populate('affiliate');
  // 		if (user) {
  // 			return res.status(400).send({ message: 'Email already exists' });
  // 		} else {
  // 			bcrypt.genSalt(10, (err: any, salt: any) => {
  // 				bcrypt.hash(admin.password, salt, async (err: any, hash: any) => {
  // 					if (err) throw err;
  // 					admin.password = hash;
  // 					await admin.save();
  // 					res.json({
  // 						_id: admin.id,
  // 						first_name: admin.first_name,
  // 						last_name: admin.last_name,
  // 						email: admin.email,
  // 						affiliate: admin.affiliate,
  // 						cart: admin.cart,
  // 						is_affiliated: admin.is_affiliated,
  // 						email_subscription: admin.email_subscription,
  // 						isAdmin: admin.isAdmin,
  // 						isVerified: admin.isVerified,
  // 						shipping: admin.shipping,
  // 						token: getAccessToken(admin)
  // 					});
  // 				});
  // 			});
  // 		}
  // 	} catch (error) {
  //
  // 		res.send(error);
  // 	}
  // }
};
