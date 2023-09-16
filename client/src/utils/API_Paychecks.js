import axios from "axios";

const paycheck_routes = {
  create_affiliate_paychecks_a: (type, year, month) => {
    return axios.get(`/api/paychecks/pay/${type}/${year}/${month}`);
  },
  delete_multiple_paychecks: (ids[]) => {
    return axios.post(`/api/paychecks/delete_multiple`, { ids });
  },
};

export default paycheck_routes;
