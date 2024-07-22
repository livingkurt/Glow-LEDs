export const productGridPageBreadCrumbs = breadCrumbs => {
  const { category, subcategory, collection } = breadCrumbs;
  return [
    { name: "ALL PRODUCTS", to: "/collections/all/products" },
    { name: category?.toUpperCase().split("_").join(" "), to: `/collections/all/products/category/${category}` },
    {
      name: subcategory?.toUpperCase().split("_").join(" "),
      to: `/collections/all/products/category/${category}/subcategory/${subcategory}`,
    },
    {
      name: collection?.toUpperCase().split("_").join(" "),
      to: `/collections/all/products/category/${category}/subcategory/${subcategory}/collection/${collection}`,
    },
  ];
};
