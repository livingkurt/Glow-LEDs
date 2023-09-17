import axios from "axios";

const content_routes = {
  get_display_content: () => {
    return axios.get("/api/contents/display");
  },
  export_gcode: (filename, gcode) => {
    return axios.post("/api/gcode", { filename, gcode });
  },
};

export default content_routes;
