import { IProduct } from "./productTypes";
import { IUser } from "./userTypes";

interface IShipping {
  shipment_id?: string;
  shipping_rate?: any;
  shipping_label?: any;
  shipment_tracking?: any;
  return_shipment_id?: string;
  return_shipping_rate?: any;
  return_shipping_label?: any;
  return_shipment_tracking?: any;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  international?: boolean;
  country?: string;
}

interface IPayment {
  paymentMethod?: string;
  payment?: any;
  charge?: any;
  refund?: any[];
  refund_reason?: any[];
}

interface IMessage {
  message?: string;
  user?: boolean;
  admin?: boolean;
  deleted?: boolean;
}

interface IProductOptions {
  name?: string;
  price?: number;
  sale_price?: number;
  size?: number;
  color?: string;
}

interface IOrderItem {
  name?: string;
  qty?: number;
  display_image?: string;
  secondary_image?: string;
  color?: string;
  secondary_color?: string;
  color_group_name?: string;
  is_printing?: boolean;
  is_manufactured?: boolean;
  is_packaged?: boolean;
  secondary_color_group_name?: string;
  secondary_color_code?: string;
  secondary_group_name?: string;
  option_group_name?: string;
  color_code?: string;
  price?: number;
  add_on_price?: number;
  show_add_on?: boolean;
  category?: string;
  count_in_stock?: number;
  subcategory?: string;
  pathname?: string;
  size?: string;
  preorder?: boolean;
  sale_price?: number;
  package_volume?: number;
  weight_pounds?: number;
  weight_ounces?: number;
  length?: number;
  width?: number;
  height?: number;
  package_length?: number;
  package_width?: number;
  package_height?: number;
  reviewed?: boolean;
  product_option?: IProductOptions;
  product?: IProduct;
  color_product?: IProduct;
  color_product_name?: string;
  secondary_color_product?: IProduct;
  secondary_color_product_name?: string;
  secondary_product?: IProduct;
  option_product_name?: string;
  option_product?: IProduct;
  secondary_product_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// interface OrderItem {
//   name?: string;
//   qty?: number;
//   display_image?: string;
//   secondary_image?: string;
//   color?: string;
//   secondary_color?: string;
//   color_group_name?: string;
//   is_printing?: boolean;
//   is_manufactured?: boolean;
//   is_packaged?: boolean;
//   secondary_color_group_name?: string;
//   secondary_color_code?: string;
//   secondary_group_name?: string;
//   option_group_name?: string;
//   color_code?: string;
//   price?: number;
//   add_on_price?: number;
//   show_add_on?: boolean;
//   category?: string;
//   count_in_stock?: number;
//   subcategory?: string;
//   pathname?: string;
//   size?: string;
//   preorder?: boolean;
//   sale_price?: number;
//   package_volume?: number;
//   weight_pounds?: number;
//   weight_ounces?: number;
//   length?: number;
//   width?: number;
//   height?: number;
//   package_length?: number;
//   package_width?: number;
//   package_height?: number;
//   reviewed?: boolean;
//   product_option?: ProductOptions;
//   product?: IProduct;
//   color_product?: IProduct;
//   color_product_name?: string;
//   secondary_color_product?: IProduct;
//   secondary_color_product_name?: string;
//   color_product_image?: string;
//   secondary_color_product_image?: string;
//   material_type?: string;
//   material_type_secondary?: string;
//   shipping_cost?: number;
//   tax?: number;
//   printing_cost?: number;
//   manufacturing_cost?: number;
//   add_on_cost?: number;
//   original_price?: number;
//   total_price?: number;
//   shipping_tracking_number?: string;
//   shipping_label?: object;
//   shipping_label_return?: object;
//   shipping_tracking_number_return?: string;
//   shipping_cost_return?: number;
//   is_custom_order?: boolean;
//   message?: string;
//   confirmation_email_sent?: boolean;
//   shipping_email_sent?: boolean;
//   return_email_sent?: boolean;
//   is_return?: boolean;
//   return_qty?: number;
//   return_reason?: string;
//   return_approved?: boolean;
//   return_cancelled?: boolean;
//   return_complete?: boolean;
//   return_message?: string;
//   return_request_date?: Date;
//   return_approved_date?: Date;
//   return_cancelled_date?: Date;
//   return_complete_date?: Date;
//   is_exchange?: boolean;
//   exchange_qty?: number;
//   exchange_reason?: string;
//   exchange_approved?: boolean;
//   exchange_cancelled?: boolean;
//   exchange_complete?: boolean;
//   exchange_message?: string;
//   exchange_request_date?: Date;
//   exchange_approved_date?: Date;
//   exchange_cancelled_date

export interface IOrder {
  user?: IUser;
  shipping?: IShipping;
  payment?: IPayment;
  message?: IMessage[];
  order_items?: IOrderItem[];
  order_number?: string;
  subtotal?: number;
  tax?: number;
  discount?: number;
  shipping_cost?: number;
  total?: number;
  order_date?: Date;
  shipped?: boolean;
  shipped_date?: Date;
  delivered?: boolean;
  delivered_date?: Date;
  delivered_to?: string;
  order_cancelled?: boolean;
  cancel_reason?: string;
  order_returned?: boolean;
  return_reason?: string;
  return_requested?: boolean;
  return_request_reason?: string;
  return_approved?: boolean;
  return_approved_reason?: string;
  return_shipped?: boolean;
  return_shipped_date?: Date;
  return_delivered?: boolean;
  return_delivered_date?: Date;
  active?: boolean;
  deleted?: boolean;
}
