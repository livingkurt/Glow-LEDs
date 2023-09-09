export const productFormFields = ({
  products,
  users,
  // images,
  categorys,
  setState,
  product,
  onEdit,
  chips,
}: {
  products: any;
  users: any;
  // images: any;
  categorys: any;
  chips: any;
  setState: any;
  product: any;
  onEdit: any;
}) => {
  return {
    name: {
      type: "text",
      label: "Name",
      required: true,
    },
    price: {
      type: "number",
      label: "Price",
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
    brand: {
      type: "text",
      label: "Brand",
      required: true,
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
    previous_price: {
      type: "number",
      label: "Previous Price",
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
    images_object: {
      type: "image_upload",
      label: "Images",
      // options: images,
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: (option: any) => option.link,
    },

    video: {
      type: "text",
      label: "Video",
    },

    wholesale_price: {
      type: "number",
      label: "Wholesale Price",
    },
    wholesale_product: {
      type: "checkbox",
      label: "Wholesale Product",
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

    contributers: {
      type: "array",
      label: "Contributers",
      default: "5f2d7c0e9005a57059801ce8",
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

    hidden: {
      type: "checkbox",
      label: "Hidden",
      labelProp: "hidden",
      defaultValue: false,
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
    meta_title: {
      type: "text",
      label: "Meta Title",
      labelProp: "meta_title",
    },
    meta_description: {
      type: "text_multiline",
      label: "Meta Description",
      labelProp: "meta_description",
    },
    meta_keywords: {
      type: "text_multiline",
      label: "Meta Keywords",
      labelProp: "meta_keywords",
    },
    length: {
      type: "number",
      label: "Length",
      labelProp: "length",
    },
    width: {
      type: "number",
      label: "Width",
      labelProp: "width",
    },
    height: {
      type: "number",
      label: "Height",
      labelProp: "height",
    },
    package_length: {
      type: "number",
      label: "Package Length",
      labelProp: "package_length",
    },
    package_width: {
      type: "number",
      label: "Package Width",
      labelProp: "package_width",
    },
    package_height: {
      type: "number",
      label: "Package Height",
      labelProp: "package_height",
    },
    package_volume: {
      type: "number",
      label: "Package Volume",
      labelProp: "package_volume",
    },
    weight_pounds: {
      type: "number",
      label: "Weight (lbs)",
      labelProp: "weight_pounds",
    },
    weight_ounces: {
      type: "number",
      label: "Weight (oz)",
      labelProp: "weight_ounces",
    },
    processing_time: {
      type: "multi-select",
      label: "Processing Time",
      labelProp: "processing_time",
      options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"],
    },
    quantity: {
      type: "number",
      label: "Quantity",
      labelProp: "quantity",
    },
    add_on_price: {
      type: "number",
      label: "Add-On Price",
      labelProp: "add_on_price",
    },
    show_add_on: {
      type: "checkbox",
      label: "Show Add-On",
      labelProp: "show_add_on",
    },

    color_products: {
      type: "autocomplete_multiple",
      label: "Color Product",
      options: products,
      labelProp: "name",
      onEdit: (product: any) => onEdit(product),
    },
    color_product_name: {
      type: "text",
      label: "Color Product Name",
      labelProp: "color_product_name",
    },
    color_images_object: {
      type: "image_upload",
      label: "Color Images",
      // options: images,
      labelProp: "link",
      album: `${product.name} Color Images`,
    },
    secondary_color_products: {
      type: "autocomplete_multiple",
      label: "Secondary Color Product",
      options: products,
      labelProp: "name",
      onEdit: (product: any) => onEdit(product),
    },
    secondary_color_product_name: {
      type: "text",
      label: "Secondary Color Product Name",
      labelProp: "secondary_color_product_name",
    },
    secondary_color_images_object: {
      type: "image_upload",
      label: "Secondary Color Images",
      // options: images,
      labelProp: "link",
      album: `${product.name} Secondary Color Images`,
    },
    option_product_name: {
      type: "text",
      label: "Option Product Name",
      labelProp: "option_product_name",
    },
    option_products: {
      type: "autocomplete_multiple",
      label: "Option Product",
      options: products,
      labelProp: "name",
      onEdit: (product: any) => onEdit(product),
    },
    option_images_object: {
      type: "image_upload",
      label: "Option Images",
      // options: images,
      labelProp: "link",
      album: `${product.name} Option Images`,
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
      onEdit: (product: any) => onEdit(product),
    },
    secondary_images_object: {
      type: "image_upload",
      label: "Secondary Images",
      // options: images,
      labelProp: "link",
      album: `${product.name} Secondary Images`,
    },
    chips: {
      type: "autocomplete_multiple",
      label: "Chips",
      options: chips,
      labelProp: "name",
      onEdit: (chip: any) => onEdit(chip),
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
            getOptionLabel: (option: any) => (option ? `${option.first_name} ${option.last_name}` : ""),
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
