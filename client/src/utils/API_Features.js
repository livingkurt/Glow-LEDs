import axios from "axios";

const feature_routes = {
  get_features_by_category: category => {
    return axios.get("/api/features?category=" + category);
  },
  findById_features_a: feature_id => {
    return axios.get("/api/features/" + feature_id);
  },
};

export default feature_routes;
