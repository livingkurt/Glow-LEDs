const generateOrientations = (length, width, height) => [
  [length, width, height],
  [length, height, width],
  [width, length, height],
  [width, height, length],
  [height, length, width],
  [height, width, length],
];

const fitsInParcel = (itemDimensions, parcel) => {
  const orientations = generateOrientations(itemDimensions.length, itemDimensions.width, itemDimensions.height);

  return orientations.some(
    ([length, width, height]) => length <= parcel.length && width <= parcel.width && height <= parcel.height
  );
};

const filterParcels = (parcels, dimmensions) => {
  return parcels.filter((parcel) =>
    dimmensions.every((itemDimensions) => fitsInParcel(itemDimensions, parcel))
  );
};

const getOrderItemDimensions = (orderItems) =>
  orderItems.map((item) => ({
    length: item.package_length,
    width: item.package_width,
    height: item.package_height,
    volume: item.package_volume,
    qty: parseInt(item.qty),
  }));

const selectBestFitParcel = (fit_parcels, all_parcels) => {
  if (fit_parcels.length === 0) {
    const sorted_fit_parcels = all_parcels.sort((a, b) => (a.volume > b.volume ? -1 : 1));
    return sorted_fit_parcels[0];
  } else {
    return fit_parcels[0];
  }
};

// Update the main function
export const determine_parcel = (orderItems, parcels[]) => {
  const dimmensions = getOrderItemDimensions(orderItems);

  const fitParcels = filterParcels(parcels, dimmensions);
  const selectedParcel = selectBestFitParcel(fitParcels, parcels);
  if (selectedParcel) {
    return selectedParcel;
  } else {
    // If no parcel is found in the previous approach, return the biggest box
    const biggestBox = parcels.sort((a, b) => b.volume - a.volume)[0];
    return biggestBox;
  }
};

export const determine_parcel_weight = (order) => {
  let weight = 0;
  order.orderItems.forEach((item, index) => {
    if (item.weight_pounds) {
      weight += parseInt(item.weight_pounds) * 16 + parseInt(item.weight_ounces);
    } else {
      weight += parseInt(item.weight_ounces);
    }
    weight *= item.qty;
  });
  return weight;
};

export const calculateTotalOunces = (cartItems) => {
  let totalOunces = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const weightInOunces = (item?.weight_pounds * 16 || 0) + (item?.weight_ounces || 0);
    totalOunces += weightInOunces * item.qty;
  }
  return totalOunces;
};

export const covertToOunces = (weight) => {
  const weightInOunces = (weight?.weight_pounds * 16 || 0) + (weight?.weight_ounces || 0);
  return weightInOunces;
};

export const calculateTotalPounds = (cartItems) => {
  let totalOunces = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const weightInOunces = item.weight_pounds * 16 + item.weight_ounces;
    totalOunces += weightInOunces * item.qty;
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
