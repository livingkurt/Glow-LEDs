import jwt from "jsonwebtoken";
import config from "../config";
import Token from "../api/tokens/token";
import { user_services } from "../api/users";

export const setCurrentUser = (req, res, next: () => void) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, config.ACCESS_TOKEN_SECRET || "", (err, user) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = user;
    next();
  });
};

export const isAuth = async (req, res, next: () => void) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.ACCESS_TOKEN_SECRET || "", async (err, decode) => {
      if (err) {
        // If the token is expired, try refreshing it
        if (err.name === "TokenExpiredError") {
          // const refresh_token = req.body.refresh_token; // Or from wherever you keep it
          const refresh_token = req.headers["refresh-token"] || req.headers["Refresh-Token"];

          if (!refresh_token) {
            return res.status(403).send({ message: "Access denied, refresh token missing!" });
          }

          const tokenDoc = await Token.findOne({ token: refresh_token });
          if (!tokenDoc) {
            return res.status(401).send({ message: "Token expired!" });
          }

          const payload = jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET || "");
          const user = await user_services.refresh_login_users_s(payload.email);
          req.user = user;
          next();
          return;
        }
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};

export const isAdmin = (req, res, next: () => any) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: "Admin Token is not valid." });
};
