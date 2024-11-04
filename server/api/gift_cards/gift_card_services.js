import gift_card_db from "./gift_card_db.js";
import { getFilteredData } from "../api_helpers.js";

export default {
  get_table_gift_cards_s: async query => {
    try {
      const sort_options = ["createdAt", "code", "currentBalance"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "code",
      });
      const gift_cards = await gift_card_db.findAll_gift_cards_db(filter, sort, limit, page);
      const count = await gift_card_db.count_gift_cards_db(filter);
      return {
        data: gift_cards,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findById_gift_cards_s: async params => {
    try {
      return await gift_card_db.findById_gift_cards_db(params.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  create_gift_cards_s: async body => {
    try {
      return await gift_card_db.create_gift_cards_db(body);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  update_gift_cards_s: async (params, body) => {
    try {
      return await gift_card_db.update_gift_cards_db(params.id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  remove_gift_cards_s: async params => {
    try {
      return await gift_card_db.remove_gift_cards_db(params.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  validate_gift_card_s: async params => {
    try {
      console.log("Validating gift card:", params.code);
      const giftCard = await gift_card_db.validate_gift_card_db(params.code);
      console.log("Gift card found:", giftCard);
      if (!giftCard) throw new Error("Invalid or expired gift card");
      return {
        code: giftCard.code,
        currentBalance: giftCard.currentBalance,
        type: giftCard.type,
        isValid: true,
      };
    } catch (error) {
      console.error("Gift card validation error:", error);
      throw new Error(error.message);
    }
  },

  use_gift_card_s: async (params, body) => {
    try {
      const { code } = params;
      const { amount, orderId } = body;

      // Validate amount
      if (!amount || amount <= 0) {
        throw new Error("Invalid amount");
      }

      // Use gift card
      const updatedGiftCard = await gift_card_db.use_gift_card_db(code, amount, orderId);

      return {
        code: updatedGiftCard.code,
        amountUsed: amount,
        remainingBalance: updatedGiftCard.currentBalance,
        isActive: updatedGiftCard.isActive,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  check_balance_s: async params => {
    try {
      const giftCard = await gift_card_db.findByCode_gift_cards_db(params.code);
      if (!giftCard) throw new Error("Gift card not found");

      return {
        code: giftCard.code,
        currentBalance: giftCard.currentBalance,
        isActive: giftCard.isActive,
        expirationDate: giftCard.expirationDate,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  get_transactions_s: async params => {
    try {
      const giftCard = await gift_card_db.findByCode_gift_cards_db(params.code);
      if (!giftCard) throw new Error("Gift card not found");

      return giftCard.transactions;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
