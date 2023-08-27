// React
import * as React from "react";
import { Link } from "react-router-dom";
import { humanize } from "../../../utils/helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
// import Resizer from 'react-image-file-resizer';

const Feature = props => {
  return (
    <li key={props.feature._id} style={{ ...props.style, textDecoration: "none" }}>
      <Link to={`/collections/all/features/category/${props.category.toLowerCase()}/${props.feature.pathname}`}>
        <div className="tooltip">
          <div className="tooltipoverlay">
            <div className="product">
              <LazyImage
                className="product-image"
                alt={props.feature.name}
                title="Feature Image"
                size={{ height: props.size, width: "auto" }}
                effect="blur"
                src={
                  props.category.toLowerCase() === "glovers"
                    ? `http://img.youtube.com/vi/${props.feature.video}/hqdefault.jpg`
                    : props.feature.logo
                }
              />

              <label style={{ fontSize: "1.6rem" }} className="m-5px">
                {props.feature.artist_name}
              </label>
              {/* <label style={{ fontSize: '1.3rem' }}>{props.feature.song_id}</label> */}
              <label style={{ fontSize: "1.3rem" }}>{props.feature.product && humanize(props.feature.product)}</label>
              <Link to={`/collections/all/features/category/${props.category.toLowerCase()}/${props.feature.pathname}`}>
                <label style={{ fontSize: "1.6rem" }}>{props.feature.name}</label>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Feature;
