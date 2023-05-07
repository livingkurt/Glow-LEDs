export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const determine_shown_fields = (fieldData: any, current_user: any) => {
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

export const getValueByStringPath = (obj: any, path: string) => {
  const properties = path.split(".");
  let result = obj;
  console.log({ obj });
  console.log({ path });
  console.log({ properties });

  for (const property of properties) {
    console.log({ property });
    if (result && Object.prototype.hasOwnProperty.call(result, property)) {
      result = result[property];
    } else {
      return undefined;
    }
  }
  console.log({ result });
  return result;
};
