export const generateProductUrl = cartItem => {
  if (cartItem.itemType === "ticket") {
    return `/pages/events/${cartItem?.event_pathname}`;
  }
  const baseUrl = `/collections/all/products/${cartItem.pathname}`;
  const params = new URLSearchParams();

  cartItem.selectedOptions?.forEach((option, index) => {
    if (option && option.name && cartItem.currentOptions[index]) {
      params.append(cartItem.currentOptions[index].name, option.name);
    }
  });

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
