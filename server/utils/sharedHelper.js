export const handlePromise = async promise => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

// // Usage:
// const [data, error] = await handlePromise(myPromise);

// if (error) {
//   // handle error
// } else {
//   // use data
// }
