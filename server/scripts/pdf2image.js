const { fromPath } = require("pdf2pic");

const options = {
  density: 100,
  saveFilename: "mUlT65fl6_hcSnL3VU05hRNCYRZd1d_HV1OjL_FgsnQ",
  savePath: "temp",
  format: "png",
  width: 600,
  height: 600
};
const storeAsImage = fromPath("temp/mUlT65fl6_hcSnL3VU05hRNCYRZd1d_HV1OjL_FgsnQ.pdf", options);
const pageToConvertAsImage = 1;

storeAsImage(pageToConvertAsImage).then(resolve => {
  console.log("Page 1 is now converted as image");

  return resolve;
});
