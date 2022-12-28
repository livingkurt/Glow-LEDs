import { IAffiliate } from "./affiliateTypes";
import { IUser } from "./userTypes";

export interface IPromo {
  affiliate: IAffiliate;
  user: IUser;
  promo_code: string;
  admin_only: boolean;
  affiliate_only: boolean;
  sponsor_only: boolean;
  excluded_categories: string[];
  included_categories: string[];
  included_products: string[];
  excluded_products: string[];
  percentage_off: number;
  free_shipping: boolean;
  exclude: boolean;
  include: boolean;
  amount_off: number;
  single_use: boolean;
  time_limit: boolean;
  start_date: Date;
  end_date: Date;
  used_once: boolean;
  minimum_total: number;
  active: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
