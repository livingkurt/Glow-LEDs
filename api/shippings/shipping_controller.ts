import { shipping_services } from "../shippings";

export default {
  buy_label_shipping_c: async (req: any, res: any) => {
    const { params } = req;

    try {
      const shipping = await shipping_services.buy_label_shipping_s(params);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(404).send({ message: "Shipping Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Shipping" });
    }
  },
  create_label_shipping_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const shipping = await shipping_services.create_label_shipping_s(params);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(404).send({ message: "Shipping Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Shipping" });
    }
  },
  create_tracker_shipping_c: async (req: any, res: any) => {
    const { params } = req;
    console.log({ params });
    try {
      const shipping = await shipping_services.create_tracker_shipping_s(params);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(404).send({ message: "Shipping Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Shipping" });
    }
  },

  create_return_label_shipping_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const shipping = await shipping_services.create_return_label_shipping_s(params);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(500).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Shipping" });
    }
  },
  verify_address_shipping_c: async (req: any, res: any) => {
    const { body } = req;

    try {
      const shipping = await shipping_services.buy_label_shipping_s(body);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(404).send({ message: "Shipping Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Shipping" });
    }
  },
  different_shipping_rates_shipping_c: async (req: any, res: any) => {
    const { body } = req;

    try {
      const shipping = await shipping_services.get_shipping_rates_shipping_s(body.data);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(500).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Shipping" });
    }
  },
  get_custom_shipping_rates_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.get_custom_shipping_rates_shipping_s(body);
      if (shipping) {
        return res.status(201).send(shipping);
      }
      return res.status(500).send({ message: "Error Creating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Shipping" });
    }
  },

  get_shipping_rates_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.get_shipping_rates_shipping_s(body);

      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(200).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(200).json({ error, message: error.message });
    }
  }
};
