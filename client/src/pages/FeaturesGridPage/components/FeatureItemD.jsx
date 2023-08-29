// React
import * as React from "react";
import { Link } from "react-router-dom";
import { humanize } from "../../../utils/helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
// import Resizer from 'react-image-file-resizer';

const Feature = ({ feature, category, style, size }) => {
  return (
    <li key={feature._id} style={{ ...style, textDecoration: "none" }}>
      <Link to={`/collections/all/features/category/${category.toLowerCase()}/${feature.pathname}`}>
        <div className="tooltip">
          <div className="tooltipoverlay">
            <div className="product">
              <LazyImage
                className="product-image"
                alt={feature.name}
                title="Feature Image"
                size={{ height: size, width: "auto" }}
                effect="blur"
                src={
                  category.toLowerCase() === "glovers"
                    ? `http://img.youtube.com/vi/${feature.video}/hqdefault.jpg`
                    : feature.logo
                }
              />

              <label style={{ fontSize: "1.6rem" }} className="m-5px">
                {feature.artist_name}
              </label>
              {/* <label style={{ fontSize: '1.3rem' }}>{feature.song_id}</label> */}
              <label style={{ fontSize: "1.3rem" }}>{feature.product && humanize(feature.product)}</label>
              <Link to={`/collections/all/features/category/${category.toLowerCase()}/${feature.pathname}`}>
                <label style={{ fontSize: "1.6rem" }}>{feature.name}</label>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Feature;
