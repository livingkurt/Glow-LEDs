import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { humanize } from "../../../utils/helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
// import Resizer from 'react-image-file-resizer';

const MenuItemD = ({ item, index, decide_url }) => {
  return (
    <div className="product m-1rem" style={{ height: "unset" }} key={index}>
      <Link to={item.link}>
        <h2 className=""> {item.label}</h2>
        <div className="w-300px h-300px mb-1rem">
          {item && item.image && (
            <LazyImage
              className="w-100per h-auto br-20px"
              alt={item.label}
              title="Product Image"
              size={{ height: "300px", width: "300px", objectFit: "cover" }}
              effect="blur"
              src={item.image}
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default MenuItemD;
