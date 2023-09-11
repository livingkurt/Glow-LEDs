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

export const determineCartTotal = (cartItems: any, isWholesaler: boolean) => {
  const today = new Date();
  let total = 0;
  if (cartItems) {
    cartItems.forEach((item: any) => {
      if (isWholesaler) {
        total = total + (item.wholesale_price || item.price) * item.qty;
      } else if (
        today >= new Date(item.sale_start_date) &&
        today <= new Date(item.sale_end_date) &&
        item.sale_price !== 0
      ) {
        total = total + item.sale_price * item.qty;
      } else {
        total = total + item.price * item.qty;
      }
    });
    return total;
  }
};
