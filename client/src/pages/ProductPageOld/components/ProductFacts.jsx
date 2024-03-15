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
import { useSelector } from "react-redux";

const ProductFacts = () => {
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;
  const { category, subcategory, pathname, name } = product;

  const productPage = useSelector(state => state.products.productPage);
  const { facts } = productPage;
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
          determine_sampler(name) &&
          !(
            name.includes("Ultra Gloves Sizing Sampler Pack") ||
            name.includes("Supreme Gloves V1 Sizing Sampler Pack") ||
            name.includes("Supreme Gloves V2 Sizing Sampler Pack")
          ) && (
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
