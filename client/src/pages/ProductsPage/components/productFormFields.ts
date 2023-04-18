export const productFormFields = ({
  products,
  users,
  images,
  categorys,
  setState,
  product
}: {
  products: any;
  users: any;
  images: any;
  categorys: any;
  setState: any;
  product: any;
}) => {
  return {
    name: {
      type: "text",
      label: "Name",
      required: true
    },
    price: {
      type: "number",
      label: "Price"
    },
    description: {
      type: "text_multiline",
      label: "Description"
    },
    facts: {
      type: "text_multiline",
      label: "Facts"
    },
    included_items: {
      type: "text_multiline",
      label: "Included Items"
    },
    brand: {
      type: "text",
      label: "Brand",
      required: true
    },
    category: {
      type: "text",
      label: "Category",
      required: true
    },
    subcategory: {
      type: "text",
      label: "Subcategory"
    },
    product_collection: {
      type: "text",
      label: "Product Collection"
    },
    previous_price: {
      type: "number",
      label: "Previous Price"
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
    images_object: {
      type: "image_upload",
      label: "Images",
      options: images,
      labelProp: "link",
      album: `${product.name} Images`,
      getOptionLabel: (option: any) => option.link,
      onUpload: (images: any) => setState(images, "images_object")
    },

    video: {
      type: "text",
      label: "Video"
    },

    wholesale_price: {
      type: "number",
      label: "Wholesale Price"
    },
    wholesale_product: {
      type: "checkbox",
      label: "Wholesale Product"
    },
    categorys: {
      type: "autocomplete_multiple",
      label: "Categorys",
      options: categorys,
      labelProp: "name"
    },
    subcategorys: {
      type: "autocomplete_multiple",
      label: "Subcategorys",
      options: categorys,
      labelProp: "name"
    },
    // collections: {
    //   type: "autocomplete_multiple",
    //   label: "Collections",
    //   options: categorys,
    //   labelProp: "name"
    // },

    contributers: {
      type: "array",
      label: "Contributers",
      default: "5f2d7c0e9005a57059801ce8"
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
      type: "text_multiline",
      label: "Meta Description",
      labelProps: "meta_description"
    },
    meta_keywords: {
      type: "text_multiline",
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

    color_products: {
      type: "autocomplete_multiple",
      label: "Color Product",
      options: products,
      labelProp: "name"
    },
    color_product_name: {
      type: "text",
      label: "Color Product Name",
      labelProp: "color_product_name"
    },
    color_images_object: {
      type: "image_upload",
      label: "Color Images",
      options: images,
      labelProp: "link",
      album: `${product.name} Color Images`,
      onUpload: (images: any) => setState(images, "color_images_object")
    },
    secondary_color_products: {
      type: "autocomplete_multiple",
      label: "Secondary Color Product",
      options: products,
      labelProp: "name"
    },
    secondary_color_product_name: {
      type: "text",
      label: "Secondary Color Product Name",
      labelProp: "secondary_color_product_name"
    },
    secondary_color_images_object: {
      type: "image_upload",
      label: "Secondary Color Images",
      options: images,
      labelProp: "link",
      album: `${product.name} Secondary Color Images`,
      onUpload: (images: any) => setState(images, "secondary_color_images_object")
    },
    option_product_name: {
      type: "text",
      label: "Option Product Name",
      labelProp: "option_product_name"
    },
    option_products: {
      type: "autocomplete_multiple",
      label: "Option Product",
      options: products,
      labelProp: "name"
    },
    option_images_object: {
      type: "image_upload",
      label: "Option Images",
      options: images,
      labelProp: "link",
      album: `${product.name} Option Images`,
      onUpload: (images: any) => setState(images, "option_images_object")
    },
    secondary_product_name: {
      type: "text",
      label: "Secondary Product Name",
      labelProp: "secondary_product_name"
    },
    secondary_products: {
      type: "autocomplete_multiple",
      label: "Secondary Product",
      options: products,
      labelProp: "name"
    },
    secondary_images_object: {
      type: "image_upload",
      label: "Secondary Images",
      options: images,
      labelProp: "link",
      album: `${product.name} Secondary Images`,
      onUpload: (images: any) => setState(images, "secondary_images_object")
    },
    reviews: {
      type: "array_of_objects",
      title: "Reviews",
      fields: {
        user: {
          type: "autocomplete_single",
          label: "Users",
          options: users,
          labelProp: "user",
          getOptionLabel: (option: any) => (option ? `${option.first_name} ${option.last_name}` : "")
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
    }
  };
};
