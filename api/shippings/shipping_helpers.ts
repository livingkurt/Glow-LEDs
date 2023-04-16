const generateOrientations = (length: string, width: string, height: string) => [
  [length, width, height],
  [length, height, width],
  [width, length, height],
  [width, height, length],
  [height, length, width],
  [height, width, length]
];

const fitsInParcel = (itemDimensions: any, parcel: any) => {
  const orientations = generateOrientations(itemDimensions.length, itemDimensions.width, itemDimensions.height);

  return orientations.some(([length, width, height]) => length <= parcel.length && width <= parcel.width && height <= parcel.height);
};

const filterParcels = (parcels: any, dimmensions: any) => {
  return parcels.filter((parcel: any) => dimmensions.every((itemDimensions: any) => fitsInParcel(itemDimensions, parcel)));
};

const getOrderItemDimensions = (orderItems: any) =>
  orderItems.map((item: any) => ({
    length: item.package_length,
    width: item.package_width,
    height: item.package_height,
    volume: item.package_volume,
    qty: parseInt(item.qty)
  }));

const selectBestFitParcel = (fit_parcels: any, all_parcels: any) => {
  if (fit_parcels.length === 0) {
    const sorted_fit_parcels = all_parcels.sort((a: any, b: any) => (a.volume > b.volume ? -1 : 1));
    return sorted_fit_parcels[0];
  } else {
    return fit_parcels[0];
  }
};

// Update the main function
export const determine_parcel = (orderItems: any, parcels: any[]) => {
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

export const determine_parcel_weight = (order: any) => {
  let weight = 0;
  order.orderItems.forEach((item: any, index: number) => {
    if (item.weight_pounds) {
      weight += parseInt(item.weight_pounds) * 16 + parseInt(item.weight_ounces);
    } else {
      weight += parseInt(item.weight_ounces);
    }
    weight *= item.qty;
  });
  return weight;
};

export const calculateTotalOunces = (cartItems: any) => {
  let totalOunces = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const weightInOunces = (item?.weight_pounds * 16 || 0) + (item?.weight_ounces || 0);
    totalOunces += weightInOunces * item.qty;
  }
  return totalOunces;
};

export const calculateTotalPounds = (cartItems: any) => {
  let totalOunces = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const weightInOunces = item.weight_pounds * 16 + item.weight_ounces;
    totalOunces += weightInOunces * item.qty;
  }
  const totalPounds = totalOunces / 16;
  return totalPounds;
};

// // Helper function to calculate the remaining volume after placing an item
// const calculateRemainingVolume = (parcel: { volume: number }, item: { volume: number; qty: number }) =>
//   parcel.volume - item.volume * item.qty;

// // Best Fit Decreasing algorithm
// const bestFitDecreasing = (dimmensions: any, parcels: any) => {
//   // Sort items by volume in decreasing order
//   const sortedItems = [...dimmensions].sort((a, b) => b.volume * b.qty - a.volume * a.qty);

//   // Deep copy of the parcels array
//   const availableParcels = parcels.map((parcel: any) => ({ ...parcel }));

//   for (const item of sortedItems) {
//     const { length, width, height } = item;
//     let minRemainingVolume = Infinity;
//     let bestFitParcelIndex = -1;

//     for (const [index, parcel] of availableParcels.entries()) {
//       if (fitsInParcel({ length, width, height }, parcel)) {
//         const remainingVolume = calculateRemainingVolume(parcel, item);

//         if (remainingVolume < minRemainingVolume) {
//           minRemainingVolume = remainingVolume;
//           bestFitParcelIndex = index;
//         }
//       }
//     }

//     if (bestFitParcelIndex !== -1) {
//       // Place the item in the best-fit parcel and update the remaining volume
//       availableParcels[bestFitParcelIndex].volume = minRemainingVolume;
//     } else {
//       return null;
//     }
//   }

//   // Return the parcel with the minimum remaining volume after packing all items
//   return availableParcels.sort((a, b) => a.volume - b.volume)[0];
// };
// // Update the main function
// export const determine_parcel = (orderItems: any, parcels: any[]) => {
//   const dimmensions = getOrderItemDimensions(orderItems);

//   const bestFitParcels = bestFitDecreasing(dimmensions, parcels);
//   console.log({ bestFitParcels });

//   if (bestFitParcels) {
//     return bestFitParcels;
//   } else {
//     const fitParcels = filterParcels(parcels, dimmensions);
//     const selectedParcel = selectBestFitParcel(fitParcels, parcels);
//     console.log({ selectedParcel });
//     if (selectedParcel) {
//       return selectedParcel;
//     } else {
//       // If no parcel is found in the previous approach, return the biggest box
//       const biggestBox = parcels.sort((a, b) => b.volume - a.volume)[0];
//       return biggestBox;
//     }
//   }
// };
