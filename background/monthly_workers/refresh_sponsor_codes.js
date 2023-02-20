const axios = require("axios");
const { domain } = require("../worker_helpers");

const refresh_sponsor_codes = async () => {
  try {
    const domainUrl = domain();

    await axios.put(`${domainUrl}/api/promos/refresh_sponsor_codes`);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.refresh_sponsor_codes = refresh_sponsor_codes;
