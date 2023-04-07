export const is_admin = (current_user: any) => {
  return current_user && current_user.isAdmin;
};

export const isWholesaler = (current_user: any) => {
  return current_user && current_user.wholesaler;
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
