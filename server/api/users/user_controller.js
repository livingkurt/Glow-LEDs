import User from "./user.js";
import user_db from "./user_db.js";
import user_services from "./user_services.js";
import Token from "../tokens/token.js";
import { getAccessToken } from "./userInteractors.js";
import config from "../../config.js";
import {
  sendRegistrationEmail,
  sendEmailVerifiedSuccess,
  sendAnnouncementEmail,
  sendPasswordResetSuccessEmail,
  sendVerifyEmailPasswordResetSuccessEmail,
} from "./user_interactors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  table_users_c: async (req, res) => {
    const { query } = req;
    try {
      const users = await user_services.table_users_s(query);
      if (users) {
        return res.status(200).send(users);
      }
      return res.status(404).send({ message: "Users Not Found" });
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

            await sendRegistrationEmail(new_user);

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

      await sendEmailVerifiedSuccess(user);
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
          access_token,
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
            access_token,
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
          access_token,
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
      // delete the refresh token saved in database:
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
            await sendPasswordResetSuccessEmail(user);
            return res.status(200).send(user);
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
        await sendVerifyEmailPasswordResetSuccessEmail(user, resetToken);
        return res.status(200).send({ message: "Email sent successfully" });
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
  validate_email_users_c: async (req, res) => {
    const { params, body } = req;
    try {
      const user = await user_services.validate_email_users_s(params, body);
      if (user !== undefined) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  unsubscribe_email_users_c: async (req, res) => {
    const { body } = req;
    try {
      const user = await user_services.unsubscribe_email_users_s(body);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
