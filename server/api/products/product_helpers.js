import { Content } from "../contents";
import { Product, product_db } from "../products";
import { Category } from "../categorys";
import { Order } from "../orders";
import { Chip } from "../chips";

export const updateProductStock = async (product, quantityToReduce) => {
  console.log(`Updating stock for product: ${product.name}`);
  const newStockCount = Math.max(0, product.count_in_stock - quantityToReduce);
  const newMaxDisplayQuantity = Math.min(product.max_display_quantity, newStockCount);
  const newMaxQuantity = Math.min(product.max_quantity, newStockCount);

  console.log(
    `${product.name} - New stock count: ${newStockCount}, New max display quantity: ${newMaxDisplayQuantity}, New max quantity: ${newMaxQuantity}`
  );

  await Product.findByIdAndUpdate(product._id, {
    count_in_stock: newStockCount,
    max_display_quantity: newMaxDisplayQuantity,
    max_quantity: newMaxQuantity,
  });

  console.log(`Stock updated for product: ${product.name}`);
  return { newStockCount, newMaxDisplayQuantity, newMaxQuantity };
};

export const diminish_batteries_stock = async (product, item, isRefreshPack = false) => {
  console.log(`Diminishing batteries stock for product: ${product.name}`);
  let batteries_to_remove = 0;

  if (isRefreshPack) {
    batteries_to_remove = item.quantity * 120;
  } else {
    const sizeOption = product.options.find(option => option.name.toLowerCase() === "set of");
    if (sizeOption) {
      const selectedValue = sizeOption.values.find(value => value.name === item.selectedOptions[0].name);
      if (selectedValue) {
        const setSize = parseInt(selectedValue.name);
        if (!isNaN(setSize)) {
          batteries_to_remove = item.quantity * setSize;
        }
      }
    }
  }

  console.log(`Batteries to remove: ${batteries_to_remove}`);

  if (batteries_to_remove > 0) {
    // Update parent product stock
    const parentStockResult = await updateProductStock(product, batteries_to_remove);

    // After updating parent stock, recalculate the option products' stocks
    const optionProductIds = product.options
      .flatMap(option => option.values)
      .map(value => value.product)
      .filter(id => id); // Filter out any undefined or null values

    const optionProducts = await Product.find({ _id: { $in: optionProductIds } });

    const updatedOptionProducts = [];

    for (const optionProduct of optionProducts) {
      const optionSetSize = parseInt(optionProduct.size);
      if (!isNaN(optionSetSize) && optionSetSize > 0) {
        // Calculate the new count_in_stock for this option product
        const newOptionStockCount = Math.floor(parentStockResult.newStockCount / optionSetSize);

        console.log(`New stock count for option product ${optionProduct.name}: ${newOptionStockCount}`);

        await updateProductStock(optionProduct, newOptionStockCount);
        // Update the option product's stock
        await Product.findByIdAndUpdate(optionProduct._id, {
          count_in_stock: newOptionStockCount,
          max_display_quantity: newOptionStockCount,
          max_quantity: newOptionStockCount,
        });

        updatedOptionProducts.push({
          optionProductId: optionProduct._id,
          newOptionStockCount,
        });
      }
    }
  }
};
export const diminish_refresh_pack_stock = async (product, item) => {
  console.log(`Diminishing refresh pack stock for product: ${product.name}`);
  await updateProductStock(product, item.quantity);

  diminish_single_glove_stock(product, item, true);

  const batteryOption = product.options.find(option => option.name === "Batteries");
  if (batteryOption) {
    const selectedBattery = item.selectedOptions.find(opt =>
      batteryOption.values.some(value => value.name === opt.name)
    );

    if (selectedBattery) {
      const battery_product = await Product.findById(selectedBattery.product);
      if (battery_product) {
        await diminish_batteries_stock(battery_product, item, true);
      }
    }
  }
};

export const diminish_single_glove_stock = async (product, item, isRefreshPack = false) => {
  console.log(`Diminishing single glove stock for product: ${product.name}`);
  await updateProductStock(product, item.quantity);

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
          if (isRefreshPack) {
            await updateProductStock(glove_option_product, item.quantity * 6);
          } else {
            await updateProductStock(glove_option_product, item.quantity);
          }
        }
      }
    }
  }
};

export const diminish_sampler_stock = async (product, item) => {
  console.log(`Diminishing sampler stock for product: ${product.name}`);
  const sizeOption = product.options.find(
    option => option.name.toLowerCase().includes("size") || option.name.toLowerCase().includes("pack")
  );

  if (!sizeOption) {
    console.log(`Size option not found for product: ${product.name}`);
    return;
  }

  const selectedSize = item.selectedOptions.find(opt =>
    sizeOption.values.some(value => value._id.toString() === opt._id.toString())
  );

  if (!selectedSize) {
    console.log(`Selected size not found for product: ${product.name}`);
    return;
  }

  const sizes = selectedSize.name.split(" + ");
  const gloveName = product.name.includes("Ultra") ? "Ultra Gloves" : "Supreme Gloves V2";

  for (const size of sizes) {
    const gloveProduct = await Product.findOne({
      name: { $regex: new RegExp(`${gloveName} - ${size}`, "i") },
    });

    if (!gloveProduct) {
      console.log(`Glove product not found for size: ${size}`);
      continue;
    }

    await updateProductStock(gloveProduct, item.quantity);
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
  }
  return "";
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
      link: `https://www.glow-leds.com/products/${product.pathname}`,
      image_link: determineImage(product, 0),
      additional_image_link: determineImage(product, 1),
      brand: "Glow LEDs",
      inventory: product.max_display_quantity,
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
    const { selectedProductIds, templateProductId, selectedOptions, updateNamesOnly } = body;

    const selectedProducts = await fetchSelectedProducts(selectedProductIds);
    const templateProduct = await fetchTemplateProduct(templateProductId);

    if (updateNamesOnly) {
      const results = await Promise.all(selectedProducts.map(product => updateOptionProductNames(product)));
      return results;
    }
    const results = await Promise.all(
      selectedProducts.map(product => processProduct(product, templateProduct, selectedOptions))
    );
    return results;
  } catch (error) {
    handleError(error, "generateProductOptionsProducts");
  }
};

const updateOptionProductNames = async parentProduct => {
  try {
    for (const option of parentProduct.options) {
      for (const value of option.values) {
        if (value.product) {
          const newProductName = `${parentProduct.name} - ${option.name} - ${value.name}`;
          const newPathname = `${parentProduct.pathname}_${option.name.toLowerCase().replace(/\s+/g, "_")}_${value.name.toLowerCase().replace(/\s+/g, "_")}`;

          await Product.findByIdAndUpdate(value.product, {
            $set: {
              name: newProductName,
              pathname: newPathname,
            },
          });
        }
      }
    }
    return { productId: parentProduct._id, status: "Success" };
  } catch (error) {
    handleError(error, "updateOptionProductNames");
    return { productId: parentProduct._id, status: "Error", message: error.message };
  }
};

// Existing functions remain unchanged
const validateInput = ({ selectedProductIds }) => {
  if (!Array.isArray(selectedProductIds) || selectedProductIds.length === 0) {
    throw new Error("Invalid or empty product IDs array");
  }
};

const fetchSelectedProducts = async selectedProductIds => {
  const selectedProducts = await Product.find({ _id: { $in: selectedProductIds } });
  if (selectedProducts.length !== selectedProductIds.length) {
    throw new Error("One or more products not found");
  }
  return selectedProducts;
};

const fetchTemplateProduct = async templateProductId => {
  if (!templateProductId) return null;
  const templateProduct = await Product.findById(templateProductId).lean();
  if (!templateProduct) {
    throw new Error("Template product not found");
  }
  return templateProduct;
};

const updateProductOptions = (existingOptions, templateProduct, selectedOptions) => {
  if (!templateProduct) return existingOptions;

  if (selectedOptions) {
    return updateSelectedOptions(existingOptions, templateProduct, selectedOptions);
  }

  return JSON.parse(JSON.stringify(templateProduct.options));
};

const updateSelectedOptions = (existingOptions, templateProduct, selectedOptions) => {
  return selectedOptions.reduce(
    (updatedOptions, selectedOption) => {
      const templateOption = templateProduct.options.find(o => o.name === selectedOption.name);
      if (templateOption) {
        const index = selectedOption.order - 1;
        if (index < updatedOptions.length) {
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

const processOptionValues = async (options, parentProduct) => {
  for (const option of options) {
    for (const value of option.values) {
      const optionProduct = await createOrUpdateOptionProduct(parentProduct, option.name, value.name);
      value.product = optionProduct._id;
    }
  }
};

const processProduct = async (product, templateProduct, selectedOptions) => {
  const updatedOptions = updateProductOptions(product.options, templateProduct, selectedOptions);
  await processOptionValues(updatedOptions, product);
  await updateProductInDatabase(product._id, updatedOptions);
  return { productId: product._id, status: "Success" };
};

const updateProductInDatabase = async (productId, updatedOptions) => {
  await Product.findByIdAndUpdate(productId, {
    $set: { options: updatedOptions },
  });
};

const handleError = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error);
  if (error instanceof Error) {
    throw new Error(error.message);
  }
};

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
        parent: parentProduct._id,
      },
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

export const handleTagFiltering = async tags => {
  if (!tags || tags.length === 0) return {};
  const tagArray = Array.isArray(tags) ? tags : [tags];
  const tagCategories = await Category.find({ deleted: false, pathname: { $in: tagArray } });
  const tagIds = tagCategories.map(cat => cat._id);
  return { tags: { $all: tagIds } };
};

export const getBestSellers = async () => {
  const bestSellers = await Order.aggregate([
    { $match: { status: "delivered" } },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.product",
        totalSold: { $sum: "$orderItems.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
  ]);
  return bestSellers.map(item => item._id);
};

export const getOurPicks = async () => {
  const content = await Content.findOne({ active: true, deleted: false })
    .sort({ createdAt: -1 })
    .select("products_grid_page.our_picks");
  if (content?.products_grid_page?.our_picks) {
    return content.products_grid_page.our_picks;
  }
  console.log("No our_picks found in the content");
  return null;
};

export const handleCategoryFiltering = async category => {
  switch (category) {
    case "best_sellers":
      return { _id: { $in: await getBestSellers() } };
    case "our_picks":
      const ourPicks = await getOurPicks();
      return ourPicks ? { _id: { $in: ourPicks } } : null;
    case "discounted":
      return { previous_price: { $gt: 0 } };
    case "new_releases":
      return {};
    default:
      const categoryDoc = await Category.findOne({ deleted: false, pathname: category });
      return categoryDoc ? { tags: { $all: [categoryDoc._id] } } : {};
  }
};

export const sortProducts = (products, category, bestSellers, ourPicks) => {
  if (category === "best_sellers") {
    const bestSellerOrder = bestSellers.reduce((acc, id, index) => ({ ...acc, [id.toString()]: index }), {});
    return products.sort((a, b) => bestSellerOrder[a._id.toString()] - bestSellerOrder[b._id.toString()]);
  } else if (category === "our_picks" && ourPicks) {
    const ourPicksOrder = ourPicks.reduce((acc, id, index) => ({ ...acc, [id.toString()]: index }), {});
    return products.sort((a, b) => ourPicksOrder[a._id.toString()] - ourPicksOrder[b._id.toString()]);
  }
  return products;
};

export const handleChipFiltering = async chipPathname => {
  if (!chipPathname) return {};
  const chip = await Chip.findOne({ deleted: false, pathname: chipPathname });
  if (!chip) return {};
  return { chips: chip._id };
};
