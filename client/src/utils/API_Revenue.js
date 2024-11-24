import axios from "axios";

const revenue_routes = {
  create_all_expenses_s: (data, user, card, properties) => {
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
