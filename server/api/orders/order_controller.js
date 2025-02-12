import InvoiceTemplate from "../../email_templates/pages/InvoiceTemplate.js";
import affiliate_db from "../affiliates/affiliate_db.js";
import order_services from "./order_services.js";

export default {
  get_table_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_table_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_user_table_orders_c: async (req, res) => {
    const { query, params } = req;
    try {
      const orders = await order_services.get_user_table_orders_s(query, params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.findAll_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filters_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const order_filters = await order_services.create_filters_orders_s(query);
      if (order_filters) {
        return res.status(200).send(order_filters);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAllOld_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.findAllOld_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(404).send({ message: "Orders Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findMy_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const orders = await order_services.findMy_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_orders_c: async (req, res) => {
    const { params } = req;

    try {
      const order = await order_services.findById_orders_s(params);
      if (order) {
        return res.status(200).send(order);
      }
      return res.status(404).send({ message: "Order Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  place_order_orders_c: async (req, res) => {
    const { body } = req;

    try {
      const order = await order_services.place_order_orders_s(body);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(201).send(order);
      }
      return res.status(500).send(order);
    } catch (error) {
      if (error.orderId) {
        return res.status(500).send({
          error,
          message: error.message,
          orderId: error.orderId,
        });
      }
      res.status(500).send({ error, message: error.message });
    }
  },

  create_orders_c: async (req, res) => {
    const { body } = req;

    try {
      // Check if any orderItem has subcategory "sampler" and quantity greater than 1
      const hasSamplerWithQtyGreaterThanOne = body.orderItems.some(
        item => item.subcategory === "sampler" && item.quantity > 1
      );

      if (hasSamplerWithQtyGreaterThanOne) {
        return res.status(400).send({
          message: "Only one sampler pack allowed per order.",
        });
      }

      const order = await order_services.create_orders_s(body);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(201).send(order);
      }
      return res.status(500).send(order);
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_orders_c: async (req, res) => {
    const { params, body } = req;
    try {
      const order = await order_services.update_orders_s(params, body);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(200).send(order);
      }
      return res.status(500).send({ message: "Error Updating Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const order = await order_services.remove_orders_s(params);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(204).send({ message: "Order Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  occurrences_orders_c: async (req, res) => {
    try {
      const orders = await order_services.occurrences_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  top_customers_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const orders = await order_services.top_customers_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  category_occurrences_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const orders = await order_services.category_occurrences_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  code_usage_orders_c: async (req, res) => {
    const { params, query } = req;
    try {
      const orders = await order_services.code_usage_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  monthly_code_usage_orders_c: async (req, res) => {
    const { params, query } = req;
    try {
      const orders = await order_services.monthly_code_usage_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  tax_rates_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.tax_rates_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  invoice_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const order = await order_services.invoice_orders_s(params.id);

      if (order.user && order.user.affiliate) {
        const affiliate = await affiliate_db.findById_affiliates_db(order.user.affiliate);
        return res.status(200).send(InvoiceTemplate({ order, isSponsor: affiliate.sponsor }));
      } else {
        return res.status(200).send(InvoiceTemplate({ order, isSponsor: false }));
      }
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  eligible_for_review_orders_c: async (req, res) => {
    const { body } = req;
    try {
      const orders = await order_services.eligible_for_review_orders_s(body);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_product_quantities_orders_c: async (req, res) => {
    try {
      const orders = await order_services.get_product_quantities_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_product_quantities_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_all_shipping_orders_c: async (req, res) => {
    try {
      const orders = await order_services.get_all_shipping_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_shipping_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_all_time_revenue_orders_c: async (req, res) => {
    try {
      const orders = await order_services.get_all_time_revenue_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_product_range_revenue_orders_c: async (req, res) => {
    const { query, params } = req;
    try {
      const orders = await order_services.get_product_range_revenue_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_product_range_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_all_product_range_revenue_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_all_product_range_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_range_revenue_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_daily_revenue_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_daily_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_daily_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_monthly_revenue_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_monthly_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_monthly_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_yearly_revenue_orders_c: async (req, res) => {
    try {
      const orders = await order_services.get_yearly_revenue_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_yearly_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_monthly_revenue_product_orders_c: async (req, res) => {
    const { query, params } = req;
    try {
      const orders = await order_services.get_monthly_revenue_product_orders_s(params, query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_monthly_revenue_product_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_yearly_revenue_product_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const orders = await order_services.get_yearly_revenue_product_orders_s(params);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_yearly_revenue_product_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_range_category_revenue_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_category_revenue_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_category_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_all_time_category_revenue_orders_c: async (req, res) => {
    try {
      const orders = await order_services.get_all_time_category_revenue_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_category_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_range_tips_revenue_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_tips_reveune_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_tips_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_all_time_tips_revenue_orders_c: async (req, res) => {
    try {
      const orders = await order_services.get_all_time_tips_revenue_orders_s();
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_tips_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_range_gloves_data_orders_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.get_range_gloves_data_orders_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_all_time_tips_revenue_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  affiliate_earnings_c: async (req, res) => {
    const { query } = req;
    try {
      const orders = await order_services.affiliate_earnings_s(query);
      if (orders) {
        return res.status(200).send(orders);
      }
      return res.status(500).send({ message: "Error get_range_affiliate_earnings_code_usage_orders_c" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_multiple_orders_c: async (req, res) => {
    const { body } = req;
    try {
      const order = await order_services.remove_multiple_orders_s(body);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(204).send({ message: "Order Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_multiple_status_orders_c: async (req, res) => {
    const { body } = req;
    try {
      const order = await order_services.update_multiple_status_orders_s(body);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(204).send({ message: "Order Statuses Updated" });
      }
      return res.status(500).send({ message: "Error Updating Order Statuses" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  transfer_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const order = await order_services.transfer_orders_s(params);
      if (order) {
        return res.status(204).send({ message: "Order Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  sample_testing_orders_c: async (req, res) => {
    const { body } = req;
    try {
      const order = await order_services.sample_testing_orders_s(body);
      if (order) {
        return res.status(204).send({ message: "Order Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  test_delete_orders_c: async (req, res) => {
    const { params } = req;
    try {
      const order = await order_services.test_delete_orders_s(params);
      if (order) {
        return res.status(204).send({ message: "Order Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Order" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  pay_order_c: async (req, res) => {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    try {
      const order = await order_services.pay_order_s(id, paymentMethod);
      if (order) {
        console.log("ordersChanged socket triggered");
        req.io.emit("ordersChanged");
        return res.status(200).send(order);
      }
      return res.status(500).send(order);
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
