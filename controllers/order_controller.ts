import invoice from "../email_templates/pages/invoice";
import { order_services } from "../services";

export default {
  findAll_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.findAll_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Orders" });
    }
  },
  findMy_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.findMy_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  findById_orders_c: async (req: any, res: any) => {
    const { params } = req;

    try {
      const order = await order_services.findById_orders_s(params);
      if (order) {
        return res.status(200).send(order);
      }
      return res.status(404).send({ message: "Order Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Order" });
    }
  },
  create_orders_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const order = await order_services.create_orders_s(body);
      if (order) {
        return res.status(201).send(order);
      }
      return res.status(500).send(order);
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Order" });
    }
  },
  update_orders_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const order = await order_services.update_orders_s(params, body);
      if (order) {
        return res.status(200).send(order);
      }
      return res.status(500).send({ message: "Error Updating Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Order" });
    }
  },
  remove_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const order = await order_services.remove_orders_s(params);
      if (order) {
        return res.status(204).send({ message: "Order Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  occurrences_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.occurrences_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  top_customers_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.top_customers_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  category_occurrences_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.category_occurrences_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  code_usage_orders_c: async (req: any, res: any) => {
    const { params, query } = req;
    try {
      const orders = await order_services.code_usage_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  affiliate_code_usage_orders_c: async (req: any, res: any) => {
    const { params, query } = req;
    try {
      const orders = await order_services.affiliate_code_usage_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  tax_rates_orders_c: async (req: any, res: any) => {
    try {
      const orders = await order_services.tax_rates_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  all_affiliate_code_usage_orders_c: async (req: any, res: any) => {
    const { params, query } = req;
    try {
      const orders = await order_services.all_affiliate_code_usage_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  promo_code_usage_orders_c: async (req: any, res: any) => {
    const { params, query } = req;
    try {
      const orders = await order_services.promo_code_usage_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  each_day_income_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.each_day_income_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  each_month_income_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.each_month_income_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  previous_income_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.previous_income_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  mark_as_shipped_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.mark_as_shipped_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  income_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.income_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  invoice_orders_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      return res.status(200).send(invoice({ order: body }));
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  eligible_for_review_orders_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const orders = await order_services.eligible_for_review_orders_s(body);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Order" });
    }
  },
  get_product_quantities_orders_c: async (req: any, res: any) => {
    try {
      const orders = await order_services.get_product_quantities_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_product_quantities_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_product_quantities_orders_c" });
    }
  },
  get_all_shipping_orders_c: async (req: any, res: any) => {
    try {
      const orders = await order_services.get_all_shipping_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_shipping_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_all_shipping_orders_c" });
    }
  },
  get_all_time_revenue_orders_c: async (req: any, res: any) => {
    try {
      const orders = await order_services.get_all_time_revenue_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_all_time_revenue_orders_c" });
    }
  },
  get_product_all_time_revenue_orders_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const orders = await order_services.get_product_all_time_revenue_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_product_all_time_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_product_all_time_revenue_orders_c" });
    }
  },
  get_product_range_revenue_orders_c: async (req: any, res: any) => {
    const { query, params } = req;
    try {
      const orders = await order_services.get_product_range_revenue_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_product_range_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_product_range_revenue_orders_c" });
    }
  },
  get_range_revenue_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_range_revenue_orders_c" });
    }
  },
  get_monthly_revenue_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.get_monthly_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_monthly_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_monthly_revenue_orders_c" });
    }
  },
  get_yearly_revenue_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.get_yearly_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_yearly_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_yearly_revenue_orders_c" });
    }
  },
  get_range_category_revenue_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_category_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_category_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_range_category_revenue_orders_c" });
    }
  },
  get_all_time_category_revenue_orders_c: async (req: any, res: any) => {
    try {
      const orders = await order_services.get_all_time_category_revenue_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_category_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_all_time_category_revenue_orders_c" });
    }
  },
  get_range_category_quantities_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_category_quantities_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_category_quantities_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_range_category_quantities_orders_c" });
    }
  },
  get_all_time_category_quantities_orders_c: async (req: any, res: any) => {
    try {
      const orders = await order_services.get_all_time_category_quantities_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_category_quantities_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_all_time_category_quantities_orders_c" });
    }
  },
  get_range_tips_orders_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_tips_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_tips_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: "Error get_range_tips_orders_c" });
    }
  }
};
