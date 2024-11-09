import axios from "axios";

const microlight_routes = {
  get_microlight_by_name: name => {
    return axios.get("/api/microlights/" + name);
  },
};

export default microlight_routes;
