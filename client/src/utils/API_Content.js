import axios from "axios";

const content_routes = {
  export_gcode: (filename, gcode) => {
    return axios.post("/api/gcode", { filename, gcode });
  },
};

export default content_routes;
