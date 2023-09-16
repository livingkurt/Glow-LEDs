export const colors = [
  { name: "Not Paid", color: "#6d3e3e" },
  { name: "Paid", color: "#3e4c6d" },
  { name: "Crafting", color: "#4b7188" },
  { name: "Crafted", color: "#4b7188" },
  { name: "Packaged", color: "#6f5f7d" },
  { name: "Shipped", color: "#636363" },
  { name: "Delivered", color: "#333333" },
  { name: "Priority", color: "#874d72" },
  { name: "Label Created", color: "#31887c" },
  // { name: 'Refunded', color: '#a9a9a9' }
];

export const determine_url = (url, type) => {
  switch (type) {
    case "full":
      return `https://www.glow-leds.com${url}`;

    case "path":
      return url;

    default:
      break;
  }
};
