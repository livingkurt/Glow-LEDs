import { IAffiliate } from "../../types/affiliateTypes";

export const determine_code_tier = (affiliate: IAffiliate, code_usage: number) => {
  if (affiliate.promoter) {
    if (code_usage === 0 || code_usage === 1) {
      return 10;
    } else if (code_usage >= 2 && code_usage <= 5) {
      return 20;
    } else if (code_usage >= 6 && code_usage <= 9) {
      return 25;
    } else if (code_usage >= 10 && code_usage <= 13) {
      return 30;
    } else if (code_usage >= 14 && code_usage <= 17) {
      return 35;
    } else if (code_usage >= 18 && code_usage <= 21) {
      return 40;
    } else if (code_usage >= 22) {
      return 50;
    }
  } else if (affiliate.sponsor) {
    if (code_usage === 0 || code_usage === 1) {
      return 30;
    } else if (code_usage >= 2 && code_usage <= 5) {
      return 35;
    } else if (code_usage >= 6 && code_usage <= 9) {
      return 40;
    } else if (code_usage >= 10 && code_usage <= 14) {
      return 50;
    } else if (code_usage >= 15) {
      return 60;
    } else if (code_usage >= 20) {
      return 75;
    }
  }
};
