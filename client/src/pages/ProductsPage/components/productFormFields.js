export const productFormFields = ({ products, users, categorys, product, chips, filaments }) => {
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
    sizing: {
      type: "text",
      label: "Sizing",
    },
    quantity: {
      type: "number",
      label: "Quantity",
      labelProp: "quantity",
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
    pathname: {
      type: "text",
      label: "Pathname",
      labelProp: "pathname",
    },
    size: {
      type: "text",
      label: "Size",
    },
    color: {
      type: "text",
      label: "Color",
    },
    color_code: {
      type: "text",
      label: "Color Code",
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
    processing_time: {
      type: "multi-select",
      label: "Processing Time",
      options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"],
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
    preorder: {
      type: "checkbox",
      label: "Preorder",
      labelProp: "preorder",
      defaultValue: false,
    },
    order: {
      type: "number",
      label: "Order",
    },
    item_group_id: {
      type: "text",
      label: "Item Group Id",
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

    product_type_title: {
      label: "Product Type",
      type: "title",
      align: "center",
      variant: "h6",
    },
    macro_product: {
      type: "checkbox",
      label: "Macro Product",
    },
    option: {
      type: "checkbox",
      label: "Option",
    },
    default_option: {
      type: "checkbox",
      label: "Default Option",
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

    color_product_title: {
      label: "Color Products",
      type: "title",
      align: "center",
      variant: "h6",
    },
    color_products: {
      type: "autocomplete_multiple",
      label: "Color Product",
      options: products,
      labelProp: "name",
    },
    color_product_name: {
      type: "text",
      label: "Color Product Name",
    },
    color_group_name: {
      type: "text",
      label: "Color Group Name",
    },
    color_images_object: {
      type: "image_upload",
      label: "Color Images",
      labelProp: "link",
      album: `${product.name} Color Images`,
    },
    color_product_group: {
      type: "checkbox",
      label: "Color Product Group",
    },
    secondary_color_product_title: {
      label: "Secondary Color Products",
      type: "title",
      align: "center",
      variant: "h6",
    },
    secondary_color_products: {
      type: "autocomplete_multiple",
      label: "Secondary Color Product",
      options: products,
      labelProp: "name",
    },
    secondary_color_product_name: {
      type: "text",
      label: "Secondary Color Product Name",
    },
    secondary_color_group_name: {
      type: "text",
      label: "Secondary Color Group Name",
    },
    secondary_product_group: {
      type: "checkbox",
      label: "Secondary Product Group",
    },
    secondary_group_name: {
      type: "text",
      label: "Secondary Group Name",
    },
    secondary_color_images_object: {
      type: "image_upload",
      label: "Secondary Color Images",
      labelProp: "link",
      album: `${product.name} Secondary Color Images`,
    },

    secondary_color_product_group: {
      type: "checkbox",
      label: "Secondary Color Product Group",
    },
    option_product_title: {
      label: "Option Products",
      type: "title",
      align: "center",
      variant: "h6",
    },
    option_product_name: {
      type: "text",
      label: "Option Product Name",
      labelProp: "option_product_name",
    },
    option_group_name: {
      type: "text",
      label: "Option Group Name",
    },
    option_product_group: {
      type: "check",
      label: "Option Product Group",
    },
    option_products: {
      type: "autocomplete_multiple",
      label: "Option Product",
      options: products,
      labelProp: "name",
    },
    option_images_object: {
      type: "image_upload",
      label: "Option Images",
      labelProp: "link",
      album: `${product.name} Option Images`,
    },
    secondary_product_title: {
      label: "Secondary Products",
      type: "title",
      align: "center",
      variant: "h6",
    },
    secondary_product_name: {
      type: "text",
      label: "Secondary Product Name",
      labelProp: "secondary_product_name",
    },
    secondary_products: {
      type: "autocomplete_multiple",
      label: "Secondary Product",
      options: products,
      labelProp: "name",
    },
    secondary_images_object: {
      type: "image_upload",
      label: "Secondary Images",
      labelProp: "link",
      album: `${product.name} Secondary Images`,
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
    rating: {
      type: "number",
      label: "Rating",
      default: 0,
    },
    numReviews: {
      type: "number",
      label: "Number of Reviews",
      default: 0,
    },
    reviews: {
      type: "array",
      title: "Reviews",
      itemSchema: {
        type: "object",
        fields: {
          user: {
            type: "autocomplete_single",
            label: "Users",
            options: users,
            labelProp: "user",
            getOptionLabel: option => (option ? `${option.first_name} ${option.last_name}` : ""),
          },
          first_name: {
            type: "text",
            label: "First Name",
            labelProp: "first_name",
          },
          last_name: {
            type: "text",
            label: "Last Name",
            labelProp: "last_name",
          },
          rating: {
            type: "number",
            label: "Rating",
            labelProp: "rating",
            required: true,
          },
          comment: {
            type: "text",
            label: "Comment",
            labelProp: "comment",
            required: true,
          },
        },
      },
    },
  };
};
