import giftcard_services from "./giftcard_services.js";

export default {
  // Get all gift cards (admin only)
  get_all_giftcards_c: async (req, res) => {
    try {
      const giftcards = await giftcard_services.findAll_giftcards_s(req.query);
      res.status(200).json(giftcards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user's gift cards
  get_user_giftcards_c: async (req, res) => {
    try {
      const giftcards = await giftcard_services.findByUser_giftcards_s(req.user._id, req.query);
      res.status(200).json(giftcards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single gift card
  get_giftcard_c: async (req, res) => {
    try {
      const giftcard = await giftcard_services.findById_giftcard_s(req.params.id);

      if (!giftcard) {
        return res.status(404).json({ message: "Gift card not found" });
      }

      // Only allow admin or card owner to view details
      if (!req.user.isAdmin && giftcard.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      res.status(200).json(giftcard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new gift card
  create_giftcard_c: async (req, res) => {
    try {
      const giftcard = await giftcard_services.create_giftcard_s(req.body);
      res.status(201).json(giftcard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create sponsor benefit gift cards
  create_sponsor_benefits_c: async (req, res) => {
    try {
      const { userId, monthlyRevenue } = req.body;
      const giftcards = await giftcard_services.create_sponsor_benefits_s(userId, monthlyRevenue);
      res.status(201).json(giftcards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update gift card
  update_giftcard_c: async (req, res) => {
    try {
      const giftcard = await giftcard_services.update_giftcard_s(req.params.id, req.body);
      if (!giftcard) {
        return res.status(404).json({ message: "Gift card not found" });
      }
      res.status(200).json(giftcard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete gift card (soft delete)
  delete_giftcard_c: async (req, res) => {
    try {
      await giftcard_services.delete_giftcard_s(req.params.id);
      res.status(200).json({ message: "Gift card deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add funds to gift card
  add_funds_c: async (req, res) => {
    try {
      const { amount, description } = req.body;
      const giftcard = await giftcard_services.add_funds_giftcard_s(req.params.id, amount, description);
      res.status(200).json(giftcard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Use gift card
  use_giftcard_c: async (req, res) => {
    try {
      const { code, amount, orderId } = req.body;
      const giftcard = await giftcard_services.use_funds_giftcard_s(code, amount, orderId, "Order payment");
      res.status(200).json(giftcard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Validate gift card
  validate_giftcard_c: async (req, res) => {
    try {
      const result = await giftcard_services.validate_giftcard_s(req.params.code);
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
      const result = await giftcard_services.check_balance_s(req.params.code);
      if (result.error) {
        return res.status(404).json({ message: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Deactivate gift card
  deactivate_giftcard_c: async (req, res) => {
    try {
      const giftcard = await giftcard_services.update_giftcard_s(req.params.id, { isActive: false });
      if (!giftcard) {
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
      const transactions = await giftcard_services.get_transactions_giftcard_s(req.params.id);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
