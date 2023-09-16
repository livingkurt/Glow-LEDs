import axios from "axios";

const shipping_routes = {
  get_all_shipping: () => {
    return axios.get("/api/shipping");
  },
  get_shipping_rates: (order, verify_shipping) => {
    return axios.put("/api/shipping/shipping_rates", {
      order,
      verify_shipping,
    });
  },
  create_label: (order, shipping_rate, speed) => {
    return axios.put("/api/shipping/create_label", {
      order,
      shipping_rate,
      speed,
    });
  },
  get_custom_shipping_rates: data => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.put(
      "/api/shipping/get_custom_shipping_rates",
      { data },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  get_different_shipping_rates: data => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.put(
      "/api/shipping/get_different_shipping_rates",
      { data },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  add_tracking_number: (order, tracking_number, label) => {
    return axios.put("/api/shipping/tracking_number", {
      order,
      tracking_number,
      label,
    });
  },
  buy_label: (shipment_id, shipping_rate) => {
    return axios.put("/api/shipping/buy_label", { shipment_id, shipping_rate });
  },
  create_return_label: (order, shipping_rate) => {
    return axios.put("/api/shipping/create_return_label", {
      order,
      shipping_rate,
    });
  },
  add_return_tracking_number: (order, tracking_number, label) => {
    return axios.put("/api/shipping/return_tracking_number", {
      order,
      tracking_number,
      label,
    });
  },
};

export default shipping_routes;
