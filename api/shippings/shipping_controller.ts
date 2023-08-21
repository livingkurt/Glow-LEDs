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
      const errorMessage = error instanceof Error ? error.message : "Error Finding Shipping";
      res.status(500).send({ error, message: errorMessage });
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
  refund_label_shipping_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const shipping = await shipping_services.refund_label_shipping_s(params);
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
  generate_csv_label_shipping_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const shipping = await shipping_services.generate_csv_label_shipping_s(params);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(500).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Shipping" });
    }
  },
  shipments_shipping_c: async (req: any, res: any) => {
    try {
      const shipping = await shipping_services.shipments_shipping_s();
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(500).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Shipping" });
    }
  },
  create_pickup_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.create_pickup_shipping_s(body);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(500).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Shipping" });
    }
  },
  confirm_pickup_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.confirm_pickup_shipping_s(body);
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
    const { params } = req;

    try {
      const shipping = await shipping_services.different_shipping_rates_shipping_s(params);
      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(500).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Shipping" });
    }
  },
  custom_shipping_rates_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.custom_shipping_rates_shipping_s(body);
      if (shipping) {
        return res.status(201).send(shipping);
      }
      return res.status(500).send({ message: "Error Creating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Shipping" });
    }
  },
  create_custom_label_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.create_custom_label_shipping_s(body);
      if (shipping) {
        return res.status(201).send(shipping);
      }
      return res.status(500).send({ message: "Error Creating Shipping" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Shipping" });
    }
  },

  shipping_rates_shipping_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const shipping = await shipping_services.shipping_rates_shipping_s(body);

      if (shipping) {
        return res.status(200).send(shipping);
      }
      return res.status(200).send({ message: "Error Updating Shipping" });
    } catch (error) {
      res.status(200).json({ error, message: error.message });
    }
  },
};
