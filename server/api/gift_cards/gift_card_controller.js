import gift_card_services from "./gift_card_services.js";

export default {
  get_table_gift_cards_c: async (req, res) => {
    try {
      const giftCards = await gift_card_services.get_table_gift_cards_s(req.query);
      if (giftCards) {
        return res.status(200).send(giftCards);
      }
      return res.status(404).send({ message: "Gift cards not found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  findById_gift_cards_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.findById_gift_cards_s(req.params);
      if (giftCard) {
        return res.status(200).send(giftCard);
      }
      return res.status(404).send({ message: "Gift card not found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  create_gift_cards_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.create_gift_cards_s(req.body);
      if (giftCard) {
        return res.status(201).send(giftCard);
      }
      return res.status(500).send({ message: "Error creating gift card" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  update_gift_cards_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.update_gift_cards_s(req.params, req.body);
      if (giftCard) {
        return res.status(200).send(giftCard);
      }
      return res.status(500).send({ message: "Error updating gift card" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  remove_gift_cards_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.remove_gift_cards_s(req.params);
      if (giftCard) {
        return res.status(204).send({ message: "Gift card deleted" });
      }
      return res.status(500).send({ message: "Error deleting gift card" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  validate_gift_card_c: async (req, res) => {
    try {
      const result = await gift_card_services.validate_gift_card_s(req.params);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(400).send({ message: "Invalid gift card" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  check_balance_c: async (req, res) => {
    try {
      const result = await gift_card_services.check_balance_s(req.params);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send({ message: "Gift card not found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  use_gift_card_c: async (req, res) => {
    try {
      const result = await gift_card_services.use_gift_card_s(req.params, req.body);
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(400).send({ message: "Error using gift card" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  get_transactions_c: async (req, res) => {
    try {
      const transactions = await gift_card_services.get_transactions_s(req.params);
      if (transactions) {
        return res.status(200).send(transactions);
      }
      return res.status(404).send({ message: "Transactions not found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
