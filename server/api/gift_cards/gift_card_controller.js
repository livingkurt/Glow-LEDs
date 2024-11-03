import gift_card_services from "./gift_card_services.js";

export default {
  // Get all gift cards (admin only)
  get_all_gift_cards_c: async (req, res) => {
    try {
      const giftCards = await gift_card_services.findAll_gift_cards_s(req.query);
      res.status(200).json(giftCards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user's gift cards
  get_user_gift_cards_c: async (req, res) => {
    try {
      const giftCards = await gift_card_services.findByUser_gift_cards_s(req.user._id, req.query);
      res.status(200).json(giftCards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single gift card
  get_gift_card_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.findById_gift_card_s(req.params.id);

      if (!giftCard) {
        return res.status(404).json({ message: "Gift card not found" });
      }

      // Only allow admin or card owner to view details
      if (!req.user.isAdmin && giftCard.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      res.status(200).json(giftCard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new gift card
  create_gift_card_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.create_gift_card_s(req.body);
      res.status(201).json(giftCard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create sponsor benefit gift cards
  create_sponsor_benefits_c: async (req, res) => {
    try {
      const { userId, monthlyRevenue } = req.body;
      const giftCards = await gift_card_services.create_sponsor_benefits_s(userId, monthlyRevenue);
      res.status(201).json(giftCards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update gift card
  update_gift_card_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.update_gift_card_s(req.params.id, req.body);
      if (!giftCard) {
        return res.status(404).json({ message: "Gift card not found" });
      }
      res.status(200).json(giftCard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete gift card (soft delete)
  delete_gift_card_c: async (req, res) => {
    try {
      await gift_card_services.delete_gift_card_s(req.params.id);
      res.status(200).json({ message: "Gift card deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add funds to gift card
  add_funds_c: async (req, res) => {
    try {
      const { amount, description } = req.body;
      const giftCard = await gift_card_services.add_funds_gift_card_s(req.params.id, amount, description);
      res.status(200).json(giftCard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Use gift card
  use_gift_card_c: async (req, res) => {
    try {
      const { code, amount, orderId } = req.body;
      const giftCard = await gift_card_services.use_funds_gift_card_s(code, amount, orderId, "Order payment");
      res.status(200).json(giftCard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Validate gift card
  validate_gift_card_c: async (req, res) => {
    try {
      const result = await gift_card_services.validate_gift_card_s(req.params.code);
      if (result.error) {
        return res.status(400).json({ message: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Check gift card balance
  check_balance_c: async (req, res) => {
    try {
      const result = await gift_card_services.check_balance_s(req.params.code);
      if (result.error) {
        return res.status(404).json({ message: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Deactivate gift card
  deactivate_gift_card_c: async (req, res) => {
    try {
      const giftCard = await gift_card_services.update_gift_card_s(req.params.id, { isActive: false });
      if (!giftCard) {
        return res.status(404).json({ message: "Gift card not found" });
      }
      res.status(200).json({ message: "Gift card deactivated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get gift card transactions
  get_transactions_c: async (req, res) => {
    try {
      const transactions = await gift_card_services.get_transactions_gift_card_s(req.params.id);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
