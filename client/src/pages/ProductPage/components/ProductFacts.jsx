import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import {
  determine_alt_skin_name,
  determine_alt_skin_pathname,
  determine_sampler,
  determine_sampler_pack_name,
  determine_sampler_pack_pathname,
} from "../productHelpers";
import { Box } from "@mui/material";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";

const ProductFacts = ({ category, subcategory, pathname, name, facts }) => {
  return (
    <Box my={2} ml={2}>
      <ul>
        {facts
          ? facts.split("\n").map((line, index) => {
              return (
                <li key={index} style={{ listStyleType: "disc" }} className="lh-3rem">
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
              <GLButtonV2 color="primary">View {determine_alt_skin_name(subcategory, name)}</GLButtonV2>
            </Link>
          </div>
        )}
      {category === "gloves" &&
        determine_sampler(name) &&
        ![
          "Ultra Gloves Sizing Sampler Pack",
          "Supreme Gloves V1 Sizing Sampler Pack",
          "Supreme Gloves V2 Sizing Sampler Pack",
        ].includes(name) && (
          <div className="w-100per">
            <h3>Know your size before you buy with our:</h3>
            <Link to={`/collections/all/products/${determine_sampler_pack_pathname(name)}`}>
              <GLButtonV2 color="primary">{determine_sampler_pack_name(name)}</GLButtonV2>
            </Link>
          </div>
        )}
    </Box>
  );
};

export default ProductFacts;
