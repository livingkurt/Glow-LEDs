export const cartFormFields = ({ products, users, cart }) => {
  return {
    user: {
      type: "autocomplete_single",
      label: "Users",
      options: users.filter(user => user.first_name && user.last_name),
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },
    cartItems: {
      type: "array",
      title: "Cart Items",
      label: "name",
      itemSchema: {
        type: "object",
        fields: {
          name: {
            type: "text",
            label: "Name",
            labelProp: "name",
            required: true,
          },
          max_quantity: {
            type: "number",
            label: "Max Quantity",
            labelProp: "max_quantity",
          },
          display_image: {
            type: "image_upload",
            label: "Images",
            labelProp: "link",
            album: `${cart?.user?.first_name} ${cart?.user?.last_name} Images`,
            getOptionLabel: option => option.link,
          },
          secondary_image: {
            type: "text",
            label: "Secondary Image",
            labelProp: "secondary_image",
          },
          color: {
            type: "text",
            label: "Color",
            labelProp: "color",
          },
          secondary_color: {
            type: "text",
            label: "Secondary Color",
            labelProp: "secondary_color",
          },
          color_group_name: {
            type: "text",
            label: "Color Group Name",
            labelProp: "color_group_name",
          },
          secondary_color_group_name: {
            type: "text",
            label: "Secondary Color Group Name",
            labelProp: "secondary_color_group_name",
          },
          color_code: {
            type: "text",
            label: "Color Code",
            labelProp: "color_code",
          },
          secondary_color_code: {
            type: "text",
            label: "Secondary Color Code",
            labelProp: "secondary_color_code",
          },
          price: {
            type: "number",
            label: "Price",
            labelProp: "price",
            required: true,
          },
          category: {
            type: "text",
            label: "Category",
            labelProp: "category",
            required: true,
          },
          subcategory: {
            type: "text",
            label: "Subcategory",
            labelProp: "subcategory",
          },
          product_collection: {
            type: "text",
            label: "Product Collection",
            labelProp: "product_collection",
          },
          pathname: {
            type: "text",
            label: "Pathname",
            labelProp: "pathname",
          },
          size: {
            type: "text",
            label: "Size",
            labelProp: "size",
          },
          preorder: {
            type: "checkbox",
            label: "Preorder",
            labelProp: "preorder",
          },
          sale_price: {
            type: "number",
            label: "Sale Price",
            labelProp: "sale_price",
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
          package_volume: {
            type: "number",
            label: "Package Volume",
            labelProp: "package_volume",
          },

          count_in_stock: {
            type: "number",
            label: "Count in Stock",
            labelProp: "count_in_stock",
          },
          dimensions: {
            type: "object",
            title: "Dimensions",
            fields: {
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
            },
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
          finite_stock: {
            type: "number",
            label: "Finite Stock",
            labelProp: "finite_stock",
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
          wholesale_product: {
            type: "checkbox",
            label: "Wholesale Product",
            labelProp: "wholesale_product",
          },
          wholesale_price: {
            type: "number",
            label: "Wholesale Price",
            labelProp: "wholesale_price",
          },
          product: {
            type: "autocomplete_single",
            label: "Product",
            options: products,
            labelProp: "name",
            required: true,
          },
          color_product: {
            type: "autocomplete_single",
            label: "Color Product",
            options: products,
            labelProp: "name",
          },
          color_product_name: {
            type: "text",
            label: "Color Product Name",
            labelProp: "color_product_name",
          },
          secondary_color_product: {
            type: "autocomplete_single",
            label: "Secondary Color Product",
            options: products,
            labelProp: "name",
          },
          secondary_color_product_name: {
            type: "text",
            label: "Secondary Color Product Name",
            labelProp: "secondary_color_product_name",
          },
          option_product_name: {
            type: "text",
            label: "Option Product Name",
            labelProp: "option_product_name",
          },
          option_product: {
            type: "autocomplete_single",
            label: "Option Product",
            options: products,
            labelProp: "name",
          },
          secondary_product_name: {
            type: "text",
            label: "Secondary Product Name",
            labelProp: "secondary_product_name",
          },
          secondary_product: {
            type: "autocomplete_single",
            label: "Secondary Product",
            options: products,
            labelProp: "name",
          },
        },
      },
    },
  };
};
