import axios from "axios";

const user_routes = {
  update_affiliate: (user, affiliate_id) => {
    return axios.put("/api/users/update_affiliate", { user, affiliate_id });
  },
  get_teams: affiliate_id => {
    return axios.get("/api/teams/affiliate/" + affiliate_id);
  },
  refresh_login: (access_token, refresh_token) => {
    return axios.put("/api/users/refresh_login", { access_token, refresh_token });
  },
};

export default user_routes;
