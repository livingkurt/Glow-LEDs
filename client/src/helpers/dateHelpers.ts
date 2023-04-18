export const humanDate = (createdAt: string): string => {
  return new Date(createdAt).toLocaleDateString();
};
