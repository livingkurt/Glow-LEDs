import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";
import { humanize } from "../../../utils/helper_functions";

const FeatureSmallScreen = ({ feature, category, style }) => {
  return (
    <li key={feature._id} className=" w-100per" style={style}>
      <Link to={`/collections/all/features/category/${category.toLowerCase()}/${feature.pathname}`}>
        <div className="small_screen_product row">
          <div className="">
            <LazyImage
              className="feature-image  w-100per h-auto br-10px"
              alt={feature.artist_name}
              title="Feature Image"
              effect="blur"
              size={{ height: "auto", width: "100%" }}
              src={
                category.toLowerCase() === "glovers"
                  ? `http://img.youtube.com/vi/${feature.video}/hqdefault.jpg`
                  : feature.logo
              }
            />
          </div>
          <div className="p-10px w-300px">
            <div className="product_text" style={{ fontSize: "1.6rem" }}>
              {feature.artist_name}
            </div>
            <label style={{ fontSize: "1.3rem" }}>{feature.product && humanize(feature.product)}</label>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeatureSmallScreen;
