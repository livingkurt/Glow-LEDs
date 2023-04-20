export const orderFormFields = ({
  orders,
  users,
  // images,
  categorys,
  setState,
  order,
  onEdit
}: {
  orders: any;
  users: any;
  // images: any;
  categorys: any;
  setState: any;
  order: any;
  onEdit: any;
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
    order_collection: {
      type: "text",
      label: "Order Collection"
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
      // options: images,
      labelProp: "link",
      album: `${order.name} Images`,
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
    wholesale_order: {
      type: "checkbox",
      label: "Wholesale Order"
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
    collections: {
      type: "autocomplete_multiple",
      label: "Collections",
      options: categorys,
      labelProp: "name"
    },

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
      labelProp: "hidden",
      defaultValue: false
    },
    sale_price: {
      type: "number",
      label: "Sale Price",
      labelProp: "sale_price",
      defaultValue: 0
    },
    sale_start_date: {
      type: "date",
      label: "Sale Start Date",
      labelProp: "sale_start_date"
    },
    sale_end_date: {
      type: "date",
      label: "Sale End Date",
      labelProp: "sale_end_date"
    },
    preorder: {
      type: "checkbox",
      label: "Preorder",
      labelProp: "preorder",
      defaultValue: false
    },
    pathname: {
      type: "text",
      label: "Pathname",
      labelProp: "pathname"
    },
    meta_title: {
      type: "text",
      label: "Meta Title",
      labelProp: "meta_title"
    },
    meta_description: {
      type: "text_multiline",
      label: "Meta Description",
      labelProp: "meta_description"
    },
    meta_keywords: {
      type: "text_multiline",
      label: "Meta Keywords",
      labelProp: "meta_keywords"
    },
    length: {
      type: "number",
      label: "Length",
      labelProp: "length"
    },
    width: {
      type: "number",
      label: "Width",
      labelProp: "width"
    },
    height: {
      type: "number",
      label: "Height",
      labelProp: "height"
    },
    package_length: {
      type: "number",
      label: "Package Length",
      labelProp: "package_length"
    },
    package_width: {
      type: "number",
      label: "Package Width",
      labelProp: "package_width"
    },
    package_height: {
      type: "number",
      label: "Package Height",
      labelProp: "package_height"
    },
    package_volume: {
      type: "number",
      label: "Package Volume",
      labelProp: "package_volume"
    },
    weight_pounds: {
      type: "number",
      label: "Weight (lbs)",
      labelProp: "weight_pounds"
    },
    weight_ounces: {
      type: "number",
      label: "Weight (oz)",
      labelProp: "weight_ounces"
    },
    processing_time: {
      type: "multi-select",
      label: "Processing Time",
      labelProp: "processing_time",
      options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"]
    },
    quantity: {
      type: "number",
      label: "Quantity",
      labelProp: "quantity"
    },
    add_on_price: {
      type: "number",
      label: "Add-On Price",
      labelProp: "add_on_price"
    },
    show_add_on: {
      type: "checkbox",
      label: "Show Add-On",
      labelProp: "show_add_on"
    },

    color_orders: {
      type: "autocomplete_multiple",
      label: "Color Order",
      options: orders,
      labelProp: "name",
      onEdit: (order: any) => onEdit(order)
    },
    color_order_name: {
      type: "text",
      label: "Color Order Name",
      labelProp: "color_order_name"
    },
    color_images_object: {
      type: "image_upload",
      label: "Color Images",
      // options: images,
      labelProp: "link",
      album: `${order.name} Color Images`,
      onUpload: (images: any) => setState(images, "color_images_object")
    },
    secondary_color_orders: {
      type: "autocomplete_multiple",
      label: "Secondary Color Order",
      options: orders,
      labelProp: "name",
      onEdit: (order: any) => onEdit(order)
    },
    secondary_color_order_name: {
      type: "text",
      label: "Secondary Color Order Name",
      labelProp: "secondary_color_order_name"
    },
    secondary_color_images_object: {
      type: "image_upload",
      label: "Secondary Color Images",
      // options: images,
      labelProp: "link",
      album: `${order.name} Secondary Color Images`,
      onUpload: (images: any) => setState(images, "secondary_color_images_object")
    },
    option_order_name: {
      type: "text",
      label: "Option Order Name",
      labelProp: "option_order_name"
    },
    option_orders: {
      type: "autocomplete_multiple",
      label: "Option Order",
      options: orders,
      labelProp: "name",
      onEdit: (order: any) => onEdit(order)
    },
    option_images_object: {
      type: "image_upload",
      label: "Option Images",
      // options: images,
      labelProp: "link",
      album: `${order.name} Option Images`,
      onUpload: (images: any) => setState(images, "option_images_object")
    },
    secondary_order_name: {
      type: "text",
      label: "Secondary Order Name",
      labelProp: "secondary_order_name"
    },
    secondary_orders: {
      type: "autocomplete_multiple",
      label: "Secondary Order",
      options: orders,
      labelProp: "name",
      onEdit: (order: any) => onEdit(order)
    },
    secondary_images_object: {
      type: "image_upload",
      label: "Secondary Images",
      // options: images,
      labelProp: "link",
      album: `${order.name} Secondary Images`,
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
          labelProp: "first_name"
        },
        last_name: {
          type: "text",
          label: "Last Name",
          labelProp: "last_name"
        },
        rating: {
          type: "number",
          label: "Rating",
          labelProp: "rating",
          required: true
        },
        comment: {
          type: "text",
          label: "Comment",
          labelProp: "comment",
          required: true
        }
      }
    }
  };
};
