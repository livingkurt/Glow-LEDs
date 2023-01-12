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
        {category === "whites" && (
          <div className="w-100per">
            <h3>Know your size before you buy with our:</h3>
            <Link to={`/collections/all/products/supremes_sizing_sampler_pack`}>
              <GLButton variant="primary">Supremes Sizing Sampler Pack</GLButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFacts;
