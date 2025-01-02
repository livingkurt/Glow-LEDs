import { toCapitalize } from "../../../utils/helper_functions";

export const formatDate = dateString => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
export const formatDateTimeLocal = isoString => {
  if (!isoString) return "";

  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const determine_shown_fields = (fieldData, current_user, mode) => {
  let result = true;
  if (fieldData.type !== "array_of_objects") {
    result = false;
  }
  if (fieldData.type !== "objects") {
    result = false;
  }
  if (fieldData.permissions) {
    if (!current_user?.isAdmin && fieldData?.permissions?.includes("admin")) {
      result = false;
    }
    if (current_user?.isAdmin && fieldData?.permissions?.includes("admin")) {
      result = true;
    }
  } else {
    result = true;
  }
  if (fieldData.modes && !fieldData.modes.includes(mode)) {
    result = false;
  }
  return result;
};

export const getValueByStringPath = (obj, path) => {
  const properties = path.split(".");
  let result = obj;
  for (const property of properties) {
    if (result && Object.prototype.hasOwnProperty.call(result, property)) {
      result = result[property];
    } else {
      return undefined;
    }
  }
  return result;
};

export const getEmptyObjectFromSchema = schema => {
  const emptyObject = {};
  Object.keys(schema).forEach(key => {
    const field = schema[key];
    if (field.type === "text") {
      emptyObject[key] = "";
    }
    if (field.type === "autocomplete_single") {
      emptyObject[key] = null;
    }
    if (field.type === "image_upload_single") {
      emptyObject[key] = null;
    }
    if (field.type === "image_upload_multiple") {
      emptyObject[key] = [];
    }
    if (field.type === "autocomplete_multiple") {
      emptyObject[key] = [];
    }
    if (field.type === "checkbox") {
      emptyObject[key] = false;
    }
    if (field.type === "autocomplete_address") {
      emptyObject[key] = {};
    }
    if (field.type === "text") {
      emptyObject[key] = "";
    }
    if (field.type === "number") {
      emptyObject[key] = 0;
    }
    if (field.type === "date") {
      emptyObject[key] = "";
    }
    if (field.type === "text_multiline") {
      emptyObject[key] = "";
    }
    if (field.type === "object") {
      emptyObject[key] = {};
    }
    if (field.type === "array") {
      emptyObject[key] = [];
    }
    // Add more conditions for other field types if needed
  });
  return emptyObject;
};

export const getSelectedValue = (fieldData, fieldState) => {
  const selected = fieldData.valueAttribute
    ? fieldData.options.find(opt => opt[fieldData.valueAttribute] === fieldState)
    : fieldState;
  return selected;
};

export const userField = ({ users, ...otherProps }) => {
  return {
    type: "autocomplete_single",
    label: "User",
    options: users
      ?.filter(user => user.first_name && user.last_name)
      .sort((a, b) => a.first_name.localeCompare(b.first_name)),
    labelProp: "user",
    getOptionLabel: option => {
      if (!option || (!option.first_name && !option.last_name)) return "";
      return `${option.first_name || ""} ${option.last_name || ""}`.trim();
    },
    ...otherProps,
  };
};
export const filamentField = ({ filaments, ...otherProps }) => {
  return {
    type: "autocomplete_single",
    label: "Filament",
    options: filaments,
    getOptionLabel: option => {
      if (!option || (!option.color && !option.type)) return "";
      return `${option.color || ""} ${option.type || ""}`.trim();
    },
    labelProp: "filament",
    ...otherProps,
  };
};

export const affiliateField = ({ affiliates, ...otherProps }) => {
  return {
    type: "autocomplete_single",
    label: "Affiliate",
    options: affiliates,
    labelProp: "artist_name",
    getOptionLabel: option => `${option.artist_name}`,
    ...otherProps,
  };
};
export const promoField = ({ promos, ...otherProps }) => {
  return {
    type: "autocomplete_single",
    label: "Promo",
    options: promos,
    labelProp: "promo_code",
    getOptionLabel: option => {
      if (!option || !option.promo_code) return "";
      return option.promo_code.toUpperCase();
    },
    ...otherProps,
  };
};

export const tagField = ({ tags, ...otherProps }) => {
  return {
    type: "autocomplete_multiple",
    label: "Tags",
    options: tags,
    getOptionLabel: option => {
      return `${option.name}`;
    },
    labelProp: "name",
    ...otherProps,
  };
};

export const modeField = ({ modes, ...otherProps }) => {
  return {
    type: "autocomplete_multiple",
    label: "Modes",
    options: modes,
    labelProp: "name",
    getOptionLabel: option => option.name,
    ...otherProps,
  };
};

export const stringAutocompleteField = ({ options, ...otherProps }) => {
  return {
    type: "autocomplete_single",
    getOptionLabel: option => {
      if (typeof option === "string") {
        return toCapitalize(option);
      }
    },
    options: options,
    ...otherProps,
  };
};
