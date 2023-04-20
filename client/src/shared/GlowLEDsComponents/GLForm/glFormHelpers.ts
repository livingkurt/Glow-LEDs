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
