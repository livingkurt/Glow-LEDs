import { User, user_db, user_services } from "../users";
import Token from "../tokens/token";
import { getAccessToken, getRefreshToken } from "./userInteractors";
import config from "../../config";
import App from "../../email_templates/App";
import verify from "../../email_templates/pages/verify";
import { sendEmail } from "../emails/email_helpers";
import { domain } from "../../email_templates/email_template_helpers";
import { content_db } from "../contents";
import { account_created, successful_password_reset, verify_email_password_reset } from "../../email_templates/pages";
// import Token from "../tokens/token";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv");

export default {
  findAll_users_c: async (req, res) => {
    const { query } = req;
    try {
      const user = await user_services.findAll_users_s(query);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filters_users_c: async (req, res) => {
    const { query } = req;
    try {
      const user = await user_services.create_filters_users_s(query);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_users_c: async (req, res) => {
    const { params } = req;
    try {
      const user = await user_services.findById_users_s(params);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByAffiliateId_users_c: async (req, res) => {
    const { params } = req;
    try {
      const user = await user_services.findByAffiliateId_users_s(params);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByEmail_users_c: async (req, res) => {
    const { params } = req;
    try {
      const user = await user_services.findByEmail_users_s(params);

      if (user) {
        return res.status(200).send(user);
      }
      return res.status(200).send({});
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_users_c: async (req, res) => {
    const { body } = req;
    try {
      let user = {};
      let hashed_password = "";
      const temporary_password = config.TEMP_PASS;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(temporary_password, salt, async (err, hash) => {
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
      res.status(500).send({ error, message: error.message });
    }
  },
  update_users_c: async (req, res) => {
    const { params, body } = req;
    try {
      const user = await user_services.update_users_s(params, body);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_users_c: async (req, res) => {
    const { params } = req;
    try {
      const user = await user_services.remove_users_s(params);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  register_users_c: async (req, res) => {
    const { body } = req;
    try {
      const { user, matched } = await user_services.register_users_s(body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
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
            const token = jwt.sign({ userId: new_user._id }, config.VERIFY_USER_TOKEN_SECRET, { expiresIn: "1h" });

            const mailOptions = {
              from: config.DISPLAY_INFO_EMAIL,
              to: req.body.email,
              subject: "Verify your Email",
              html: App({
                body: verify({
                  title: "Verify your Email",
                  url: `${domain()}/pages/complete/account_created/${token}`,
                  user: new_user,
                }),

                unsubscribe: false,
              }),
            };

            sendEmail(mailOptions, res, "info", "Verification Email Sent to " + req.body.first_name);

            return res.status(200).send(new_user);
          } catch (error) {
            res.status(500).json({ message: error.message, error });
          }
        });
      });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  verify_users_c: async (req, res) => {
    try {
      const { token } = req.params;
      const { userId } = jwt.verify(token, config.VERIFY_USER_TOKEN_SECRET);

      await User.updateOne({ _id: userId }, { isVerified: true });
      const user = await User.findById(userId);
      const contents = await content_db.findAll_contents_db({ deleted: false }, { _id: -1 }, "0", "1");

      const mailOptions = {
        from: config.DISPLAY_INFO_EMAIL,
        to: user.email,
        subject: "Glow LEDs Account Created",
        html: App({
          body: account_created({
            user: user,
            categories: contents && contents[0].home_page?.slideshow,
            title: "Glow LEDs Account Created",
          }),

          unsubscribe: false,
        }),
      };

      sendEmail(mailOptions, res, "info", "Registration Email Sent to " + user.first_name);
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login_users_c: async (req, res) => {
    const { body } = req;
    try {
      const user = await user_services.login_users_s(body.email, body.password);

      if (user) {
        // Generate the access token here
        const access_token = getAccessToken(user);
        return res.status(200).send({
          success: true,
          access_token: access_token,
          refresh_token: user.refresh_token,
        });
      }
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  refresh_login_users_c: async (req, res) => {
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
            refresh_token: user.refresh_token,
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error, message: error.message });
    }
  },

  login_as_user_users_c: async (req, res) => {
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
      res.status(500).send({ error, message: error.message });
    }
  },
  logout_users_c: async (req, res) => {
    try {
      //delete the refresh token saved in database:
      const { refresh_token } = req.body;
      //
      await Token.findOneAndDelete({ token: refresh_token });
      return res.status(200).json({ success: "User logged out!" });
    } catch (error) {
      return res.status(500).json({ error, message: "Internal Server Error!" });
    }
  },

  reset_password_users_c: async (req, res) => {
    const { token, password } = req.body;
    try {
      // Decoding token to get email
      const decoded = jwt.verify(token, config.RESET_PASSWORD_TOKEN_SECRET);
      const user = await user_db.findByEmail_users_db(decoded.email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          try {
            user.password = hash;
            await user_db.update_users_db(user._id, user);
            const mailOptions = {
              from: config.DISPLAY_INFO_EMAIL,
              to: user.email,
              subject: "Successfully Changed Password",
              html: App({
                body: successful_password_reset({
                  first_name: user.first_name,
                  title: "Successfully Changed Password",
                }),
                unsubscribe: false,
              }),
            };
            sendEmail(mailOptions, res, "info", "Reset Password Email Sent to " + user.first_name);
            // return res.status(200).send(new_user);
          } catch (error) {
            res.status(500).json({ message: error.message, error });
          }
        });
      });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  verify_email_password_reset_users_c: async (req, res) => {
    try {
      const email = req.body.email;

      const user = await user_db.findByEmail_users_db(email);

      if (user) {
        // Generate a JWT token for reset password
        const resetToken = jwt.sign({ email }, config.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "1h" });

        // Include the token in the reset URL
        const url = `${domain()}/account/reset_password?token=${resetToken}`;

        const mailOptions = {
          from: config.DISPLAY_INFO_EMAIL,
          to: req.body.email,
          subject: "Glow LEDs Reset Password",
          html: App({
            body: verify_email_password_reset({
              ...req.body,
              url,
              title: "Glow LEDs Reset Password",
            }),
            unsubscribe: false,
          }),
        };
        sendEmail(mailOptions, res, "info", "Reset Password Link Email Sent to " + user.first_name);
      } else {
        res.status(500).send({ message: "You do not have an account with us" });
      }
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  generate_password_reset_token_users_c: async (req, res) => {
    const { email, currentPassword } = req.body;

    try {
      const user = await user_db.findByEmail_users_db(email);

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (isMatch) {
        const token = jwt.sign({ email }, config.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).send({ token });
      } else {
        return res.status(401).send({ message: "Passwords do not match" });
      }
    } catch (error) {
      return res.status(500).send({ error, message: error.message });
    }
  },

  // verify_users_c: async (req, res) => {
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
  check_password_c: async (req, res) => {
    const { params, body } = req;
    try {
      const user = await user_services.check_password_s(params, body);
      if (user !== undefined) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  validate_email_c: async (req, res) => {
    const { params, body } = req;
    try {
      const user = await user_services.validate_email_s(params, body);
      if (user !== undefined) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  // checkemail_users_c: async (req, res) => {
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
  // createadmin_users_c: async (req, res) => {
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
