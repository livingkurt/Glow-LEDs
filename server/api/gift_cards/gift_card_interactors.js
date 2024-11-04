import GiftCard from "./gift_card.js";

export const validateGiftCard = async code => {
  const giftCard = await GiftCard.findOne({ code, deleted: false });
  if (!giftCard) return null;
  return giftCard.isValid() ? giftCard : null;
};

export const useGiftCard = async (code, amount, orderId) => {
  const giftCard = await GiftCard.findOne({ code, deleted: false });
  if (!giftCard) throw new Error("Gift card not found");
  return await giftCard.use(amount, orderId);
};

export const checkGiftCardBalance = async code => {
  const giftCard = await GiftCard.findOne({ code, deleted: false });
  if (!giftCard) throw new Error("Gift card not found");
  return {
    code: giftCard.code,
    currentBalance: giftCard.currentBalance,
    isActive: giftCard.isActive,
    expirationDate: giftCard.expirationDate,
  };
};
