import { isSafari } from "react-device-detect";

export const productGridPageBreadCrumbs = breadCrumbs => {
  const { category, subcategory, collection } = breadCrumbs;
  return [
    { name: "ALL PRODUCTS", to: "/products" },
    { name: category?.toUpperCase().split("_").join(" "), to: `/products/?tags[]=${category}` },
    {
      name: subcategory?.toUpperCase().split("_").join(" "),
      to: `/products/?tags[]=${category}&tags[]=${subcategory}`,
    },
    {
      name: collection?.toUpperCase().split("_").join(" "),
      to: `/products/?tags[]=${category}&tags[]=${subcategory}&tags[]=${collection}`,
    },
  ];
};

// Utility function to convert string to snake_case
export const toSnakeCase = str => str.toLowerCase().replace(/\s+/g, "_");

export const sortOptions = [
  { label: "Highest Price", value: "-price" },
  { label: "Lowest Price", value: "price" },
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
];

export const autocompleteStyle = {
  width: "100%",
  mb: 1,
  "& .MuiOutlinedInput-root": {
    color: "white",
    transition: "box-shadow 0.3s ease-in-out",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&:hover": {
      borderColor: "white",
      boxShadow: `0 12px 24px 0 rgb(255 255 255 / 50%)`,
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      boxShadow: `0 12px 24px 0 rgb(255 255 255 / 50%)`,
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "white",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "white",
  },
  "& .MuiChip-root": {
    backgroundColor: "white",
    color: "black",
    fontWeight: isSafari ? 699 : 700,
  },
  "& .MuiChip-deleteIcon": {
    color: "black",
  },
};

export const toggleButtonStyle = {
  color: "white",
  borderColor: "white",
  "&.Mui-selected": {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};
export const selectStyle = {
  color: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  ".MuiSvgIcon-root": {
    color: "white",
  },
};
