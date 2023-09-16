export const formatDate = dateString => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const determine_shown_fields = (fieldData, current_user) => {
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
      emptyObject[key] = {};
    }
    if (field.type === "image_upload") {
      emptyObject[key] = "";
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
