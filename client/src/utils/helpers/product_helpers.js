export const generateProductUrl = cartItem => {
  if (cartItem.itemType === "ticket") {
    return `/events/${cartItem?.event_pathname}`;
  }
  const baseUrl = `/products/${cartItem.pathname}`;
  const params = new URLSearchParams();

  cartItem.selectedOptions?.forEach((option, index) => {
    if (option && option.name && cartItem.currentOptions[index]) {
      params.append(cartItem.currentOptions[index].name, option.name);
    }
  });

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
