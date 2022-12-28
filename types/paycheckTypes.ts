import { IAffiliate } from "./affiliateTypes";
import { ITeam } from "./teamTypes";

export interface IPaycheck {
  affiliate: IAffiliate;
  team: ITeam;
  amount: number;
  revenue: number;
  earned: number;
  promo_code: string;
  uses: number;
  venmo: string;
  paid: boolean;
  paid_at: Date;
  reciept: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
