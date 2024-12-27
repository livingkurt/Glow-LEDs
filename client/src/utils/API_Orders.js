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
};

export default order_routes;
