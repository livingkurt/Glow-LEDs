const colors = [
  { name: "Not Category", color: "#333333" },
  { name: "OPYN Glowskinz", color: "#557b68" },
  { name: "Glowstringz", color: "#4b7188" },
  { name: "CLOZD Glowskinz", color: "#736084" },
  { name: "Decals", color: "#6f5aa3" },
  { name: "Diffusers", color: "#ca9160" },
  { name: "Diffuser Caps", color: "#6c7ea9" },
  { name: "Accessories", color: "#925757" },
  { name: "EXO Diffusers", color: "#4162ad" },
  { name: "Gloves", color: "#4f85a7" }
];

export const determine_color = product => {
  let result = "#797979";

  if (product.category === "gloves") {
    result = colors[9].color;
  }
  if (product.category === "opyn") {
    result = colors[1].color;
  }
  if (product.category === "glowstringz") {
    result = colors[2].color;
  }
  if (product.subcategory === "clozd") {
    result = colors[3].color;
  }
  if (product.category === "decals") {
    result = colors[4].color;
  }
  if (product.category === "diffusers") {
    result = colors[5].color;
  }
  if (product.category === "diffuser_caps") {
    result = colors[6].color;
  }
  if (product.category === "batteries") {
    result = colors[7].color;
  }
  if (product.category === "exo_diffusers") {
    result = colors[8].color;
  }
  if (product.hidden) {
    result = colors[0].color;
  }
  return result;
};
