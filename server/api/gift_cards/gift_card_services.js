import gift_card_db from "./gift_card_db.js";

export default {
  findAll_gift_cards_s: async query => {
    const filter = {};
    if (query.type) filter.type = query.type;
    if (query.source) filter.source = query.source;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

    return await gift_card_db.findAll_gift_cards_db(filter);
  },

  findById_gift_card_s: async id => {
    return await gift_card_db.findById_gift_card_db(id);
  },

  findByCode_gift_card_s: async code => {
    return await gift_card_db.findByCode_gift_card_db(code);
  },

  findByUser_gift_cards_s: async (userId, query = {}) => {
    const filter = {};
    if (query.type) filter.type = query.type;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

    return await gift_card_db.findByUser_gift_cards_db(userId, filter);
  },

  create_gift_card_s: async data => {
    return await gift_card_db.create_gift_card_db(data);
  },

  update_gift_card_s: async (id, data) => {
    return await gift_card_db.update_gift_card_db(id, data);
  },

  delete_gift_card_s: async id => {
    return await gift_card_db.delete_gift_card_db(id);
  },

  add_funds_gift_card_s: async (id, amount, description) => {
    return await gift_card_db.add_funds_gift_card_db(id, amount, description);
  },

  use_funds_gift_card_s: async (code, amount, orderId, description) => {
    return await gift_card_db.use_funds_gift_card_db(code, amount, orderId, description);
  },

  get_transactions_gift_card_s: async id => {
    return await gift_card_db.get_transactions_gift_card_db(id);
  },

  create_sponsor_benefits_s: async (userId, monthlyRevenue) => {
    return await gift_card_db.create_sponsor_benefits_gift_card_db(userId, monthlyRevenue);
  },

  validate_gift_card_s: async code => {
    const giftCard = await gift_card_db.findByCode_gift_card_db(code);
    if (!giftCard) {
      return {
        isValid: false,
        error: "Gift card not found",
      };
    }

    const isValid = giftCard.isValid();
    return {
      isValid,
      currentBalance: isValid ? giftCard.currentBalance : 0,
      type: giftCard.type,
      error: isValid ? null : "Gift card is not valid for use",
    };
  },

  check_balance_s: async code => {
    const giftCard = await gift_card_db.findByCode_gift_card_db(code);
    if (!giftCard) {
      return {
        error: "Gift card not found",
      };
    }

    return {
      currentBalance: giftCard.currentBalance,
      isActive: giftCard.isActive,
      type: giftCard.type,
      expirationDate: giftCard.expirationDate,
    };
  },
};
