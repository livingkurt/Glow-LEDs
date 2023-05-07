import axios from "axios";

const shipping_routes = {
  get_all_shipping: () => {
    return axios.get("/api/shipping");
  },
  get_shipping_rates: (order: any, verify_shipping: boolean) => {
    return axios.put("/api/shipping/shipping_rates", {
      order,
      verify_shipping
    });
  },
  create_label: (order: any, shipping_rate: number, speed: string) => {
    return axios.put("/api/shipping/create_label", {
      order,
      shipping_rate,
      speed
    });
  },
  get_custom_shipping_rates: (data: any) => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.put(
      "/api/shipping/get_custom_shipping_rates",
      { data },
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
  },
  get_different_shipping_rates: (data: any) => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.put(
      "/api/shipping/get_different_shipping_rates",
      { data },
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
  },
  add_tracking_number: (order: any, tracking_number: any, label: any) => {
    return axios.put("/api/shipping/tracking_number", {
      order,
      tracking_number,
      label
    });
  },
  buy_label: (shipment_id: any, shipping_rate: any) => {
    return axios.put("/api/shipping/buy_label", { shipment_id, shipping_rate });
  },
  create_return_label: (order: any, shipping_rate: number) => {
    return axios.put("/api/shipping/create_return_label", {
      order,
      shipping_rate
    });
  },
  add_return_tracking_number: (order: any, tracking_number: any, label: any) => {
    return axios.put("/api/shipping/return_tracking_number", {
      order,
      tracking_number,
      label
    });
  }
};

export default shipping_routes;
