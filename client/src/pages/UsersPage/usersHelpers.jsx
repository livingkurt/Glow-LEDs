const colors = [
  { name: "Not Verified", color: "#333333" },
  { name: "Verified", color: "#3e4c6d" },
  { name: "Admin", color: "#525252" },
  { name: "Affiliated", color: "#7d5555" },
  { name: "Guest", color: "#3e6d6b" },
  { name: "Employee", color: "#557d68" },
];

export const determineColor = user => {
  let result = "";
  if (!user.isVerified) {
    result = colors[0].color;
  }
  if (user.isVerified) {
    result = colors[1].color;
  }
  if (user.guest) {
    result = colors[4].color;
  }
  if (user.is_affiliated) {
    result = colors[3].color;
  }
  if (user.is_employee) {
    result = colors[5].color;
  }
  if (user.isAdmin) {
    result = colors[2].color;
  }
  //
  return result;
};

export const fullName = user => {
  return user?.first_name ? `${user.first_name} ${user.last_name}` : "";
};

const allAttributes = [
  "first_name",
  "last_name",
  "email",
  "shipping",
  "password",
  "stripe_connect_id",
  "isAdmin",
  "isVerified",
  "is_affiliated",
  "is_employee",
  "weekly_wage",
  "palettes",
  "affiliate",
  "email_subscription",
  "guest",
  "wholesaler",
  "isWholesaler",
  "minimum_order_amount",
];

export const attributes = (user1, user2) =>
  Array.from(new Set([...allAttributes, ...Object.keys(user1), ...Object.keys(user2)]));

export const duplicateUser = user => {
  return {
    ...user,
    first_name: `Copy ${user.first_name}`,
    email: `copy${user.email}`,
    _id: null,
    password: null,
    createdAt: null,
    updatedAt: null,
  };
};
