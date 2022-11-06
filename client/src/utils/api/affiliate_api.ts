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
// export default {
//   findAll_affiliates_a: async ({}) => {
//     return axios.put("/api/affiliates/", { data });
//   },
//   findById_affiliates_a: async ({}) => {
//     return axios.put("/api/affiliates/", { data });
//   },
//   create_affiliates_a: async ({}) => {
//     return axios.put("/api/affiliates/", { data });
//   },
//   update_affiliates_a: async ({}) => {
//     return axios.put("/api/affiliates/", { data });
//   },
//   upload_rave_mob_asv_affiliates_a: async ({}) => {
//     return axios.put("/api/affiliates/", { data });
//   },
//   remove_affiliates_a: async ({}) => {
//     return axios.put("/api/affiliates/", { data });
//   }
// };
