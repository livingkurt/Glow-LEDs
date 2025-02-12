import cart_services from "./cart_services.js";

export default {
  findAll_carts_c: async (req, res) => {
    const { query } = req;
    try {
      const carts = await cart_services.findAll_carts_s(query);
      if (carts) {
        return res.status(200).send(carts);
      }
      return res.status(404).send({ message: "Carts Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_carts_c: async (req, res) => {
    const { query } = req;
    try {
      const carts = await cart_services.table_carts_s(query);
      if (carts) {
        return res.status(200).send(carts);
      }
      return res.status(404).send({ message: "Carts Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reorder_carts_c: async (req, res) => {
    const { body } = req;
    try {
      const carts = await cart_services.reorder_carts_s(body);
      return res.status(200).send(carts);
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filters_carts_c: async (req, res) => {
    const { query } = req;
    try {
      const filters = await cart_services.create_filters_carts_s(query);
      return res.status(200).send(filters);
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  product_bundles_carts_c: async (req, res) => {
    const { query } = req;

    try {
      const carts = await cart_services.product_bundles_carts_s(query);
      return res.status(200).send(carts);
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_carts_c: async (req, res) => {
    const { params } = req;
    try {
      const cart = await cart_services.findById_carts_s(params);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(404).send({ message: "Cart Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByUser_carts_c: async (req, res) => {
    const { params } = req;

    try {
      const cart = await cart_services.findByUser_carts_s(params);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(200).send({});
      // return res.status(404).send({ message: 'Cart Not Found' });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_carts_c: async (req, res) => {
    const { body } = req;
    try {
      const cart = await cart_services.create_carts_s(body);
      if (cart) {
        return res.status(201).send(cart);
      }
      return res.status(500).send({ message: "Error Creating Cart" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_carts_c: async (req, res) => {
    const { params, body } = req;
    try {
      const cart = await cart_services.update_carts_s(params, body);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(500).send({ message: "Error Updating Cart" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_user_carts_c: async (req, res) => {
    const { params, body } = req;
    try {
      const cart = await cart_services.update_user_carts_s(params, body);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(500).send({ message: "Error Updating Cart" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  add_to_cart_carts_c: async (req, res) => {
    const { body } = req;
    try {
      const cart = await cart_services.add_to_cart_carts_s(body);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(500).send({ message: "Error Updating Cart" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_carts_c: async (req, res) => {
    const { params } = req;
    try {
      const cart = await cart_services.remove_carts_s(params);
      if (cart) {
        return res.status(204).send({ message: "Cart Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Cart" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_cart_item_carts_c: async (req, res) => {
    const { params, body } = req;
    try {
      const cart = await cart_services.remove_cart_item_carts_s(params, body);
      if (cart) {
        return res.status(201).send(cart);
      }
      return res.status(500).send({
        message: "Error Deleting Cart Item: If issue persists, please clear your cache and try adding your items again",
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Error Deleting Cart Item: If issue persists, please clear your cache and try adding your items again",
      });
    }
  },
  empty_carts_c: async (req, res) => {
    const { params } = req;
    try {
      await cart_services.remove_carts_s(params);
      return res.status(201);
    } catch (error) {
      res.status(500).send({
        error,
        message: "Error Emptyring Cart: If issue persists, please clear your cache and try adding your items again",
      });
    }
  },
};
