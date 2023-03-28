export const chooseParcelSize = (cartItems: any, parcelSizes: any) => {
  // Step 1: Calculate total volume of items in cart
  let totalVolume = 0;
  cartItems.forEach((item: any) => {
    totalVolume += item.package_length * item.package_width * item.package_height * item.qty;
  });

  // Step 2: Sort parcel sizes by volume
  const sortedParcelSizes = parcelSizes.sort((a: any, b: any) => a.volume - b.volume);

  // Step 3: Find smallest parcel size that can fit all items
  let chosenParcelSize = null;
  for (let i = 0; i < sortedParcelSizes.length; i++) {
    const parcel = sortedParcelSizes[i];
    const parcelQty = Math.floor(parcel.qty / parcel.volume);
    if (parcelQty >= totalVolume) {
      chosenParcelSize = parcel;
      break;
    }
  }

  // Step 4: Return chosen parcel size or null if not found
  return chosenParcelSize;
};
