import { user_db, user_services } from "../users";
import Token from "../tokens/token";
import { getAccessToken, getRefreshToken } from "./userInteractors";
import config from "../../config";
// import Token from "../tokens/token";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv");

export default {
  findAll_users_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const user = await user_services.findAll_users_s(query);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  create_filters_users_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const user = await user_services.create_filters_users_s(query);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  findById_users_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const user = await user_services.findById_users_s(params);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  findByAffiliateId_users_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const user = await user_services.findByAffiliateId_users_s(params);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  findByEmail_users_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const user = await user_services.findByEmail_users_s(params);

      if (user) {
        return res.status(200).send(user);
      }
      return res.status(200).send({});
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  create_users_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      let user: any = {};
      let hashed_password = "";
      const temporary_password = config.TEMP_PASS;
      bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(temporary_password, salt, async (err: any, hash: any) => {
          if (err) throw err;
          hashed_password = hash;
          user = { ...body, password: hashed_password };
          try {
            const new_user = await user_db.create_users_db(user);

            return res.status(200).send(new_user);
          } catch (error) {
            res.status(500).json({ message: "Error Creating User", error });
          }
        });
      });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating User" });
    }
  },
  update_users_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const user = await user_services.update_users_s(params, body);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  remove_users_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const user = await user_services.remove_users_s(params);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },

  register_users_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const { user, matched } = await user_services.register_users_s(body);
      //
      bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
          if (err) throw err;
          if (matched) {
            user.password = hash;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
          } else {
            user.password = hash;
          }
          try {
            const new_user = await user_db.create_users_db(user);

            return res.status(200).send(new_user);
          } catch (error) {
            res.status(500).json({ message: "Error Registering User", error });
          }
        });
      });
    } catch (error) {
      res.status(500).send({ error, message: "Error Registering User" });
    }
  },
  login_users_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const user = await user_services.login_users_s(body.email, body.password);

      if (user) {
        // Generate the access token here
        const access_token = getAccessToken(user);
        return res.status(200).send({
          success: true,
          access_token: access_token,
          // Include the refresh_token in the response
          refresh_token: user.refresh_token,
        });
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "User Not Found" });
    }
  },

  login_as_user_users_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const user = await user_services.login_as_user_users_s(body.email);
      //
      if (user) {
        // Generate the access token here
        const access_token = getAccessToken(user);
        return res.status(200).send({
          success: true,
          access_token: access_token,
          // Include the refresh_token in the response
          refresh_token: user.refresh_token,
        });
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "User Not Found" });
    }
  },
  refresh_login_users_c: async (req: any, res: any) => {
    try {
      // get refreshToken
      const { refresh_token } = req.body;

      // send error if no refresh_token is sent
      if (!refresh_token) {
        return res.status(403).send({ message: "Access denied, token missing!" });
      } else {
        // query for the token to check if it is valid:
        const tokenDoc = await Token.findOne({ token: refresh_token });
        // send error if no token found:
        if (!tokenDoc) {
          return res.status(401).json({ message: "Token expired!" });
        } else {
          // await Token.findOneAndDelete({ token: refresh_token });
          // extract payload from refresh token and generate a new access token and send it
          const payload = jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET);

          const user = await user_services.refresh_login_users_s(payload.email);

          const access_token = getAccessToken(user);
          return res.status(200).send({
            success: true,
            access_token: access_token,
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error, message: "Internal Server Error" });
    }
  },

  logout_users_c: async (req: any, res: any) => {
    try {
      //delete the refresh token saved in database:
      const { refresh_token } = req.body;
      //
      await Token.findOneAndDelete({ token: refresh_token });
      return res.status(200).json({ success: "User logged out!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error, message: "Internal Server Error!" });
    }
  },
  password_reset_users_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const user: any = await user_db.findById_users_db(body.userId);
      bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(body.password, salt, async (err: any, hash: any) => {
          if (err) throw err;
          try {
            user.password = hash;
            const new_user = await user_db.update_users_db(user._id, user);
            return res.status(200).send(new_user);
          } catch (error) {
            res.status(500).json({ message: "Error Registering User", error });
          }
        });
      });
    } catch (error) {
      res.status(500).send({ error, message: "Error Registering User" });
    }
  },
  reset_password_users_c: async (req: any, res: any) => {
    const { body } = req;
    //
    try {
      const user = await user_services.findByEmail_users_s(body);

      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  // verify_users_c: async (req: any, res: any) => {
  // 	const { params } = req;
  // 	try {
  // 		const user = await user_services.verify_users_s(params);
  // 		if (user) {
  // 			return res.status(200).send(user );
  // 		}
  // 		return res.status(404).send({ message: 'User Not Found' });
  // 	} catch (error) {
  //
  // 		res.status(500).send({ error, message: 'Error Finding User' });
  // 	}
  // },
  check_password_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const user = await user_services.check_password_s(params, body);
      if (user !== undefined) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  validate_email_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const user = await user_services.validate_email_s(params, body);
      if (user !== undefined) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding User" });
    }
  },
  // checkemail_users_c: async (req: any, res: any) => {
  // 	const { params } = req;
  // 	try {
  // 		const user = await user_services.checkemail_users_s(params);
  // 		if (user) {
  // 			return res.status(200).send(user );
  // 		}
  // 		return res.status(404).send({ message: 'User Not Found' });
  // 	} catch (error) {
  //
  // 		res.status(500).send({ error, message: 'Error Finding User' });
  // 	}
  // },
  // createadmin_users_c: async (req: any, res: any) => {
  // 	const { params } = req;
  // 	try {
  // 		const user = await user_services.createadmin_users_s(params);
  // 		if (user) {
  // 			return res.status(200).send(user );
  // 		}
  // 		return res.status(404).send({ message: 'User Not Found' });
  // 	} catch (error) {
  //
  // 		res.status(500).send({ error, message: 'Error Finding User' });
  // 	}
  // }
};
