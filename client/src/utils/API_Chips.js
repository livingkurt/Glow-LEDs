import axios from "axios";

const chip_routes = {
  get_chip_by_name: name => {
    return axios.get("/api/chips/" + name);
  },
};

export default chip_routes;
