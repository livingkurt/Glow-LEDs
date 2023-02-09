// React
import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";

const ProductFacts = ({ facts, category, subcategory, pathname, name }) => {
  const determine_alt_skin_pathname = (subcategory, pathname) => {
    if (subcategory === "clozd") {
      const empty_pathname = pathname.substring(5);
      return "opyn" + empty_pathname;
    }
    if (subcategory === "opyn") {
      const empty_pathname = pathname.substring(4);
      return "clozd" + empty_pathname;
    }
  };
  const determine_alt_skin_name = (subcategory, name) => {
    if (subcategory === "clozd") {
      const empty_name = name.substring(5);
      return "OPYN " + empty_name;
    }
    if (subcategory === "opyn") {
      const empty_name = name.substring(4);
      return "CLOZD " + empty_name;
    }
  };
  const determine_sampler_pack_name = name => {
    if (name.includes("Supreme Gloves V1")) {
      return "Sizing Sampler Pack V1";
    }
    if (name.includes("Supreme Gloves V2")) {
      return "Sizing Sampler Pack V2";
    }
  };
  const determine_sampler_pack_pathname = name => {
    if (name.includes("Supreme Gloves V1")) {
      return "supremes_gloves_v1_sizing_sampler_pack";
    }
    if (name.includes("Supreme Gloves V2")) {
      return "supremes_gloves_v2_sizing_sampler_pack";
    }
  };

  return (
    <div className="mt-1rem">
      <div className="h-100per paragraph_font">
        <ul style={{ marginLeft: "10px" }}>
          {facts
            ? facts.split("\n").map((line, index) => {
                return (
                  <li key={index} style={{ listStyleType: "disc" }} className="lh-2rem">
                    {line}
                  </li>
                );
              })
            : facts}
        </ul>
        {category === "glowskinz" &&
          !name.includes("Hybrdskinz") &&
          !name.includes("Novaskinz") &&
          !name.includes("Omniskinz") &&
          !name.includes("Capez") && (
            <div className="w-100per">
              <h3>Looking for the {subcategory === "clozd" ? "OPYN" : "CLOZD"} Glowskinz version?</h3>
              <Link to={`/collections/all/products/${determine_alt_skin_pathname(subcategory, pathname)}`}>
                <GLButton variant="primary">View {determine_alt_skin_name(subcategory, name)}</GLButton>
              </Link>
            </div>
          )}
        {category === "gloves" &&
          !(name.includes("Supreme Gloves V1 Sizing Sampler Pack") || name.includes("Supreme Gloves V2 Sizing Sampler Pack")) && (
            <div className="w-100per">
              <h3>Know your size before you buy with our:</h3>
              <Link to={`/collections/all/products/${determine_sampler_pack_pathname(name)}`}>
                <GLButton variant="primary">{determine_sampler_pack_name(name)}</GLButton>
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductFacts;
