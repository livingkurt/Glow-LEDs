import { product_services } from "../products";

export default {
  findAll_products_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const products = await product_services.findAll_products_s(query);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Products" });
    }
  },
  create_filters_products_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const product_filters = await product_services.create_filters_products_s(query);
      if (product_filters) {
        return res.status(200).send(product_filters);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Orders" });
    }
  },
  findAllGrid_products_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const products = await product_services.findAllGrid_products_s(query);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Products" });
    }
  },
  findById_products_c: async (req: any, res: any) => {
    const { params } = req;

    try {
      const product = await product_services.findById_products_s(params);

      if (product) {
        return res.status(200).send(product);
      }
      return res.status(404).send({ message: "Product Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Product" });
    }
  },
  create_products_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const product = await product_services.create_products_s(body);
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Creating Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Product" });
    }
  },
  update_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const product = await product_services.update_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Product" });
    }
  },
  reorder_products_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const product = await product_services.reorder_products_s(body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Reordering Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Reordering Tutorial" });
    }
  },
  remove_products_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const product = await product_services.remove_products_s(params);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Product" });
    }
  },
  get_best_sellers_products_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const product = await product_services.get_best_sellers_products_s(body);
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Creating Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Product" });
    }
  },
  get_our_picks_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const product = await product_services.get_our_picks_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Product" });
    }
  },
  get_new_releases_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const product = await product_services.get_new_releases_products_s(params, body);
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(500).send({ message: "Error Updating Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Product" });
    }
  },
  update_stock_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const product = await product_services.update_stock_products_s(params, body);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Product" });
    }
  },
  update_product_order_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const products = await product_services.update_product_order_products_s(params, body);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Products" });
    }
  },
  add_product_options_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const products = await product_services.add_product_options_products_s(params, body);
      if (products) {
        return res.status(200).send(products);
      }
      return res.status(404).send({ message: "Products Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Products" });
    }
  },
  save_item_group_id_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const product = await product_services.save_item_group_id_products_s(params, body);
      if (product) {
        return res.status(201).send(product);
      }
      return res.status(500).send({ message: "Error Creating Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Product" });
    }
  },
  reviews_products_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const product = await product_services.reviews_products_s(params, body);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Product" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Product" });
    }
  },
  image_upload_products_c: async (req: any, res: any) => {
    try {
      const product = await product_services.image_upload_products_s(req);
      if (product) {
        return res.status(204).send({ message: "Product Deleted" });
      }
      return res.status(500).send({ message: "Error Uploading Images" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Uploading Images" });
    }
  }
};
