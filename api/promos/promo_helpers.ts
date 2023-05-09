export const extractCodes = (promos: any) => {
  let refreshCode, twentyFiveOffCode;

  for (let i = 0; i < promos.length; i++) {
    if (promos[i].promo_code.startsWith("r")) {
      refreshCode = promos[i].promo_code;
    } else {
      twentyFiveOffCode = promos[i].promo_code;
    }
  }
  return { twentyFiveOffCode, refreshCode };
};
