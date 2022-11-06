import axios from "axios";

const affiliate_routes = {
  upload_rave_mob_csv: (csv: any) => {
    return axios.put("/api/affiliates/upload_rave_mob_csv", { csv });
  },
  findById_affiliates_a: (affiliate_id: string) => {
    return axios.get("/api/affiliates/" + affiliate_id);
  }
};

export default affiliate_routes;
