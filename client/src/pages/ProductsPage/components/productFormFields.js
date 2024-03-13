import { toCapitalize } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { saveToEditProductHistory } from "../productsPageSlice";

export const productFormFields = ({ products, users, categorys, product, chips, filaments, dispatch }) => {
  return {
    product_info_title: {
      label: "Product Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    name: {
      type: "text",
      label: "Name",
      required: true,
    },
    description: {
      type: "text_multiline",
      label: "Description",
    },
    facts: {
      type: "text_multiline",
      label: "Facts",
    },
    included_items: {
      type: "text_multiline",
      label: "Included Items",
    },
    quantity: {
      type: "number",
      label: "Quantity",
      labelProp: "quantity",
    },
    color: {
      type: "text",
      label: "Color",
    },
    color_code: {
      type: "text",
      label: "Color Code",
    },
    size: {
      type: "text",
      label: "Size",
    },
    count_in_stock: {
      type: "number",
      label: "Count in Stock",
      default: 30,
      required: true,
    },
    finite_stock: {
      type: "checkbox",
      label: "Finite Stock",
      default: false,
    },
    hidden: {
      type: "checkbox",
      label: "Hidden",
      labelProp: "hidden",
      defaultValue: false,
    },
    sold_out: {
      type: "checkbox",
      label: "Sold Out",
      defaultValue: false,
    },
    preorder: {
      type: "checkbox",
      label: "Preorder",
      labelProp: "preorder",
      defaultValue: false,
    },
    pathname: {
      type: "text",
      label: "Pathname",
      labelProp: "pathname",
    },

    images_object: {
      type: "image_upload",
      label: "Images",
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: option => option.link,
    },
    video: {
      type: "text",
      label: "Video",
    },

    processing_time: {
      type: "multi-select",
      label: "Processing Time",
      options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"],
    },

    order: {
      type: "number",
      label: "Order",
    },
    prices_title: {
      label: "Prices",
      type: "title",
      align: "center",
      variant: "h6",
    },
    price: {
      type: "number",
      label: "Price",
    },
    previous_price: {
      type: "number",
      label: "Previous Price",
    },
    wholesale_price: {
      type: "number",
      label: "Wholesale Price",
    },
    wholesale_product: {
      type: "checkbox",
      label: "Wholesale Product",
    },
    extra_cost: {
      type: "number",
      label: "Extra Cost",
    },
    add_on_price: {
      type: "number",
      label: "Add-On Price",
      labelProp: "add_on_price",
    },
    has_add_on: {
      type: "checkbox",
      label: "Has Add-On",
      labelProp: "has_add_on",
    },
    category_title: {
      label: "Categories",
      type: "title",
      align: "center",
      variant: "h6",
    },
    category: {
      type: "text",
      label: "Category",
      required: true,
    },
    subcategory: {
      type: "text",
      label: "Subcategory",
    },
    product_collection: {
      type: "text",
      label: "Product Collection",
    },
    categorys: {
      type: "autocomplete_multiple",
      label: "Categorys",
      options: categorys,
      labelProp: "name",
    },
    subcategorys: {
      type: "autocomplete_multiple",
      label: "Subcategorys",
      options: categorys,
      labelProp: "name",
    },
    collections: {
      type: "autocomplete_multiple",
      label: "Collections",
      options: categorys,
      labelProp: "name",
    },

    options: {
      type: "array",
      label: item => item.name,
      title: "Product Options",
      itemSchema: {
        type: "object",
        fields: {
          name: {
            type: "text",
            label: "Option Name",
            labelProp: "name",
          },
          optionType: {
            type: "autocomplete_single",
            label: "Option Type",
            getOptionLabel: option => {
              if (typeof option === "string") {
                return toCapitalize(option);
              }
            },
            options: ["dropdown", "buttons"],
          },
          isAddOn: {
            type: "checkbox",
            label: "Is Add-On",
          },
          values: {
            type: "array",
            title: "Option Choices",
            label: item => item.value,
            itemSchema: {
              type: "object",
              fields: {
                value: { type: "text", label: "Value" },
                isDefault: { type: "checkbox", label: "Default Option" },
                replacePrice: { type: "checkbox", label: "Option Price Replaces Price" },
                additionalCost: { type: "number", label: "Additional Cost" },
                product: {
                  type: "autocomplete_single",
                  label: "Option Product",
                  options: products,
                  labelProp: "name",
                  onEditButtonClick: selectedProduct => {
                    dispatch(saveToEditProductHistory(product));
                    dispatch(API.detailsProduct(selectedProduct._id));
                  },
                  onCreateNewButtonClick: selectedProduct => {
                    console.log(selectedProduct);
                    dispatch(saveToEditProductHistory(product));
                    dispatch(API.saveProduct({ ...selectedProduct }));
                  },
                  showEditButton: true,
                },
                images: {
                  type: "image_upload",
                  image_type: "object",
                  label: "Images",
                  labelProp: "images",
                  album: `${product.name} Images`,
                },
              },
            },
          },
        },
      },
    },
    chips: {
      type: "autocomplete_multiple",
      label: "Chips",
      options: chips,
      labelProp: "name",
    },
    filament: {
      type: "autocomplete_single",
      label: "Filament",
      options: filaments,
      getOptionLabel: option => (option ? `${option.color} ${option.type}` : ""),
      labelProp: "name",
    },
    contributers: {
      type: "autocomplete_multiple",
      label: "Contributers",
      options: users,
      labelProp: "first_name",
    },
    meta_data_title: {
      label: "Meta Data",
      type: "title",
      align: "center",
      variant: "h6",
    },
    meta_title: {
      type: "text",
      label: "Meta Title",
    },
    meta_description: {
      type: "text_multiline",
      label: "Meta Description",
    },
    meta_keywords: {
      type: "text_multiline",
      label: "Meta Keywords",
    },

    dimension_title: {
      label: "Dimensions",
      type: "title",
      align: "center",
      variant: "h6",
    },
    product_length: {
      type: "number",
      label: "Product Length",
    },
    product_width: {
      type: "number",
      label: "Product Width",
    },
    product_height: {
      type: "number",
      label: "Product Height",
    },
    package_length: {
      type: "number",
      label: "Package Length",
    },
    package_width: {
      type: "number",
      label: "Package Width",
    },
    package_height: {
      type: "number",
      label: "Package Height",
    },
    package_volume: {
      type: "number",
      label: "Package Volume",
    },
    weight_pounds: {
      type: "number",
      label: "Weight (lbs)",
    },
    weight_ounces: {
      type: "number",
      label: "Weight (oz)",
    },
    sale_title: {
      label: "Sale Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    sale_price: {
      type: "number",
      label: "Sale Price",
      labelProp: "sale_price",
      defaultValue: 0,
    },
    sale_start_date: {
      type: "date",
      label: "Sale Start Date",
      labelProp: "sale_start_date",
    },
    sale_end_date: {
      type: "date",
      label: "Sale End Date",
      labelProp: "sale_end_date",
    },

    manufacturing_info_title: {
      label: "Manufacturing Info",
      type: "title",
      align: "center",
      variant: "h6",
    },
    material_cost: {
      type: "number",
      label: "Material Cost",
    },
    filament_used: {
      type: "number",
      label: "Filament Used",
    },
    printing_time: {
      type: "number",
      label: "Printing Time",
    },
    assembly_time: {
      type: "number",
      label: "Assembly Time",
    },
  };
};
