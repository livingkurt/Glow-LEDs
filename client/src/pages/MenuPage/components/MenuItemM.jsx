// React
import React from "react";
import { Link } from "react-router-dom";

import { LazyImage } from "../../../components/SharedComponents";

const MenuItemM = ({ item, index, decide_url }) => {
  return (
    <li key={index} className="w-100per">
      <Link to={item.link}>
        <div className="small_screen_product row">
          <LazyImage
            className="product-image w-200px h-200px "
            alt={item.category}
            title="Affiliate Image"
            effect="blur"
            size={{ height: "auto", width: "100%" }}
            src={item.image}
          />
          <div className="column jc-b  pl-2rem">
            <h2 className="w-100per ">{item.label}</h2>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MenuItemM;
