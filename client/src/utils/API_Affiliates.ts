import axios from "axios";

const affiliate_routes = {
  create_rave_mob_affiliates: (csv: any) => {
    return axios.put("/api/affiliates/create_rave_mob_affiliates", { csv });
  },
  findByPathname_affiliates_a: (affiliate_id: string) => {
    return axios.get("/api/affiliates/" + affiliate_id);
  }
};

export default affiliate_routes;
