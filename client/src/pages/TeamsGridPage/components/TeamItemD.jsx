import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";
// import Resizer from 'react-image-file-resizer';

const Team = ({ team, style, size }) => {
  return (
    <li key={team._id} style={{ ...style, textDecoration: "none" }}>
      <Link to={`/collections/all/teams/${team && team.pathname}`}>
        <div className="tooltip">
          <div className="tooltipoverlay">
            <div className="product">
              <LazyImage
                className="product-image"
                alt={team.name}
                title="Team Image"
                size={{ height: size, width: "auto" }}
                effect="blur"
                src={team.picture}
              />

              <label style={{ fontSize: "2rem", WebkitTextStroke: "1px white" }} className="pv-1rem">
                {team.team_name}
              </label>
              <Link to={`/collections/all/teams/${team && team.pathname}`}>
                <label style={{ fontSize: "1.6rem" }}>{team.name}</label>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Team;
