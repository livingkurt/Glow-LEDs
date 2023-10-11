export const productColors = [
  { name: "Not Category", color: "#333333" },
  { name: "OPYN Glowskinz", color: "#557b68" },
  { name: "Glowstringz", color: "#4b7188" },
  { name: "CLOZD Glowskinz", color: "#736084" },
  { name: "Decals", color: "#6f5aa3" },
  { name: "Diffusers", color: "#ca9160" },
  { name: "Diffuser Caps", color: "#6c7ea9" },
  { name: "Accessories", color: "#925757" },
  { name: "EXO Diffusers", color: "#4162ad" },
  { name: "Gloves", color: "#4f85a7" },
];

export const determineColor = product => {
  let result = "#797979";

  if (product.category === "gloves") {
    result = productColors[9].color;
  }
  if (product.category === "opyn") {
    result = productColors[1].color;
  }
  if (product.category === "glowstringz") {
    result = productColors[2].color;
  }
  if (product.subcategory === "clozd") {
    result = productColors[3].color;
  }
  if (product.category === "decals") {
    result = productColors[4].color;
  }
  if (product.category === "diffusers") {
    result = productColors[5].color;
  }
  if (product.category === "diffuser_caps") {
    result = productColors[6].color;
  }
  if (product.category === "batteries") {
    result = productColors[7].color;
  }
  if (product.category === "exo_diffusers") {
    result = productColors[8].color;
  }
  if (product.hidden) {
    result = productColors[0].color;
  }
  return result;
};
