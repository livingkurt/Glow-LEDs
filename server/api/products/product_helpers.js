import { Product, product_db } from "../products";

export const diminish_single_glove_stock = async (product, item) => {
  const new_product_count = product.count_in_stock - item.quantity;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);
  const option_product = await product_db.findById_products_db(item.option_product);
  const new_option_product_count = option_product.count_in_stock - item.quantity;
  option_product.count_in_stock = new_option_product_count;
  await product_db.update_products_db(option_product._id, option_product);
};

export const diminish_refresh_pack_stock = async (product, item) => {
  const new_product_count = product.count_in_stock - item.quantity;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);

  // Update glove stock
  const glove_option_product = await product_db.findById_products_db(item.option_product);
  const glove_item = {
    product: glove_option_product._id,
    option_product: glove_option_product._id,
    quantity: item.quantity * 6,
  };
  await diminish_single_glove_stock(glove_option_product, glove_item);

  // Update battery stock
  await Promise.all(
    product.secondary_products.map(async secondary => {
      const battery_item = {
        product: secondary._id,
        quantity: item.quantity,
        size: secondary.name === "Bulk CR1225 Batteries" ? 125 : 120,
      };
      await diminish_batteries_stock(secondary, battery_item);
    })
  );
};

export const diminish_batteries_stock = async (product, item) => {
  const new_product_count = product.count_in_stock - item.quantity * item.size;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);
  await Promise.all(
    product.option_products.map(async option => {
      const new_option_product_count = Math.floor(new_product_count / option.size);
      option.count_in_stock = new_option_product_count;
      await product_db.update_products_db(option._id, option);
    })
  );
};

export const diminish_sampler_stock = async (product, item) => {
  const sizes = item.secondary_product_name.split(" - ")[1].split(" + ");
  const gloveName = product.name.includes("Ultra") ? "Ultra Gloves" : "Supreme Gloves V2";

  const glove_option_product = await Product.findOne({ name: gloveName });
  const gloveProduct = await product_db.findById_products_db(glove_option_product._id);

  await Promise.all(
    sizes.map(async size => {
      const gloveOption = gloveProduct.option_products.find(option => option.size === size);

      if (gloveOption) {
        const gloveItem = {
          product: gloveOption._id,
          option_product: gloveOption._id,
          quantity: 1,
        };

        await diminish_single_glove_stock(gloveProduct, gloveItem);
      }
    })
  );
};

export const normalizeProductFilters = input => {
  const output = {};
  Object.keys(input).forEach(key => {
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

export const normalizeProductSearch = query => {
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

export const determineImage = (product, imageNum) => {
  if (product.images_object && product.images_object[imageNum]) {
    if (typeof product.images_object[imageNum].link === "function") {
      return product.images[imageNum];
    }
    return product.images_object[imageNum].link;
  } else {
    return "";
  }
};

export const transformProducts = products => {
  return products
    .filter(product => product.category !== "options")
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .map((product, i) => ({
      id: product._id,
      title: product.name,
      description: product.description,
      availability: "In Stock",
      condition: "New",
      price: `${product.price} USD`,
      link: `https://www.glow-leds.com/collections/all/products/${product.pathname}`,
      image_link: determineImage(product, 0),
      additional_image_link: determineImage(product, 1),
      brand: "Glow LEDs",
      inventory: product.quantity,
      fb_product_category: "toys & games > electronic toys",
      google_product_category: "Toys & Games > Toys > Visual Toys",
      sale_price: `${product.sale_price && product.sale_price.toFixed(2)} USD`,
      sale_price_effective_date: `${product?.sale_start_date}/${product?.sale_end_date}`,
      product_type: product.category,
      color: product.color,
      size: product.size,
    }));
};
