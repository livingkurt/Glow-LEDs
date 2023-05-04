import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../tokens/token";
dotenv.config();

export const getAccessToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      affiliate: user.affiliate,
      email_subscription: user.email_subscription,
      shipping: user.shipping,
      is_affiliated: user.is_affiliated,
      isWholesaler: user.isWholesaler,
      wholesaler: user.wholesaler
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    {
      expiresIn: "15m"
    }
  );
};
export const getRefreshToken = async (user: any) => {
  try {
    const refreshToken = jwt.sign(
      {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        affiliate: user.affiliate,
        email_subscription: user.email_subscription,
        shipping: user.shipping,
        is_affiliated: user.is_affiliated,
        wholesaler: user.wholesaler,
        isWholesaler: user.isWholesaler
      },
      process.env.REFRESH_TOKEN_SECRET || "",
      {
        expiresIn: "200d"
      }
    );
    console.log("saving new refresh token");
    // Store the refresh token in the database
    await Token.create({ user: user.id, token: refreshToken });
    // if (token) {
    return refreshToken;
    // }
  } catch (error) {
    console.error(error);
    return;
  }
};
