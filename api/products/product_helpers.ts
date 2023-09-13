import { product_db } from "../products";

export const dimminish_supremes_stock = async (product: any, item: any) => {
  const new_product_count = product.count_in_stock - item.qty;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);
  const option_product: any = await product_db.findById_products_db(item.option_product);
  const new_option_product_count = option_product.count_in_stock - item.qty;
  option_product.count_in_stock = new_option_product_count;
  await product_db.update_products_db(option_product._id, option_product);
};

export const dimminish_refresh_stock = async (product: any, item: any) => {
  // const new_product_count = product.count_in_stock - item.qty;
  // product.count_in_stock = new_product_count;
  // if (new_product_count <= product.quantity) {
  //   product.quantity = new_product_count;
  // }
  // await product_db.update_products_db(product._id, product);
  const option_product: any = await product_db.findById_products_db(item.option_product);
  const new_option_product_count = option_product.count_in_stock - item.qty * 6;
  option_product.count_in_stock = new_option_product_count;
  if (new_option_product_count <= option_product.quantity) {
    option_product.quantity = new_option_product_count;
  }
  await product_db.update_products_db(option_product._id, option_product);

  await Promise.all(
    product.secondary_products.map(async (secondary: any) => {
      const new_secondary_count = secondary.count_in_stock - item.qty * 120;
      secondary.count_in_stock = new_secondary_count;
      if (new_secondary_count <= secondary.quantity) {
        secondary.qiuantty = new_secondary_count;
      }
      await product_db.update_products_db(secondary._id, secondary);
      secondary.option_products.map(async (option: any) => {
        const new_option_product_count = Math.floor(new_secondary_count / option.size);
        option.count_in_stock = new_option_product_count;
        await product_db.update_products_db(option._id, option);
      });
    })
  );
};

export const dimminish_batteries_stock = async (product: any, item: any) => {
  const new_product_count = product.count_in_stock - item.qty * item.size;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);
  await Promise.all(
    product.option_products.map(async (option: any) => {
      const new_option_product_count = Math.floor(new_product_count / option.size);
      option.count_in_stock = new_option_product_count;
      await product_db.update_products_db(option._id, option);
    })
  );
};

export const normalizeProductFilters = (input: any) => {
  const output: any = {};
  Object.keys(input).forEach(key => {
    console.log({ input });
    switch (key) {
      case "category":
        for (const category of input.category) {
          output["category"] = category;
        }
        break;
      case "subcategory":
        for (const subcategory of input.subcategory) {
          output["subcategory"] = subcategory;
        }
        break;
      case "hidden":
        if (input.hidden && !input.hidden.includes(1)) {
          output["hidden"] = false;
        }
        break;
      case "options":
        if (input.options && !input.options.includes(1)) {
          output["option"] = false;
        }

        break;
      default:
        break;
    }
  });
  if (input.hidden && input.hidden.includes("only_hidden")) {
    output.hidden = true;
  }
  if (input.options && input.options.includes("only_options")) {
    output.option = true;
  }
  return output;
};

export const normalizeProductSearch = (query: any) => {
  const search = query.search
    ? {
        name: {
          $regex: query.search.toLowerCase(),
          $options: "i",
        },
      }
    : {};

  return search;
};
