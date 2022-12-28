import { IChip } from "./chipTypes";
import { IProduct } from "./productTypes";
import { IPromo } from "./promoTypes";
import { IUser } from "./userTypes";

export interface IAffiliate {
  user: IUser;
  products: IProduct[];
  chips: IChip[];
  artist_name: string;
  instagram_handle: string;
  facebook_name: string;
  tiktok: string;
  percentage_off: number;
  public_code: IPromo;
  private_code: IPromo;
  location: string;
  years: string;
  bio: string;
  picture: string;
  video: string;
  style: string;
  inspiration: string;
  link: string;
  venmo: string;
  pathname: string;
  answers: any[];
  promoter: boolean;
  rave_mob: boolean;
  team: boolean;
  sponsor: boolean;
  active: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IListAffiliate {
  category?: string;
  search?: string;
  sort?: string;
  sponsor?: boolean;
}

export interface ISaveAffiliate {
  _id: string;
  user?: string;
  artist_name?: string;
  instagram_handle?: string;
  facebook_name?: string;
  percentage_off?: string | number;
  sponsor?: string;
  promoter?: string;
  rave_mob?: string;
  active?: string;
  bio?: string;
  link?: string;
  picture?: string;
  team?: string;
  style?: string;
  inspiration?: string;
  location?: string;
  years?: string;
  video?: string;
  venmo?: string;
  public_code?: string;
  private_code?: string;
  pathname: string;
  products?: IProduct[];
  chips?: string[];
  tiktok?: string;
  answers?: false | "" | string[];
}
