export const mostRecentPayment = (payments: any) => {
  return payments[payments.length - 1];
};

export const dedupeAddresses = (addresses: any[]) => {
  const seen = new Set();
  let uniqueKey = 0;

  const uniqueAddresses = addresses.filter((address: any) => {
    const serialized = `${address.first_name} ${address.last_name}`.toLowerCase();
    if (seen.has(serialized)) {
      return false;
    }
    seen.add(serialized);

    // Add a unique key to the address
    address.uniqueKey = uniqueKey++;
    return true;
  });

  // Sort by first_name and then by last_name
  uniqueAddresses.sort((a: any, b: any) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return uniqueAddresses;
};
