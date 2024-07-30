export const productGridPageBreadCrumbs = breadCrumbs => {
  const { category, subcategory, collection } = breadCrumbs;
  return [
    { name: "ALL PRODUCTS", to: "/collections/all/products" },
    { name: category?.toUpperCase().split("_").join(" "), to: `/collections/all/products/?tags[]=${category}` },
    {
      name: subcategory?.toUpperCase().split("_").join(" "),
      to: `/collections/all/products/?tags[]=${category}&tags[]=${subcategory}`,
    },
    {
      name: collection?.toUpperCase().split("_").join(" "),
      to: `/collections/all/products/?tags[]=${category}&tags[]=${subcategory}&tags[]=${collection}`,
    },
  ];
};
