import axios from "axios";

const promo_routes = {
  update_discount: (year, month) => {
    return axios.put(`/api/promos/update_discount/${year}${month ? "/" + month : ""}`);
  },
  // update_promo_code: (private_code_id, percentage_off) => {
  // 	return axios.put('/api/promos/update_discount', { private_code_id, percentage_off });
  // },
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
