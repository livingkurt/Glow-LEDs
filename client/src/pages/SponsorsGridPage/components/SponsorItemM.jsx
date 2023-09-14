import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";

const SponsorItemM = ({ affiliate, style }) => {
  return (
    <li key={affiliate._id} className=" w-100per" style={style}>
      <Link to={`/collections/all/sponsors/${affiliate && affiliate.pathname}`}>
        <div className="small_screen_product row">
          <div className="">
            <LazyImage
              className="sponsor-image max-w-400px max-h-400px w-100per h-auto br-10px pr-1rem"
              alt={affiliate.artist_name}
              title="Affiliate Image"
              effect="blur"
              size={{ height: "auto", width: "100%" }}
              src={affiliate.picture}
            />
          </div>
          <div className="column jc-b w-200px">
            <label style={{ fontSize: "2rem", WebkitTextStroke: "1.5px white" }} className="pv-1rem">
              {affiliate.artist_name}
            </label>
            <div className="column jc-b ">
              <label style={{ fontSize: "1.6rem" }} className="pv-10px">
                {affiliate.user && affiliate.user.first_name} {affiliate.user && affiliate.user.last_name}
              </label>

              <label style={{ fontSize: "1.6rem" }}>{affiliate.location}</label>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SponsorItemM;
