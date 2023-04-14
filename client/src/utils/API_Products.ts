import axios from "axios";
import { create_query } from "./helper_functions";

const product_routes = {
  findAllGrid_products_a: (query: any) => {
    return axios.get(`/api/products/grid?${create_query(query)}`);
  },
  findById_products_a: (id: any) => {
    return axios.get("/api/products/" + id);
  },
  compress_images: (images: any) => {
    return axios.post("/api/products/compress_images", { images });
  },
  image_upload_products_a: (formData: any) => {
    return axios.post("/api/image_upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  findByPathname_products_a: (pathname: any) => {
    return axios.get("/api/products/" + pathname);
  },
  create_products_a: (body: any) => {
    return axios.post("/api/products", body);
  },
  update_product_a: (body: any) => {
    return axios.put("/api/products", body);
  },
  update_product_order: (state: any) => {
    return axios.put("/api/products/update_product_order", { state });
  },
  add_product_options: (id: string, ids: any, type: string) => {
    return axios.put("/api/products/add_product_options", { id, ids, type });
  },
  update_stock: (cartItems: any) => {
    return axios.put("/api/products/update_stock", { cartItems });
  },
  get_occurrences: () => {
    return axios.get("/api/orders/occurrences");
  },
  get_category_occurrences: () => {
    return axios.get("/api/orders/category_occurrences");
  },
  get_best_sellers: (occurences: any) => {
    return axios.post("/api/products/best_sellers", { occurences });
  },
  save_item_group_id: (option: any, item_group: any) => {
    return axios.put("/api/products/save_item_group_id", {
      option,
      item_group
    });
  },
  get_our_picks: () => {
    return axios.get("/api/products/our_picks");
  },
  get_new_releases: () => {
    return axios.get("/api/products/new_releases");
  },
  set_sale_price: (discount_percentage: any, sale_start_date: any, sale_end_date: any) => {
    return axios.put("/api/all/product_sale_price", {
      discount_percentage,
      sale_start_date,
      sale_end_date
    });
  },
  clear_sale: (sale_start_date: any, sale_end_date: any) => {
    return axios.put("/api/all/clear_sale", { sale_start_date, sale_end_date });
  },
  batch_request: (
    method: string,
    collection: string,
    search_parameter_field: string,
    search_parameter: string,
    action: string,
    property: string,
    value: string,
    user: any
  ) => {
    return axios.put(
      "/api/all/" + collection,
      {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value
      },
      {
        headers: {
          Authorization: "Bearer " + user.access_token
        }
      }
    );
  }
};

export default product_routes;
