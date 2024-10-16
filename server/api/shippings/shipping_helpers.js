export const determine_parcel = (orderItems, parcels) => {
  const dimensions = getOrderItemDimensions(orderItems);

  const suitableParcel = findSuitableParcel(dimensions, parcels);

  if (suitableParcel) {
    return suitableParcel;
  }
  const binDimensions = calculateCustomParcelDimensions(dimensions);

  const packedItems = packItems(dimensions, binDimensions);

  const customParcel = createCustomParcel(binDimensions.length, binDimensions.width, binDimensions.height);

  return customParcel;
};

const findSuitableParcel = (dimensions, parcels) => {
  const sortedParcels = parcels.sort((a, b) => {
    // Sort parcels by volume in ascending order
    const volumeDiff = a.volume - b.volume;
    if (volumeDiff !== 0) {
      return volumeDiff;
    }
    // If volumes are equal, prioritize bubble mailers over boxes
    if (a.type === "bubble_mailer" && b.type !== "bubble_mailer") {
      return -1;
    }
    if (a.type !== "bubble_mailer" && b.type === "bubble_mailer") {
      return 1;
    }
    return 0;
  });

  for (const parcel of sortedParcels) {
    const { length, width, height } = parcel;
    const parcelVolume = length * width * height;

    const itemsVolume = dimensions.reduce((sum, item) => sum + item.volume * item.qty, 0);

    if (itemsVolume <= parcelVolume) {
      const packedItems = packItems(dimensions, parcel);

      if (packedItems.length === dimensions.length) {
        return parcel;
      }
    }
  }

  return null;
};

const getOrderItemDimensions = orderItems =>
  orderItems.map(item => ({
    length: item.dimensions.package_length,
    width: item.dimensions.package_width,
    height: item.dimensions.package_height,
    volume: item.dimensions.package_volume,
    quantity: parseInt(item.quantity),
  }));

const calculateCustomParcelDimensions = dimensions => {
  // Sort dimensions by volume in descending order
  const sortedDimensions = dimensions.sort((a, b) => b.volume - a.volume);

  let customLength = 0;
  let customWidth = 0;
  let customHeight = 0;

  for (const item of sortedDimensions) {
    const orientations = [
      { length: item.length, width: item.width, height: item.height },
      { length: item.width, width: item.height, height: item.length },
      { length: item.height, width: item.length, height: item.width },
    ];

    let bestOrientation = null;
    let minVolume = Infinity;

    for (const orientation of orientations) {
      const newLength = Math.max(customLength, orientation.length);
      const newWidth = Math.max(customWidth, orientation.width);
      const newHeight = Math.max(customHeight, orientation.height);
      const newVolume = newLength * newWidth * newHeight;

      if (newVolume < minVolume) {
        bestOrientation = orientation;
        minVolume = newVolume;
      }
    }

    customLength = Math.max(customLength, bestOrientation.length);
    customWidth = Math.max(customWidth, bestOrientation.width);
    customHeight = Math.max(customHeight, bestOrientation.height);
  }

  // Add padding based on dimensions
  const lengthPadding = customLength * 0.05;
  const widthPadding = customWidth * 0.05;
  const heightPadding = customHeight * 0.1;

  customLength += lengthPadding;
  customWidth += widthPadding;
  customHeight += heightPadding;

  // Adjust dimensions to meet minimum requirements
  customLength = Math.max(customLength, 10);
  customWidth = Math.max(customWidth, 10);
  customHeight = Math.max(customHeight, 10);

  return {
    length: Math.ceil(customLength),
    width: Math.ceil(customWidth),
    height: Math.ceil(customHeight),
  };
};

const packItems = (items, binDimensions) => {
  const bin = {
    length: binDimensions.length,
    width: binDimensions.width,
    height: binDimensions.height,
    items: [],
  };

  items.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      const orientations = [
        { length: item.length, width: item.width, height: item.height },
        { length: item.width, width: item.height, height: item.length },
        { length: item.height, width: item.length, height: item.width },
      ];

      let packedItem = null;
      let maxVolume = 0;

      orientations.forEach(orientation => {
        const { length, width, height } = orientation;
        const volume = length * width;

        if (
          length <= bin.length &&
          width <= bin.width &&
          height <= bin.height - bin.items.reduce((sum, item) => sum + item.height, 0)
        ) {
          if (volume > maxVolume) {
            maxVolume = volume;
            packedItem = { length, width, height };
          }
        }
      });

      if (packedItem) {
        bin.items.push(packedItem);
      } else {
        console.log(`Item ${JSON.stringify(item)} could not be packed.`);
      }
    }
  });

  return bin.items;
};

const createCustomParcel = (length, width, height) => {
  return {
    length,
    width,
    height,
    volume: length * width * height,
  };
};

export const determine_parcel_weight = order => {
  let weight = 0;
  order.orderItems.forEach((item, index) => {
    if (item.dimensions.weight_pounds) {
      weight += parseInt(item.dimensions.weight_pounds) * 16 + parseInt(item.dimensions.weight_ounces);
    } else {
      weight += parseInt(item.dimensions.weight_ounces);
    }
    weight *= item.quantity;
  });
  return weight;
};

export const calculateTotalOunces = cartItems => {
  let totalOunces = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const weightInOunces = (item.dimensions?.weight_pounds * 16 || 0) + (item.dimensions?.weight_ounces || 0);
    totalOunces += weightInOunces * item.quantity;
  }
  return totalOunces;
};

export const covertToOunces = item => {
  const weightInOunces = (item?.dimensions.weight_pounds * 16 || 0) + (item?.dimensions.weight_ounces || 0);
  return weightInOunces;
};

export const calculateTotalPounds = cartItems => {
  let totalOunces = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const weightInOunces = item.dimensions.weight_pounds * 16 + item.dimensions.weight_ounces;
    totalOunces += weightInOunces * item.quantity;
  }
  const totalPounds = totalOunces / 16;
  return totalPounds;
};

export const parseOrderData = (shipment, order) => {
  try {
    const data = {
      "to_address.name": shipment.buyer_address.name,
      "to_address.company": shipment.buyer_address.company || "",
      "to_address.phone": shipment.buyer_address.phone || "",
      "to_address.email": shipment.buyer_address.email || "",
      "to_address.street1": shipment.buyer_address.street1,
      "to_address.street2": shipment.buyer_address.street2 || "",
      "to_address.city": shipment.buyer_address.city,
      "to_address.state": shipment.buyer_address.state,
      "to_address.zip": shipment.buyer_address.zip,
      "to_address.country": shipment.buyer_address.country,
      "from_address.name": shipment.return_address.name || "",
      "from_address.company": shipment.return_address.company || "",
      "from_address.phone": shipment.return_address.phone || "",
      "from_address.email": shipment.return_address.email || "",
      "from_address.street1": shipment.return_address.street1,
      "from_address.street2": shipment.return_address.street2 || "",
      "from_address.city": shipment.return_address.city,
      "from_address.state": shipment.return_address.state,
      "from_address.zip": shipment.return_address.zip,
      "from_address.country": shipment.return_address.country,
      "parcel.length": shipment.parcel.length,
      "parcel.width": shipment.parcel.width,
      "parcel.height": shipment.parcel.height,
      "parcel.weight": shipment.parcel.weight,
      "parcel.predefined_package": shipment.parcel.predefined_package || "",
      carrier: order.shipping.shipping_rate.carrier,
      service: order.shipping.shipping_rate.service,
      "customs.customs_certify": shipment.customs_info.customs_certify,
      "customs.customs_signer": shipment.customs_info.customs_signer,
      "customs.contents_type": shipment.customs_info.contents_type,
      "customs.restriction_type": shipment.customs_info.restriction_type,
      "customs.eel_pfc": shipment.customs_info.eel_pfc,
      "customs_item.description": shipment.customs_info.customs_items[0].description,
      "customs_item.quantity": shipment.customs_info.customs_items[0].quantity,
      "customs_item.weight_oz": shipment.customs_info.customs_items[0].weight_oz,
      "customs_item.value": shipment.customs_info.customs_items[0].value,
      "customs_item.code": shipment.customs_info.customs_items[0].code,
      "customs_item.hs_tariff_number": shipment.customs_info.customs_items[0].hs_tariff_number,
      "customs_item.origin_country": shipment.customs_info.customs_items[0].origin_country,
    };
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
