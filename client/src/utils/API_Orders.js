import axios from "axios";
import { create_query } from "./helper_functions";

const order_routes = {
  findAll_orders_a: () => {
    return axios.get("/api/orders/?limit=0&page=1");
  },
  findById_orders_a: order_id => {
    return axios.get("/api/orders/guest/" + order_id);
  },
  get_invoice: orderId => {
    return axios.get(`/api/orders/${orderId}/invoice`);
  },
  top_customers: () => {
    return axios.get("/api/orders/top_customers");
  },
  monthly_expenses: (date_1, date_2) => {
    return axios.put("/api/expenses/monthly_expenses", { date_1, date_2 });
  },
  all_affiliate_code_usage_orders_a: arg => {
    return axios.get(
      `/api/orders/all_affiliate_code_usage/${arg.year}${arg.month ? "/" + arg.month : ""}${
        arg.position ? `?position=${arg.position}` : ""
      }`
    );
  },
  affiliate_code_usage_orders_a: (promo_code, query) => {
    return axios.get(`/api/orders/affiliate_code_usage/${promo_code}?${create_query(query)}`);
  },
  promo_code_usage_orders_a: (year, month, query) => {
    //
    return axios.get(`/api/orders/promo_code_usage/${year}${month ? "/" + month : ""}?${create_query(query)}`);
  },
};

export default order_routes;
