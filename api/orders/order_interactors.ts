// export const normalizeOrderFilters = (input: any) => {
//   const output: any = {};
//   for (const status of input.order_status) {
//     output[status] = true;
//   }
//   return output;
// };
export const normalizeOrderFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    if (key === "order_status") {
      for (const status of input.order_status) {
        output[status] = true;
      }
    } else if (key === "shipping") {
      for (const shipping of input.shipping) {
        output[`shipping.${shipping}`] = true;
      }
    }
  });
  return output;
};
