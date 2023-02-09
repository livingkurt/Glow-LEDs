export const determine_alt_skin_pathname = (subcategory, pathname) => {
  if (subcategory === "clozd") {
    const empty_pathname = pathname.substring(5);
    return "opyn" + empty_pathname;
  }
  if (subcategory === "opyn") {
    const empty_pathname = pathname.substring(4);
    return "clozd" + empty_pathname;
  }
};
export const determine_alt_skin_name = (subcategory, name) => {
  if (subcategory === "clozd") {
    const empty_name = name.substring(5);
    return "OPYN " + empty_name;
  }
  if (subcategory === "opyn") {
    const empty_name = name.substring(4);
    return "CLOZD " + empty_name;
  }
};
export const determine_sampler_pack_name = name => {
  if (name.includes("Supreme Gloves V1")) {
    return "Sizing Sampler Pack V1";
  }
  if (name.includes("Supreme Gloves V2")) {
    return "Sizing Sampler Pack V2";
  }
};
export const determine_sampler_pack_pathname = name => {
  if (name.includes("Supreme Gloves V1")) {
    return "supremes_gloves_v1_sizing_sampler_pack";
  }
  if (name.includes("Supreme Gloves V2")) {
    return "supremes_gloves_v2_sizing_sampler_pack";
  }
};
