import jwt from "jsonwebtoken";
import Token from "../tokens/token";
import config from "../../config";

export const getAccessToken = user => {
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
      wholesaler: user.wholesaler,
    },
    config.ACCESS_TOKEN_SECRET || "",
    {
      expiresIn: "5000",
      // expiresIn: "1hr",
    }
  );
};
export const getRefreshToken = async user => {
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
        isWholesaler: user.isWholesaler,
      },
      config.REFRESH_TOKEN_SECRET || "",
      {
        expiresIn: "30d",
      }
    );
    const newToken = await Token.create({ user: user._id, token: refreshToken });
    console.log({ newToken });

    return refreshToken;
  } catch (error) {
    console.error(error);
    return;
  }
};
