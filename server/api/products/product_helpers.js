import { Product, product_db } from "../products";
export const diminish_single_glove_stock = async (product, item) => {
  const new_product_count = product.count_in_stock - item.quantity;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);

  await product_db.update_products_db(product._id, {
    count_in_stock: new_product_count,
    quantity: Math.min(product.quantity, new_product_count),
  });
};

export const diminish_batteries_stock = async (product, item, isRefreshPack = false) => {
  let batteries_to_remove;
  if (isRefreshPack) {
    batteries_to_remove = item.quantity * (product.name.includes("CR1225") ? 125 : 120);
  } else {
    batteries_to_remove = item.quantity * parseInt(item.size);
  }

  const new_product_count = Math.max(0, product.count_in_stock - batteries_to_remove);
  product.count_in_stock = new_product_count;
  product.quantity = Math.min(product.quantity, new_product_count);

  await product_db.update_products_db(product._id, product);

  if (!isRefreshPack) {
    const sizeOption = product.options ? product.options.find(option => option.name.toLowerCase() === "set of") : null;
    if (sizeOption) {
      const selectedValue = sizeOption.values.find(value => value.name === item.size.toString());
      if (selectedValue) {
        const optionProduct = await Product.findById(selectedValue.product);
        if (optionProduct) {
          const new_option_product_count = Math.max(0, optionProduct.count_in_stock - item.quantity);
          optionProduct.count_in_stock = new_option_product_count;
          optionProduct.quantity = Math.min(optionProduct.quantity, new_option_product_count);
          await product_db.update_products_db(optionProduct._id, optionProduct);
        }
      }
    }
  }
};

export const diminish_refresh_pack_stock = async (product, item) => {
  const new_product_count = product.count_in_stock - item.quantity;
  product.count_in_stock = new_product_count;
  if (new_product_count <= product.quantity) {
    product.quantity = new_product_count;
  }
  await product_db.update_products_db(product._id, product);

  const gloveOption = product.options.find(option => option.name.toLowerCase().includes("glove"));
  if (gloveOption) {
    const selectedGloveSize = item.selectedOptions.find(opt =>
      gloveOption.values.some(value => value.name === opt.name)
    );

    if (selectedGloveSize) {
      const selectedGlove = gloveOption.values.find(value => value.name === selectedGloveSize.name);
      if (selectedGlove) {
        const glove_option_product = await Product.findById(selectedGlove.product);
        if (glove_option_product) {
          const glove_item = {
            product: glove_option_product._id,
            selectedOptions: [{ _id: glove_option_product._id }],
            quantity: item.quantity * 6,
          };
          await diminish_single_glove_stock(glove_option_product, glove_item);
        }
      }
    }
  }

  const batteryOption = product.options.find(option => option.name === "Batteries");

  if (batteryOption) {
    const selectedBattery = item.selectedOptions.find(opt =>
      batteryOption.values.some(value => value.name === opt.name)
    );

    if (selectedBattery) {
      const battery_product = await Product.findById(selectedBattery.product);
      if (battery_product) {
        const battery_item = {
          product: battery_product._id,
          quantity: item.quantity,
          size: battery_product.name.includes("CR1225") ? 125 : 120,
        };
        await diminish_batteries_stock(battery_product, battery_item, true);
      }
    }
  }
};
export const diminish_sampler_stock = async (product, item) => {
  const sizeOption = product.options.find(
    option => option.name.toLowerCase().includes("size") || option.name.toLowerCase().includes("pack")
  );

  if (!sizeOption) {
    return;
  }

  const selectedSize = item.selectedOptions.find(opt =>
    sizeOption.values.some(value => value._id.toString() === opt._id.toString())
  );

  if (!selectedSize) {
    return;
  }

  const sizes = selectedSize.name.split(" + ");
  const gloveName = product.name.includes("Ultra") ? "Ultra Gloves" : "Supreme Gloves V2";

  for (const size of sizes) {
    const gloveProduct = await Product.findOne({
      name: { $regex: new RegExp(`${gloveName} - ${size}`, "i") },
    });

    if (!gloveProduct) {
      continue;
    }

    const newStockCount = Math.max(0, gloveProduct.count_in_stock - item.quantity);
    gloveProduct.count_in_stock = newStockCount;
    gloveProduct.quantity = Math.min(gloveProduct.quantity, newStockCount);

    await product_db.update_products_db(gloveProduct._id, {
      count_in_stock: gloveProduct.count_in_stock,
      quantity: gloveProduct.quantity,
    });
  }
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
  if (product.images && product.images[imageNum]) {
    if (typeof product.images[imageNum].link === "function") {
      return product.images[imageNum];
    }
    return product.images[imageNum].link;
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

// To find parents via a Mongoose query:
export const findParentsForProduct = async productId => {
  const product = await Product.findById(productId);
  if (product && product.parents && product.parents.length > 0) {
    return await Product.find({ _id: { $in: product.parents } });
  }
  return [];
};

// To find all variations for a parent product:
export const findVariationsForParent = async parentId => {
  return await Product.find({ parents: parentId, isVariation: true });
};

// To add another parent to an existing option product:
export const addParentToOptionProduct = async (optionProductId, newParentId) => {
  await Product.findByIdAndUpdate(optionProductId, {
    $addToSet: { parents: newParentId }, // $addToSet ensures no duplicates
  });
};

// Main function
export const generateProductOptionsProducts = async body => {
  try {
    validateInput(body);
    const { selectedProductIds, templateProductId, selectedOptions } = body;

    const selectedProducts = await fetchSelectedProducts(selectedProductIds);
    const templateProduct = await fetchTemplateProduct(templateProductId);

    const results = await Promise.all(
      selectedProducts.map(product => processProduct(product, templateProduct, selectedOptions))
    );

    return results;
  } catch (error) {
    handleError(error, "generateProductOptionsProducts");
  }
};

// Input validation
const validateInput = ({ selectedProductIds }) => {
  if (!Array.isArray(selectedProductIds) || selectedProductIds.length === 0) {
    throw new Error("Invalid or empty product IDs array");
  }
};

// Fetch selected products
const fetchSelectedProducts = async selectedProductIds => {
  const selectedProducts = await Product.find({ _id: { $in: selectedProductIds } });
  if (selectedProducts.length !== selectedProductIds.length) {
    throw new Error("One or more products not found");
  }
  return selectedProducts;
};

// Fetch template product
const fetchTemplateProduct = async templateProductId => {
  if (!templateProductId) return null;
  const templateProduct = await Product.findById(templateProductId).lean();
  if (!templateProduct) {
    throw new Error("Template product not found");
  }
  return templateProduct;
};

// Update product options
const updateProductOptions = (existingOptions, templateProduct, selectedOptions) => {
  if (!templateProduct) return existingOptions;

  if (selectedOptions) {
    return updateSelectedOptions(existingOptions, templateProduct, selectedOptions);
  }

  // If no specific options are selected, keep the existing behavior
  return JSON.parse(JSON.stringify(templateProduct.options));
};

// Update selected options
const updateSelectedOptions = (existingOptions, templateProduct, selectedOptions) => {
  return selectedOptions.reduce(
    (updatedOptions, selectedOption) => {
      const templateOption = templateProduct.options.find(o => o.name === selectedOption.name);
      if (templateOption) {
        const index = selectedOption.order - 1;
        if (index < updatedOptions.length) {
          // Replace the entire option, including values, without preserving product references
          updatedOptions[index] = JSON.parse(JSON.stringify(templateOption));
        } else {
          updatedOptions.push(JSON.parse(JSON.stringify(templateOption)));
        }
      }
      return updatedOptions;
    },
    [...existingOptions]
  );
};

// Process option values
const processOptionValues = async (options, parentProduct, originalOptions, selectedOptions) => {
  for (const [index, option] of options.entries()) {
    const isReplacedOption = selectedOptions?.some(so => so.name === option.name);
    for (const value of option.values) {
      if (isReplacedOption || !value.product) {
        const optionProduct = await createOrUpdateOptionProduct(parentProduct, option.name, value.name);
        value.product = optionProduct._id;
      }
    }
  }
};

// Main processing function
const processProduct = async (product, templateProduct, selectedOptions) => {
  const originalOptions = [...product.options];
  const updatedOptions = updateProductOptions(originalOptions, templateProduct, selectedOptions);
  await processOptionValues(updatedOptions, product, originalOptions, selectedOptions);
  await updateProductInDatabase(product._id, updatedOptions);
  return { productId: product._id, status: "Success" };
};

// Update product in database
const updateProductInDatabase = async (productId, updatedOptions) => {
  await Product.findByIdAndUpdate(productId, {
    $set: { options: updatedOptions },
  });
};

// Error handling
const handleError = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error);
  if (error instanceof Error) {
    throw new Error(error.message);
  }
};

// Keep the createOrUpdateOptionProduct function as is
export const createOrUpdateOptionProduct = async (parentProduct, optionName, valueName) => {
  const newProductName = `${parentProduct.name} - ${optionName} - ${valueName}`;
  const newPathname = `${parentProduct.pathname}_${optionName.toLowerCase().replace(/\s+/g, "_")}_${valueName.toLowerCase().replace(/\s+/g, "_")}`;

  let optionProduct = await Product.findOneAndUpdate(
    { pathname: newPathname },
    {
      $set: {
        name: newProductName,
        isVariation: true,
        hidden: true,
      },
      $addToSet: { parent: parentProduct._id },
    },
    { new: true, upsert: true }
  );

  if (!optionProduct) {
    optionProduct = new Product({
      ...parentProduct.toObject(),
      _id: undefined,
      name: newProductName,
      pathname: newPathname,
      parent: parentProduct._id,
      isVariation: true,
      hidden: true,
      options: [],
    });
    optionProduct = await optionProduct.save();
  }

  return optionProduct;
};
