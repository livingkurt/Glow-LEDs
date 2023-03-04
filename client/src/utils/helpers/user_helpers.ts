export const isAdmin = (current_user: any) => {
  return current_user && current_user.isAdmin;
};

export const isLoggedIn = (current_user: any) => {
  return current_user;
};

export const headers = (current_user: any) => {
  return {
    headers: {
      Authorization: "Bearer " + current_user.access_token
    }
  };
};
