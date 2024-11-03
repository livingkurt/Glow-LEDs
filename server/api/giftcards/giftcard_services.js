import giftcard_db from "./giftcard_db.js";

export default {
  findAll_giftcards_s: async query => {
    const filter = {};
    if (query.type) filter.type = query.type;
    if (query.source) filter.source = query.source;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

    return await giftcard_db.findAll_giftcards_db(filter);
  },

  findById_giftcard_s: async id => {
    return await giftcard_db.findById_giftcard_db(id);
  },

  findByCode_giftcard_s: async code => {
    return await giftcard_db.findByCode_giftcard_db(code);
  },

  findByUser_giftcards_s: async (userId, query = {}) => {
    const filter = {};
    if (query.type) filter.type = query.type;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

    return await giftcard_db.findByUser_giftcards_db(userId, filter);
  },

  create_giftcard_s: async data => {
    return await giftcard_db.create_giftcard_db(data);
  },

  update_giftcard_s: async (id, data) => {
    return await giftcard_db.update_giftcard_db(id, data);
  },

  delete_giftcard_s: async id => {
    return await giftcard_db.delete_giftcard_db(id);
  },

  add_funds_giftcard_s: async (id, amount, description) => {
    return await giftcard_db.add_funds_giftcard_db(id, amount, description);
  },

  use_funds_giftcard_s: async (code, amount, orderId, description) => {
    return await giftcard_db.use_funds_giftcard_db(code, amount, orderId, description);
  },

  get_transactions_giftcard_s: async id => {
    return await giftcard_db.get_transactions_giftcard_db(id);
  },

  create_sponsor_benefits_s: async (userId, monthlyRevenue) => {
    return await giftcard_db.create_sponsor_benefits_giftcard_db(userId, monthlyRevenue);
  },

  validate_giftcard_s: async code => {
    const giftcard = await giftcard_db.findByCode_giftcard_db(code);
    if (!giftcard) {
      return {
        isValid: false,
        error: "Gift card not found",
      };
    }

    const isValid = giftcard.isValid();
    return {
      isValid,
      currentBalance: isValid ? giftcard.currentBalance : 0,
      type: giftcard.type,
      error: isValid ? null : "Gift card is not valid for use",
    };
  },

  check_balance_s: async code => {
    const giftcard = await giftcard_db.findByCode_giftcard_db(code);
    if (!giftcard) {
      return {
        error: "Gift card not found",
      };
    }

    return {
      currentBalance: giftcard.currentBalance,
      isActive: giftcard.isActive,
      type: giftcard.type,
      expirationDate: giftcard.expirationDate,
    };
  },
};
