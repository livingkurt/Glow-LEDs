export const determine_service = rate => {
  if (rate.est_delivery_days) {
    return `Est: ${rate.est_delivery_days} ${rate.est_delivery_days === 1 ? "Day" : "Days"}`;
  } else if (rate.service === "INTERNATIONAL_ECONOMY") {
    return "Est: 2-5 Days";
  } else if (rate.service === "FirstClassPackageInternationalService") {
    return "Est: 4+ Weeks";
  } else if (rate.service === "FEDEX_INTERNATIONAL_PRIORITY") {
    return "Est: 1-3 Days";
  } else if (rate.service === "FEDEX_EXPRESS_SAVER") {
    return "Est: 3 Days";
  } else if (rate.service === "FirstMailInternational") {
    return "Est: 1-4 Weeks";
  } else if (rate.service === "PriorityMailInternational") {
    return "Est: 6-10 Days";
  } else if (rate.service === "ExpressMailInternational") {
    return "Est: 3-5 Days";
  } else if (rate.service === "Express") {
    return "Est: 3 Days";
  }
};

export const toTitleCaseSnakeCase = str => {
  return str
    .split("_")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join(" ");
};

export const isRequired = (value, fieldName) => (value === "" ? `${fieldName} is Required` : null);

export const validateSection = (sectionFields, sectionState, validationResult) => {
  Object.keys(sectionFields).forEach(fieldName => {
    const field = sectionFields[fieldName];
    if (field.validate) {
      const value = sectionState[fieldName];
      const errorMessage = field.validate(value);
      if (errorMessage) {
        validationResult.isValid = false;
        validationResult.errorMessages[fieldName] = errorMessage;
      }
    }
  });
};

export const mapServiceName = service => {
  const serviceMap = {
    "PriorityMailInternational": "Priority",
    "ExpressMailInternational": "Express",
    "FirstClassPackageInternationalService": "First Class (Not Recommended)",
    "Express": "Express",
    "Expedited": "Expedited",
    "UPSSaver": "UPS Saver",
    "FEDEX_INTERNATIONAL_PRIORITY": "Priority",
    "INTERNATIONAL_ECONOMY": "Economy",
  };
  return serviceMap[service] || service;
};
export const mapCarrierName = carrier => {
  const carrierMap = {
    "UPSDAP": "UPS",
    "USPS": "USPS",
    "FedEx": "FedEx",
  };
  return carrierMap[carrier] || carrier;
};

export const serviceNames = ["USPS: Standard", "UPS: Ground", "UPS: Priority"];
