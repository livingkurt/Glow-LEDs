import { product_services } from "../products";

export default {
  findAll_products_c: async (req, res) => {
    const { query } = req;
    try {
      const products = await product_services.findAll_products_s(query);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_products_c: async (req, res) => {
    const { query } = req;
    try {
      const products = await product_services.table_products_s(query);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filters_products_c: async (req, res) => {
    const { query } = req;
    try {
      const product_filters = await product_services.create_filters_products_s(query);
      if (product_filters) {
        return res.status(200).send(product_filters);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAllGrid_products_c: async (req, res) => {
    const { query } = req;
    try {
      const products = await product_services.findAllGrid_products_s(query);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_products_c: async (req, res) => {
    const { params } = req;

    try {
      const product = await product_services.findById_products_s(params);

      if (product) {
        return res.status(200).send(product);
      }
      return res.status(404).send({ message: "Product Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  check_stock_products_c: async (req, res) => {
    const { body } = req;

    try {
      const product = await product_services.check_stock_products_s(body);

      if (product) {
        return res.status(200).send(product);
      }
      return res.status(404).send({ message: "Product Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_products_c: async (req, res) => {
    const { body } = req;
    try {
      const product = await product_services.create_products_s(body);
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Creating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const product = await product_services.update_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  generate_product_options_products_c: async (req, res) => {
    const { body } = req;
    try {
      const product = await product_services.generate_product_options_products_s(body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_option_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const product = await product_services.create_option_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reorder_products_c: async (req, res) => {
    const { body } = req;
    try {
      const product = await product_services.reorder_products_s(body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Reordering Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_products_c: async (req, res) => {
    const { params } = req;
    try {
      const product = await product_services.remove_products_s(params);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_best_sellers_products_c: async (req, res) => {
    const { body } = req;
    try {
      const product = await product_services.get_best_sellers_products_s(body);
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Creating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_our_picks_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const product = await product_services.get_our_picks_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_new_releases_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const product = await product_services.get_new_releases_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_stock_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const product = await product_services.update_stock_products_s(params, body);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_product_order_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const products = await product_services.update_product_order_products_s(params, body);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  add_product_options_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const products = await product_services.add_product_options_products_s(params, body);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  save_item_group_id_products_c: async (req, res) => {
    const { params, body } = req;
    try {
      const product = await product_services.save_item_group_id_products_s(params, body);
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Creating Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reviews_products_c: async (req, res) => {
    const { params, body, user } = req;
    try {
      const product = await product_services.reviews_products_s(params, body, user);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  image_upload_products_c: async (req, res) => {
    try {
      const product = await product_services.image_upload_products_s(req);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Uploading Images" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_multiple_products_c: async (req, res) => {
    const { body } = req;
    try {
      const product = await product_services.remove_multiple_products_s(body);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  current_stock_products_c: async (req, res) => {
    try {
      const product = await product_services.current_stock_products_s();
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  facebook_catelog_products_c: async (req, res) => {
    try {
      const product = await product_services.facebook_catelog_products_s();
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Finding Product Attributes" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
