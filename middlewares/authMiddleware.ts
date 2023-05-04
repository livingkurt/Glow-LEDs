import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// export const authenticateToken = (req: any, res: any, next: () => void) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err: any, user: any) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };

export const setCurrentUser = (req: any, res: any, next: () => void) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err: any, user: any) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = user;
    next();
  });
};

export const isAuth = (req: any, res: any, next: () => void) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.ACCESS_TOKEN_SECRET || "", (err: any, decode: any) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
};

export const isAdmin = (req: any, res: any, next: () => any) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};
