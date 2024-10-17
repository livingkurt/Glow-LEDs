import axios from "axios";

const revenue_routes = {
  get_previous_income: (time) => {
    return axios.get("/api/orders/previous_income/" + time);
  },
  create_all_expenses_s: (data, user, card, properties: Array<string>) => {
    return axios.post(
      "/api/expenses/create_all_expenses_s",
      { data, card, properties },
      {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      }
    );
  },
};

export default revenue_routes;
