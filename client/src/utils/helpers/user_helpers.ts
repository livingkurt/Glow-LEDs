export const isAdmin = (userInfo: any) => {
  return userInfo && userInfo.isAdmin;
};

export const isLoggedIn = (userInfo: any) => {
  return userInfo;
};
