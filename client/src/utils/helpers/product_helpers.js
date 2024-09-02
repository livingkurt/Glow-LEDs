export const generateProductUrl = cartItem => {
  const baseUrl = `/collections/all/products/${cartItem.pathname}`;
  const params = new URLSearchParams();

  cartItem.selectedOptions?.forEach((option, index) => {
    if (option && option.name && cartItem.currentOptions[index]) {
      params.append(cartItem.currentOptions[index].name, option.name);
    }
  });

  const queryString = params.toString();
  console.log({ queryString });
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
