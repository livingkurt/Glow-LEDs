import { IAffiliate } from "./affiliateTypes";
import { IPromo } from "./promoTypes";
import { IUser } from "./userTypes";

export interface ITeam {
  affiliates?: IAffiliate[];
  captain?: IUser;
  team_name?: string;
  instagram_handle?: string;
  _id?: string;
  facebook_name?: string;
  percentage_off?: number;
  promo_code?: string;
  public_code?: IPromo;
  private_code?: IPromo;
  years?: string;
  bio?: string;
  picture?: string;
  map?: string;
  images?: string[];
  pathname?: string;
  video?: string;
  link?: string;
  venmo?: string;
  promoter?: boolean;
  rave_mob?: boolean;
  sponsor?: boolean;
  active?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
