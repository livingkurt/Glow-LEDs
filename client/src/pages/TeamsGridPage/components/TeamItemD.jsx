// React
import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";
// import Resizer from 'react-image-file-resizer';

const Team = props => {
  return (
    <li key={props.team._id} style={{ ...props.style, textDecoration: "none" }}>
      <Link to={`/collections/all/teams/${props.team && props.team.pathname}`}>
        <div className="tooltip">
          <div className="tooltipoverlay">
            <div className="product">
              <LazyImage
                className="product-image"
                alt={props.team.name}
                title="Team Image"
                size={{ height: props.size, width: "auto" }}
                effect="blur"
                src={props.team.picture}
              />

              <label style={{ fontSize: "2rem", WebkitTextStroke: "1px white" }} className="pv-1rem">
                {props.team.team_name}
              </label>
              <Link to={`/collections/all/teams/${props.team && props.team.pathname}`}>
                <label style={{ fontSize: "1.6rem" }}>{props.team.name}</label>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Team;
