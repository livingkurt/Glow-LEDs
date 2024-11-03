import GiftCard from "./giftcard.js";

export default {
  findAll_giftcards_db: async (filter = {}, sort = { createdAt: -1 }) => {
    return await GiftCard.find({ ...filter, deleted: false }).sort(sort);
  },

  findById_giftcard_db: async id => {
    return await GiftCard.findOne({ _id: id, deleted: false });
  },

  findByCode_giftcard_db: async code => {
    return await GiftCard.findOne({ code, deleted: false });
  },

  findByUser_giftcards_db: async (userId, filter = {}) => {
    return await GiftCard.find({
      user: userId,
      deleted: false,
      ...filter,
    }).sort({ createdAt: -1 });
  },

  create_giftcard_db: async data => {
    const code = await GiftCard.generateCode();
    const giftcard = new GiftCard({
      ...data,
      code,
      currentBalance: data.initialBalance,
      transactions: [
        {
          amount: data.initialBalance,
          type: "credit",
          description: "Initial balance",
        },
      ],
    });
    return await giftcard.save();
  },

  update_giftcard_db: async (id, data) => {
    const giftcard = await GiftCard.findOne({ _id: id, deleted: false });
    if (!giftcard) throw new Error("Gift card not found");

    Object.keys(data).forEach(key => {
      giftcard[key] = data[key];
    });

    return await giftcard.save();
  },

  delete_giftcard_db: async id => {
    const giftcard = await GiftCard.findById(id);
    if (!giftcard) throw new Error("Gift card not found");

    giftcard.deleted = true;
    giftcard.isActive = false;
    return await giftcard.save();
  },

  add_funds_giftcard_db: async (id, amount, description = "") => {
    const giftcard = await GiftCard.findOne({ _id: id, deleted: false });
    if (!giftcard) throw new Error("Gift card not found");

    return await giftcard.addFunds(amount, description);
  },

  use_funds_giftcard_db: async (code, amount, orderId, description = "") => {
    const giftcard = await GiftCard.findOne({ code, deleted: false });
    if (!giftcard) throw new Error("Gift card not found");
    if (!giftcard.isValid()) throw new Error("Gift card is not valid for use");

    return await giftcard.useFunds(amount, orderId, description);
  },

  get_transactions_giftcard_db: async id => {
    const giftcard = await GiftCard.findOne({ _id: id, deleted: false }).populate(
      "transactions.order",
      "order_num createdAt"
    );
    if (!giftcard) throw new Error("Gift card not found");

    return giftcard.transactions;
  },

  // Special method for creating sponsor benefit gift cards
  create_sponsor_benefits_giftcard_db: async (userId, monthlyRevenue) => {
    // Create general gift card
    const generalCard = await this.create_giftcard_db({
      user: userId,
      type: "general",
      initialBalance: 25, // Base amount
      source: "sponsor_benefit",
      expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });

    // Create supplies gift card
    const suppliesCard = await this.create_giftcard_db({
      user: userId,
      type: "supplies",
      initialBalance: 34.99, // Base amount
      source: "sponsor_benefit",
      expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });

    // Add performance bonus if applicable
    if (monthlyRevenue >= 10000) {
      await this.add_funds_giftcard_db(generalCard._id, 25, "Performance bonus - $10,000+ revenue");
    } else if (monthlyRevenue >= 8000) {
      await this.add_funds_giftcard_db(generalCard._id, 10, "Performance bonus - $8,000+ revenue");
    }

    return {
      generalCard,
      suppliesCard,
    };
  },
};
