import GiftCard from "./gift_card.js";

export default {
  findAll_gift_cards_db: async (filter = {}, sort = { createdAt: -1 }) => {
    return await GiftCard.find({ ...filter, deleted: false }).sort(sort);
  },

  findById_gift_card_db: async id => {
    return await GiftCard.findOne({ _id: id, deleted: false });
  },

  findByCode_gift_card_db: async code => {
    return await GiftCard.findOne({ code, deleted: false });
  },

  findByUser_gift_cards_db: async (userId, filter = {}) => {
    return await GiftCard.find({
      user: userId,
      deleted: false,
      ...filter,
    }).sort({ createdAt: -1 });
  },

  create_gift_card_db: async data => {
    const code = await GiftCard.generateCode();
    const giftCard = new GiftCard({
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
    return await giftCard.save();
  },

  update_gift_card_db: async (id, data) => {
    const giftCard = await GiftCard.findOne({ _id: id, deleted: false });
    if (!giftCard) throw new Error("Gift card not found");

    Object.keys(data).forEach(key => {
      giftCard[key] = data[key];
    });

    return await giftCard.save();
  },

  delete_gift_card_db: async id => {
    const giftCard = await GiftCard.findById(id);
    if (!giftCard) throw new Error("Gift card not found");

    giftCard.deleted = true;
    giftCard.isActive = false;
    return await giftCard.save();
  },

  add_funds_gift_card_db: async (id, amount, description = "") => {
    const giftCard = await GiftCard.findOne({ _id: id, deleted: false });
    if (!giftCard) throw new Error("Gift card not found");

    return await giftCard.addFunds(amount, description);
  },

  use_funds_gift_card_db: async (code, amount, orderId, description = "") => {
    const giftCard = await GiftCard.findOne({ code, deleted: false });
    if (!giftCard) throw new Error("Gift card not found");
    if (!giftCard.isValid()) throw new Error("Gift card is not valid for use");

    return await giftCard.useFunds(amount, orderId, description);
  },

  get_transactions_gift_card_db: async id => {
    const giftCard = await GiftCard.findOne({ _id: id, deleted: false }).populate(
      "transactions.order",
      "order_num createdAt"
    );
    if (!giftCard) throw new Error("Gift card not found");

    return giftCard.transactions;
  },

  // Special method for creating sponsor benefit gift cards
  create_sponsor_benefits_gift_card_db: async (userId, monthlyRevenue) => {
    // Create general gift card
    const generalCard = await this.create_gift_card_db({
      user: userId,
      type: "general",
      initialBalance: 25, // Base amount
      source: "sponsor_benefit",
      expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });

    // Create supplies gift card
    const suppliesCard = await this.create_gift_card_db({
      user: userId,
      type: "supplies",
      initialBalance: 34.99, // Base amount
      source: "sponsor_benefit",
      expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });

    // Add performance bonus if applicable
    if (monthlyRevenue >= 10000) {
      await this.add_funds_gift_card_db(generalCard._id, 25, "Performance bonus - $10,000+ revenue");
    } else if (monthlyRevenue >= 8000) {
      await this.add_funds_gift_card_db(generalCard._id, 10, "Performance bonus - $8,000+ revenue");
    }

    return {
      generalCard,
      suppliesCard,
    };
  },
};
