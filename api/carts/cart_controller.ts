import { cart_services } from "../carts";

export default {
  findAll_carts_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const carts = await cart_services.findAll_carts_s(query);
      if (carts) {
        return res.status(200).send(carts);
      }
      return res.status(404).send({ message: "Carts Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_carts_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const cart = await cart_services.findById_carts_s(params);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(404).send({ message: "Cart Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByUser_carts_c: async (req: any, res: any) => {
    const { params } = req;

    try {
      const cart = await cart_services.findByUser_carts_s(params);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(200).send({});
      // return res.status(404).send({ message: 'Cart Not Found' });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_carts_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const cart = await cart_services.create_carts_s(body);
      if (cart) {
        return res.status(201).send(cart);
      }
      return res.status(500).send({ message: "Error Creating Cart" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_carts_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const cart = await cart_services.update_carts_s(params, body);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(500).send({ message: "Error Updating Cart" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_user_carts_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const cart = await cart_services.update_user_carts_s(params, body);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(500).send({ message: "Error Updating Cart" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  add_to_cart_carts_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const cart = await cart_services.add_to_cart_carts_s(body);
      if (cart) {
        return res.status(200).send(cart);
      }
      return res.status(500).send({ message: "Error Updating Cart" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_carts_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const cart = await cart_services.remove_carts_s(params);
      if (cart) {
        return res.status(204).send({ message: "Cart Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Cart" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_cart_item_carts_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const cart = await cart_services.remove_cart_item_carts_s(params, body);
      if (cart) {
        return res.status(201).send(cart);
      }
      return res.status(500).send({
        message: "Error Deleting Cart Item: If issue persists, please clear your cache and try adding your items again",
      });
    } catch (error: any) {
      res.status(500).send({
        error,
        message: "Error Deleting Cart Item: If issue persists, please clear your cache and try adding your items again",
      });
    }
  },
  empty_carts_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      // const cart = await cart_services.empty_carts_s(params);
      const cart = await cart_services.remove_carts_s(params);
      if (cart) {
        return res.status(201).send(cart);
      }
      return res.status(500).send({
        message: "Error Deleting Cart Item: If issue persists, please clear your cache and try adding your items again",
      });
    } catch (error: any) {
      res.status(500).send({
        error,
        message: "Error Deleting Cart Item: If issue persists, please clear your cache and try adding your items again",
      });
    }
  },
};
