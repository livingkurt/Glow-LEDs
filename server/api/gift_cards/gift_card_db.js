import GiftCard from "./gift_card.js";

export default {
  findAll_gift_cards_db: async (filter, sort, limit, page) => {
    try {
      return await GiftCard.find(filter)
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findById_gift_cards_db: async id => {
    try {
      return await GiftCard.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findByCode_gift_cards_db: async code => {
    try {
      return await GiftCard.findOne({ code: code, deleted: false });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  create_gift_cards_db: async data => {
    try {
      return await GiftCard.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  update_gift_cards_db: async (id, data) => {
    try {
      return await GiftCard.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  remove_gift_cards_db: async id => {
    try {
      return await GiftCard.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  count_gift_cards_db: async filter => {
    try {
      return await GiftCard.countDocuments(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  validate_gift_card_db: async code => {
    try {
      const giftCard = await GiftCard.findOne({
        code: code.toUpperCase(),
        deleted: false,
      });
      if (!giftCard) return null;
      return giftCard.isValid() ? giftCard : null;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  use_gift_card_db: async (code, amount, orderId) => {
    try {
      const giftCard = await GiftCard.findOne({ code: code, deleted: false });
      if (!giftCard) throw new Error("Gift card not found");
      return await giftCard.use(amount, orderId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
