export const productFormFields = ({ products, users }: { products: any; users: any }) => {
  return {
    name: {
      type: "text",
      label: "Name",
      required: true
    },
    images: {
      type: "array",
      label: "Images"
    },
    color_images: {
      type: "array",
      label: "Color Images"
    },
    secondary_color_images: {
      type: "array",
      label: "Secondary Color Images"
    },
    option_images: {
      type: "array",
      label: "Option Images"
    },
    secondary_images: {
      type: "array",
      label: "Secondary Images"
    },
    video: {
      type: "text",
      label: "Video"
    },
    brand: {
      type: "text",
      label: "Brand",
      required: true
    },
    price: {
      type: "number",
      label: "Price"
    },
    wholesale_price: {
      type: "number",
      label: "Wholesale Price"
    },
    wholesale_product: {
      type: "checkbox",
      label: "Wholesale Product"
    },
    previous_price: {
      type: "number",
      label: "Previous Price"
    },
    category: {
      type: "text",
      label: "Category",
      required: true
    },
    product_collection: {
      type: "text",
      label: "Product Collection"
    },
    categorys: {
      type: "array_of_objects",
      label: "Categorys"
    },
    subcategorys: {
      type: "array_of_objects",
      label: "Subcategorys"
    },
    subcategory: {
      type: "text",
      label: "Subcategory"
    },
    countInStock: {
      type: "number",
      label: "Count in Stock",
      default: 30,
      required: true
    },
    count_in_stock: {
      type: "number",
      label: "Count in Stock",
      default: 30,
      required: true
    },
    finite_stock: {
      type: "checkbox",
      label: "Finite Stock",
      default: false
    },
    facts: {
      type: "text",
      label: "Facts"
    },
    included_items: {
      type: "text",
      label: "Included Items"
    },
    contributers: {
      type: "array",
      label: "Contributers",
      default: "5f2d7c0e9005a57059801ce8"
    },
    description: {
      type: "text",
      label: "Description"
    },
    rating: {
      type: "number",
      label: "Rating",
      default: 0
    },
    numReviews: {
      type: "number",
      label: "Number of Reviews",
      default: 0
    },
    reviews: {
      type: "array_of_objects",
      title: "Reviews",
      fields: {
        user: {
          type: "autocomplete",
          label: "Users",
          options: users,
          labelProp: "user",
          getOptionLabel: (option: any) => `${option.first_name} ${option.last_name}`
        },
        first_name: {
          type: "text",
          label: "First Name",
          labelProps: "first_name"
        },
        last_name: {
          type: "text",
          label: "Last Name",
          labelProps: "last_name"
        },
        rating: {
          type: "number",
          label: "Rating",
          labelProps: "rating",
          required: true
        },
        comment: {
          type: "text",
          label: "Comment",
          labelProps: "comment",
          required: true
        }
      }
    },
    hidden: {
      type: "checkbox",
      label: "Hidden",
      labelProps: "hidden",
      defaultValue: false
    },
    sale_price: {
      type: "number",
      label: "Sale Price",
      labelProps: "sale_price",
      defaultValue: 0
    },
    sale_start_date: {
      type: "date",
      label: "Sale Start Date",
      labelProps: "sale_start_date"
    },
    sale_end_date: {
      type: "date",
      label: "Sale End Date",
      labelProps: "sale_end_date"
    },
    deleted: {
      type: "checkbox",
      label: "Deleted",
      labelProps: "deleted",
      defaultValue: false
    },
    preorder: {
      type: "checkbox",
      label: "Preorder",
      labelProps: "preorder",
      defaultValue: false
    },
    pathname: {
      type: "text",
      label: "Pathname",
      labelProps: "pathname"
    },
    meta_title: {
      type: "text",
      label: "Meta Title",
      labelProps: "meta_title"
    },
    meta_description: {
      type: "text",
      label: "Meta Description",
      labelProps: "meta_description"
    },
    meta_keywords: {
      type: "text",
      label: "Meta Keywords",
      labelProps: "meta_keywords"
    },
    length: {
      type: "number",
      label: "Length",
      labelProps: "length"
    },
    width: {
      type: "number",
      label: "Width",
      labelProps: "width"
    },
    height: {
      type: "number",
      label: "Height",
      labelProps: "height"
    },
    package_length: {
      type: "number",
      label: "Package Length",
      labelProps: "package_length"
    },
    package_width: {
      type: "number",
      label: "Package Width",
      labelProps: "package_width"
    },
    package_height: {
      type: "number",
      label: "Package Height",
      labelProps: "package_height"
    },
    package_volume: {
      type: "number",
      label: "Package Volume",
      labelProps: "package_volume"
    },
    weight_pounds: {
      type: "number",
      label: "Weight (lbs)",
      labelProps: "weight_pounds"
    },
    weight_ounces: {
      type: "number",
      label: "Weight (oz)",
      labelProps: "weight_ounces"
    },
    processing_time: {
      type: "multi-select",
      label: "Processing Time",
      labelProps: "processing_time",
      options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"]
    },
    quantity: {
      type: "number",
      label: "Quantity",
      labelProps: "quantity"
    },
    finite_stock: {
      type: "number",
      label: "Finite Stock",
      labelProps: "finite_stock"
    },
    add_on_price: {
      type: "number",
      label: "Add-On Price",
      labelProps: "add_on_price"
    },
    show_add_on: {
      type: "checkbox",
      label: "Show Add-On",
      labelProps: "show_add_on"
    },
    product: {
      type: "autocomplete",
      label: "Product",
      options: products,
      labelProp: "name",
      required: true
    },
    color_product: {
      type: "autocomplete",
      label: "Color Product",
      options: products,
      labelProp: "name"
    },
    color_product_name: {
      type: "text",
      label: "Color Product Name",
      labelProp: "color_product_name"
    },
    secondary_color_product: {
      type: "autocomplete",
      label: "Secondary Color Product",
      options: products,
      labelProp: "name"
    },
    secondary_color_product_name: {
      type: "text",
      label: "Secondary Color Product Name",
      labelProp: "secondary_color_product_name"
    },
    option_product_name: {
      type: "text",
      label: "Option Product Name",
      labelProp: "option_product_name"
    },
    option_product: {
      type: "autocomplete",
      label: "Option Product",
      options: products,
      labelProp: "name"
    },
    secondary_product_name: {
      type: "text",
      label: "Secondary Product Name",
      labelProp: "secondary_product_name"
    },
    secondary_product: {
      type: "autocomplete",
      label: "Secondary Product",
      options: products,
      labelProp: "name"
    }
  };
};
