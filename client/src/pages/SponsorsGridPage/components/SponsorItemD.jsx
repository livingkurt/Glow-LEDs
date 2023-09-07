import * as React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";

const SponsorItemD = ({ affiliate, style, size }) => {
  return (
    <li key={affiliate._id} style={{ ...style, textDecoration: "none" }}>
      <Link to={`/collections/all/sponsors/${affiliate && affiliate.pathname}`}>
        <div className="tooltip">
          <div className="tooltipoverlay">
            <div className="sponsor">
              <LazyImage
                className="product-image"
                alt={affiliate.name}
                title="Sponsor Image"
                size={{ height: size, width: "auto" }}
                effect="blur"
                src={affiliate.picture}
              />

              <label style={{ fontSize: "2rem", WebkitTextStroke: "1.5px white" }} className="pv-1rem">
                {affiliate.artist_name}
              </label>
              <div className="jc-b">
                <label style={{ fontSize: "1.6rem" }}>
                  {affiliate.user && affiliate.user.first_name} {affiliate.user && affiliate.user.last_name}
                </label>

                <label style={{ fontSize: "1.6rem" }}>{affiliate.location}</label>
              </div>
              <Link to={`/collections/all/sponsors/${affiliate && affiliate.pathname}`}>
                <label style={{ fontSize: "1.6rem" }}>{affiliate.name}</label>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SponsorItemD;
