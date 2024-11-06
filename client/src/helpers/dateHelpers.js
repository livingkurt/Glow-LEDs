export const humanDate = createdAt => {
  if (!createdAt) return "Pending";
  return new Date(createdAt).toLocaleDateString();
};
