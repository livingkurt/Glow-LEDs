export const headers = (current_user: any) => {
  return {
    headers: {
      Authorization: "Bearer " + current_user.access_token
    }
  };
};
