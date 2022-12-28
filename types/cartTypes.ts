import { IProduct } from "./productTypes";
import { IUser } from "./userTypes";

export interface ICart {
  cartItems: ICartItem[];
  user: IUser;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  name: string;
  qty: number;
  display_image: string;
  secondary_image: string;
  color: string;
  secondary_color: string;
  color_group_name: string;
  secondary_color_group_name: string;
  color_code: string;
  secondary_color_code: string;
  price: number;
  category: string;
  pathname: string;
  size: number;
  preorder: boolean;
  sale_price: number;
  sale_start_date: Date;
  sale_end_date: Date;
  package_volume: number;
  weight_pounds: number;
  weight_ounces: number;
  count_in_stock: number;
  length: number;
  width: number;
  height: number;
  package_length: number;
  package_width: number;
  package_height: number;
  product: IProduct;
  color_product: IProduct;
  color_product_name: string;
  secondary_color_product: IProduct;
  secondary_color_product_name: string;
  option_product_name: string;
  option_product: IProduct;
  secondary_product_name: string;
  secondary_product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}
