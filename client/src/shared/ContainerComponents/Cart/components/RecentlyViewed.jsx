import React from "react";
import { Link } from "react-router-dom";

const RecentlyViewed = ({ closeMenu }) => {
  const recently_viewed_products = JSON.parse(sessionStorage.getItem("recently_viewed"))
    ? JSON.parse(sessionStorage.getItem("recently_viewed")).slice(0, 2)
    : [];

  if (recently_viewed_products && Array.isArray(recently_viewed_products) && recently_viewed_products.length !== 0) {
    return (
      <div className="p-1rem ta-c w-100per" style={{ border: "0px !important" }}>
        <div className="mv-2rem">
          <label className="title_font fs-20px lh-20px">Recently Viewed Products</label>
        </div>
        <div className="jc-c">
          <div className="jc-c wrap w-100per">
            {recently_viewed_products.map((item, index) => {
              return (
                <Link to={`/collections/all/products/${item.pathname}`} className="w-100per mb-1rem" key={index}>
                  <li className="ph-1rem w-100per">
                    <div className=" br-5px ai-c">
                      <img src={item.images && item.images[0]} height="50px" width="50px" alt={item.name} title="Product Image" />
                    </div>
                    <div className=" ta-l w-100per">
                      <div className="mb-10px">{item.name}</div>
                    </div>
                  </li>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RecentlyViewed;
