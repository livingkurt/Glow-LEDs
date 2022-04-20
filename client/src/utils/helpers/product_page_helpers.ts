export const determine_color_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Skin";
  } else if (category === "diffuser_caps") {
    return "Cap";
  } else if (category === "glowframez") {
    return "Frame";
  }
};

export const determine_secondary_color_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Sled";
  } else if (category === "diffuser_caps") {
    return "Adapter";
  } else if (category === "glowframez") {
    return "Frame";
  }
};

export const determine_option_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "";
  } else if (category === "diffuser_caps") {
    return "";
  } else if (category === "glowframez") {
    return "";
  }
};
