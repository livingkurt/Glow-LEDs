import axios from "axios";

const promo_routes = {
  get_promo: promo_code => {
    return axios.get("/api/promos/code/" + promo_code);
  },
  create_one_time_use_code: () => {
    return axios.put("/api/promos/create_one_time_use_code");
  },
  refresh_sponsor_codes: () => {
    return axios.put(`/api/promos/refresh_sponsor_codes`);
  },
  promo_code_used: promo_code => {
    return axios.put("/api/promos/code/" + promo_code);
  },
};

export default promo_routes;
