// Helper function to check if the count of non-addon options is different
export const isOptionCountDifferent = (product, customizedProduct, isAddonChecked) => {
  const productOptions = getRelevantOptions(product?.options, isAddonChecked);
  const selectedOptions = getRelevantOptions(customizedProduct?.selectedOptions, isAddonChecked);

  return selectedOptions.length < productOptions.length;
};

// Helper function to get relevant options based on isAddonChecked
export const getRelevantOptions = (options = [], isAddonChecked) => {
  if (isAddonChecked) {
    return options.map(option => option?._id).filter(Boolean);
  } else {
    return options
      .filter(option => !option?.isAddOn)
      .map(option => option?._id)
      .filter(Boolean);
  }
};

export const updatePrice = (state, additionalCost) => {
  // Update regular price
  const newPrice = Number(state.product.price + additionalCost).toFixed(2);
  state.customizedProduct.price = newPrice;

  // Check if there's an active sale
  const today = new Date();
  const isSaleActive =
    state.product.sale?.price &&
    state.product.sale?.start_date &&
    state.product.sale?.end_date &&
    today >= new Date(state.product.sale?.start_date) &&
    today <= new Date(state.product.sale?.end_date);

  // Update sale price if there's an active sale
  if (isSaleActive) {
    state.customizedProduct.sale = {
      ...state.product.sale,
      price: Number(state.product.sale.price + additionalCost).toFixed(2),
    };
  }
};

export const calculateAdditionalCost = (selectedOptions, currentOptions, addonCheckedStates = {}) => {
  const total = selectedOptions.reduce((total, selectedOption, index) => {
    // Get the corresponding option definition
    const optionDefinition = currentOptions[index];

    // Skip if no option definition exists
    if (!optionDefinition) {
      return total;
    }

    // For add-ons, only include costs if the add-on is checked
    if (optionDefinition.isAddOn) {
      // Only include costs if the add-on is checked
      if (addonCheckedStates[index]) {
        return total + (optionDefinition.additionalCost || 0) + (selectedOption?.additionalCost || 0);
      }
      return total;
    }

    // For non-add-ons, always include option-level cost and selected value cost
    const optionCost = optionDefinition.additionalCost || 0;
    const valueCost = selectedOption?.additionalCost || 0;
    return total + optionCost + valueCost;
  }, 0);

  return Number(total.toFixed(2));
};
export const updateProductDetailsFromOption = (state, selectedOption, option, fromUrlParams = false) => {
  const { product } = selectedOption;

  // Only update images if not loading from URL parameters
  if (!fromUrlParams) {
    if (option.image) {
      state.customizedProduct.images = [option.image];
    } else if (selectedOption.image) {
      state.customizedProduct.images = [selectedOption.image];
    } else if (selectedOption?.product?.images?.length > 0) {
      state.customizedProduct.images = selectedOption.product.images;
    }
  }
  if (selectedOption?.product?.microlights?.length > 0) {
    state.customizedProduct.microlights = selectedOption?.product?.microlights;
  }

  // When product options are available, update the currentOptions based on option names
  if (product?.options?.length > 0) {
    const newOptionsByName = product.options.reduce((acc, option) => {
      acc[option.name] = option;
      return acc;
    }, {});

    // Prepare to update selectedOptions with defaults from new options
    const newSelectedOptions = [];

    state.customizedProduct.currentOptions = state.customizedProduct.currentOptions.map(existingOption => {
      const replacementOption = newOptionsByName[existingOption.name];
      if (replacementOption) {
        // Use the replacement option, and update the selectedOptions with the isDefault value
        const defaultOptionValue = replacementOption.values.find(value => value.isDefault);
        newSelectedOptions.push(defaultOptionValue || null); // Push null or some default value if no isDefault is found
        return replacementOption;
      } else {
        // Keep the existing option and its selected value
        const existingSelectedOptionIndex = state.customizedProduct.selectedOptions.findIndex(
          opt => opt.option === existingOption.name
        );
        const existingSelectedOption = state.customizedProduct.selectedOptions[existingSelectedOptionIndex];
        newSelectedOptions.push(existingSelectedOption);
        return existingOption;
      }
    });
  }

  if (product?.short_description) {
    state.customizedProduct.short_description = product.short_description;
  }
  if (product?.fact) {
    state.customizedProduct.fact = product.fact;
  }
  if (product?.max_display_quantity) {
    state.customizedProduct.max_display_quantity = product.max_display_quantity;
  }
  if (product?.max_quantity) {
    state.customizedProduct.max_quantity = product.max_quantity;
  }
  if (product?.count_in_stock > 0) {
    state.customizedProduct.count_in_stock = product.count_in_stock;
  }
  if (product?.previous_price > 0) {
    state.customizedProduct.previous_price = product.previous_price;
  }
  if (product?.sale) {
    state.customizedProduct.sale = {
      price: product.sale.price || 0,
      start_date: product.sale.start_date || null,
      end_date: product.sale.end_date || null,
    };
  }
  if (product?.wholesale_product) {
    state.customizedProduct.wholesale_product = product.wholesale_product;
  }
  if (product?.dimensions) {
    state.customizedProduct.dimensions = product.dimensions;
  }
  // Don't update price if this option doesn't replace price
  if (!option.replacePrice) {
    if (product?.price) {
      // Store the original product price for reference
      state.customizedProduct.originalPrice = product.price;
    }

    if (product?.wholesale_price > 0) {
      state.customizedProduct.wholesale_price = product.wholesale_price;
    }
  }
};

export const handlePriceReplacement = (state, option, selectedOption) => {
  const additionalCost = calculateAdditionalCost(
    state.customizedProduct.selectedOptions,
    state.customizedProduct.currentOptions
  );
  // Find any selected option that has replacePrice: true
  const priceReplacingOption = state.customizedProduct.currentOptions?.find((opt, index) => {
    if (opt.replacePrice) {
      const selectedOpt = state.customizedProduct.selectedOptions[index];
      return selectedOpt?.name; // Return true if this price-replacing option has a selection
    }
    return false;
  });

  if (option?.replacePrice) {
    // This is a price-replacing option being selected
    const basePrice = selectedOption?.product?.price;
    state.customizedProduct.price = Number(basePrice + additionalCost).toFixed(2);
    state.customizedProduct.previousPriceWithAddOn = state?.customizedProduct?.price;

    // Update sale information with additional cost
    if (selectedOption?.product?.sale) {
      state.customizedProduct.sale = {
        ...selectedOption.product.sale,
        price: Number(selectedOption.product.sale.price + additionalCost).toFixed(2),
      };
    }
  } else if (priceReplacingOption) {
    // Another option changed, but we have a price-replacing option selected
    const index = state.customizedProduct.currentOptions.indexOf(priceReplacingOption);
    const selection = state.customizedProduct.selectedOptions[index];
    if (selection?.product?.price) {
      const basePrice = selection.product.price;
      state.customizedProduct.price = Number(basePrice + additionalCost).toFixed(2);
      state.customizedProduct.previousPriceWithAddOn = state.customizedProduct.price;

      // Update sale information with additional cost
      if (selection?.product?.sale) {
        state.customizedProduct.sale = {
          ...selection.product.sale,
          price: Number(selection.product.sale.price + additionalCost).toFixed(2),
        };
      }
    }
  } else {
    // No price-replacing options selected, use normal price calculation
    if (!state.customizedProduct.previousPriceWithAddOn) {
      state.customizedProduct.previousPriceWithAddOn = state.product.price;
    }
    updatePrice(state, additionalCost);
  }
};
export const determineInStock = product => {
  if (product.count_in_stock > 0) {
    return "Add To Cart";
  }
  if (product.sold_out) {
    return "Sold Out";
  } else {
    return "Restocking Soon";
  }
};

export const updateRecentlyViewed = product => {
  if (product.name) {
    const recently_viewed = sessionStorage.getItem("recently_viewed");
    const products = JSON.parse(recently_viewed) || [];

    const updatedProducts = products.filter(p => p.pathname !== product.pathname);

    const recentProduct = {
      pathname: product.pathname,
      name: product.name,
      image: product.images && product.images[0],
      price: product.price,
    };

    updatedProducts.unshift(recentProduct);

    const recentProducts = updatedProducts.slice(0, 4);

    sessionStorage.setItem("recently_viewed", JSON.stringify(recentProducts));
  }
};

export const productPageBreadCrumbs = product => {
  const { category, subcategory, product_collection, name } = product;
  return [
    { name: "ALL PRODUCTS", to: "/products" },
    { name: category?.toUpperCase().split("_").join(" "), to: `/products/?tags[]=${category}` },
    {
      name: subcategory?.toUpperCase().split("_").join(" "),
      to: `/products/?tags[]=${category}&tags[]=${subcategory}`,
    },
    {
      name: product_collection?.toUpperCase().split("_").join(" "),
      to: `/products/?tags[]=${category}&tags[]=${subcategory}/collection/${product_collection}`,
    },
    { name: name?.toUpperCase().split("_").join(" ") },
  ];
};

export const scrollToElement = target => {
  const element = document.getElementById(target);
  if (element) {
    const offset = 200; // Adjust this value based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Filter active options and their active values
export const getActiveOptions = product =>
  product?.options
    ?.filter(option => option.active)
    .map(option => ({
      ...option,
      values: option.values.filter(value => value.active),
    }));

// Maintain original selectedOptions behavior, but only for active options and values
export const getSelectedOptions = product =>
  product?.options
    ?.map(option => {
      if (!option.active) return null;
      if (option.isAddOn) return {};
      const activeValue = option.values.find(value => value.active && value.isDefault);
      return activeValue || {};
    })
    .filter(Boolean);
