import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../SharedComponents";
import { humanize } from "../../../../utils/helper_functions";

const TopCategories = ({ category_items, closeMenu }) => {
  return (
    <div className="pv-1rem ta-c w-100per">
      <div>
        <label className="fs-20px title_font mv-1rem">Top Categories</label>
      </div>
      <div className="jc-c">
        <div className="wrapper">
          {category_items &&
            category_items.slice(0, 4).map((item, index) => {
              return (
                <div className={`product jc-c m-auto`} style={{ height: "unset" }} key={index}>
                  {item.label && (
                    <Link to={item.link} onClick={closeMenu} className="column jc-c ta-c">
                      <label className="mt-0px fs-14px title_font mb-10px"> {humanize(item.label)}</label>
                      {item && item.image && (
                        <LazyImage
                          className="br-20px"
                          alt={item.label}
                          title="Product Image"
                          size={{
                            height: `auto`,
                            width: `100%`,
                            objectFit: "cover"
                          }}
                          effect="blur"
                          src={item.image}
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
