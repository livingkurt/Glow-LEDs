export const extractCodes = promos => {
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

export const determineCartTotal = (cartItems, isWholesaler) => {
  const today = new Date();
  let total = 0;
  if (cartItems) {
    cartItems.forEach(item => {
      if (isWholesaler) {
        total = total + (item.wholesale_price || item.price) * item.quantity;
      } else if (
        today >= new Date(item.sale_start_date) &&
        today <= new Date(item.sale_end_date) &&
        item.sale_price !== 0
      ) {
        total = total + item.sale_price * item.quantity;
      } else {
        total = total + item.price * item.quantity;
      }
    });
    return total;
  }
};

export const containsIncludedItems = (cartItems, includedProducts, includedCategories) => {
  return cartItems.some(item => includedProducts.includes(item.product) || includedCategories.includes(item.category));
};

// Function to check if the cart contains only excluded products/categories
export const containsOnlyExcludedItems = (cartItems, excludedProducts, excludedCategories) => {
  return cartItems.every(item => excludedProducts.includes(item.product) || excludedCategories.includes(item.category));
};
