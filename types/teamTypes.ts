import { IAffiliate } from "./affiliateTypes";

export interface ITeam {
  affiliates: IAffiliate[];
  team_name: string;
  instagram_handle: string;
  facebook_name: string;
  percentage_off: number;
  promo_code: string;
  public_code: string;
  private_code: string;
  years: string;
  bio: string;
  picture: string;
  map: string;
  images: string[];
  pathname: string;
  video: string;
  link: string;
  venmo: string;
  promoter: boolean;
  rave_mob: boolean;
  sponsor: boolean;
  active: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
