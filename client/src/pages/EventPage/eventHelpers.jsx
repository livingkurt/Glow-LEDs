// Helper function to check if the count of non-addon options is different
export const isOptionCountDifferent = (event, customizedEvent, isAddonChecked) => {
  const eventOptions = getRelevantOptions(event?.options, isAddonChecked);
  const selectedOptions = getRelevantOptions(customizedEvent?.selectedOptions, isAddonChecked);

  return selectedOptions.length < eventOptions.length;
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
  const newPrice = Number(state.event.price + additionalCost).toFixed(2);
  state.customizedEvent.price = newPrice;
};

export const calculateAdditionalCost = selectedOptions => {
  const total = selectedOptions.reduce((total, option) => total + (option?.additionalCost || 0), 0);
  return Number(total.toFixed(2));
};

export const updateEventDetailsFromOption = (state, selectedOption, option, fromUrlParams = false) => {
  const { event } = selectedOption;

  // Only update images if not loading from URL parameters
  if (!fromUrlParams) {
    if (option.image) {
      state.customizedEvent.images = [option.image];
    } else if (selectedOption.image) {
      state.customizedEvent.images = [selectedOption.image];
    } else if (selectedOption?.event?.images?.length > 0) {
      state.customizedEvent.images = selectedOption.event.images;
    }
  }
  if (selectedOption?.event?.chips?.length > 0) {
    state.customizedEvent.chips = selectedOption?.event?.chips;
  }

  // When event options are available, update the currentOptions based on option names
  if (event?.options?.length > 0) {
    const newOptionsByName = event.options.reduce((acc, option) => {
      acc[option.name] = option;
      return acc;
    }, {});

    // Prepare to update selectedOptions with defaults from new options
    const newSelectedOptions = [];

    state.customizedEvent.currentOptions = state.customizedEvent.currentOptions.map(existingOption => {
      const replacementOption = newOptionsByName[existingOption.name];
      if (replacementOption) {
        // Use the replacement option, and update the selectedOptions with the isDefault value
        const defaultOptionValue = replacementOption.values.find(value => value.isDefault);
        newSelectedOptions.push(defaultOptionValue || null); // Push null or some default value if no isDefault is found
        return replacementOption;
      } else {
        // Keep the existing option and its selected value
        const existingSelectedOptionIndex = state.customizedEvent.selectedOptions.findIndex(
          opt => opt.option === existingOption.name
        );
        const existingSelectedOption = state.customizedEvent.selectedOptions[existingSelectedOptionIndex];
        newSelectedOptions.push(existingSelectedOption);
        return existingOption;
      }
    });

    // // Update the selectedOptions state
  }

  if (event?.short_description) {
    state.customizedEvent.short_description = event.short_description;
  }
  if (event?.fact) {
    state.customizedEvent.fact = event.fact;
  }
  if (event?.max_quantity) {
    state.customizedEvent.max_quantity = event.max_quantity;
  }
  if (event?.count_in_stock > 0) {
    state.customizedEvent.count_in_stock = event.count_in_stock;
  }
  if (event?.previous_price > 0) {
    state.customizedEvent.previous_price = event.previous_price;
  }
  if (event?.sale.sale_price > 0) {
    state.customizedEvent.sale_price = event.sale.sale_price;
  }
  if (event?.sale.sale_start_date) {
    state.customizedEvent.sale_start_date = event.sale.sale_start_date;
  }
  if (event?.sale.sale_end_date) {
    state.customizedEvent.sale_end_date = event.sale.sale_end_date;
  }
  if (event?.wholesale_price > 0) {
    state.customizedEvent.wholesale_price = event.wholesale_price;
  }
  if (event?.wholesale_event) {
    state.customizedEvent.wholesale_event = event.wholesale_event;
  }
  if (event?.dimensions) {
    state.customizedEvent.dimensions = event.dimensions;
  }
};
export const handlePriceReplacement = (state, option, selectedOption) => {
  if (option?.replacePrice) {
    state.customizedEvent.price = selectedOption?.event?.price;
    state.customizedEvent.previousPriceWithAddOn = state?.customizedEvent?.price;
  } else {
    if (!state.customizedEvent.previousPriceWithAddOn) {
      state.customizedEvent.previousPriceWithAddOn = state.event.price;
    }
    const additionalCost = calculateAdditionalCost(state.customizedEvent.selectedOptions);
    updatePrice(state, additionalCost);
  }
};

export const determineInStock = event => {
  if (event.count_in_stock > 0) {
    return "Add To Cart";
  }
  if (event.sold_out) {
    return "Sold Out";
  } else {
    return "Restocking Soon";
  }
};

export const updateRecentlyViewed = event => {
  if (event.name) {
    const recently_viewed = sessionStorage.getItem("recently_viewed");
    const events = JSON.parse(recently_viewed) || [];

    const updatedEvents = events.filter(p => p.pathname !== event.pathname);

    const recentEvent = {
      pathname: event.pathname,
      name: event.name,
      image: event.images && event.images[0],
      price: event.price,
    };

    updatedEvents.unshift(recentEvent);

    const recentEvents = updatedEvents.slice(0, 4);

    sessionStorage.setItem("recently_viewed", JSON.stringify(recentEvents));
  }
};

export const eventPageBreadCrumbs = event => {
  const { category, subcategory, event_collection, name } = event;
  return [
    { name: "ALL PRODUCTS", to: "/collections/all/events" },
    { name: category?.toUpperCase().split("_").join(" "), to: `/collections/all/events/?tags[]=${category}` },
    {
      name: subcategory?.toUpperCase().split("_").join(" "),
      to: `/collections/all/events/?tags[]=${category}&tags[]=${subcategory}`,
    },
    {
      name: event_collection?.toUpperCase().split("_").join(" "),
      to: `/collections/all/events/?tags[]=${category}&tags[]=${subcategory}/collection/${event_collection}`,
    },
    { name: name?.toUpperCase().split("_").join(" ") },
  ];
};
