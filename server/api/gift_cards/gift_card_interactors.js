import { sendEmail } from "../emails/email_services.js";
import { gift_card_template } from "../../email_templates/pages/gift_card.js";
import { generateRandomCode } from "../../utils/util.js";
import GiftCard from "./gift_card.js";

export const generateGiftCards = async orderItems => {
  const giftCardsByAmount = [];

  for (const item of orderItems) {
    if (item.itemType === "gift_card") {
      const giftCardsForAmount = {
        initialBalance: item.data.initialBalance,
        quantity: item.quantity,
        codes: [],
      };

      // Generate gift cards for this amount
      for (let i = 0; i < item.quantity; i++) {
        const code = generateRandomCode(8); // Generate 8-character unique code

        // Create gift card in database
        const newGiftCard = await GiftCard.create({
          code,
          type: item.data.type || "general",
          initialBalance: item.data.initialBalance,
          currentBalance: item.data.initialBalance,
          source: "purchase",
          isActive: true,
        });

        giftCardsForAmount.codes.push(newGiftCard.code);
      }

      giftCardsByAmount.push(giftCardsForAmount);
    }
  }

  return giftCardsByAmount;
};

export const sendGiftCardEmail = async order => {
  const giftCardItems = order.orderItems.filter(item => item.itemType === "gift_card");

  if (giftCardItems.length > 0) {
    const giftCards = await generateGiftCards(giftCardItems);

    await sendEmail({
      to: order.shipping.email,
      subject: "Your Glow LEDs Gift Card Codes",
      html: gift_card_template(giftCards),
    });

    return giftCards;
  }

  return null;
};

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
