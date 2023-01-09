import axios from "axios";

const promo_routes = {
  update_discount: (year: any, month: any) => {
    return axios.put(`/api/promos/update_discount/${year}${month ? "/" + month : ""}`);
  },
  // update_promo_code: (private_code_id: any, percentage_off: number) => {
  // 	return axios.put('/api/promos/update_discount', { private_code_id, percentage_off });
  // },
  get_promo: (promo_code: any) => {
    return axios.get("/api/promos/code/" + promo_code);
  },
  create_one_time_use_code: () => {
    return axios.put("/api/promos/create_one_time_use_code");
  },
  create_sponsor_codes: () => {
    return axios.put(`/api/promos/create_sponsor_codes`);
  },
  promo_code_used: (promo_code: any) => {
    return axios.put("/api/promos/code/" + promo_code);
  }
};

export default promo_routes;
