import { Grid, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { determine_product_name_string } from "../../../utils/react_helper_functions";
import { determnine_link } from "../../../utils/helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";

const OrderItemsDisplay = ({ order, determine_color, colspan }) => {
  return (
    // <TableRow className="p-10px w-100per" style={{ backgroundColor: determine_color(order) }}>
    //   <TableCell colSpan={colspan} style={{ color: "white" }}>
    <div className="row">
      {order.orderItems.map((item, index) => {
        return (
          <div className="row mt-15px" key={index}>
            <div className="column ai-c pos-rel" data-tip={determine_product_name_string(item, true, order.createdAt)}>
              <Link to={determnine_link(item)}>
                <div className="">
                  {!item.secondary_image && (
                    <LazyImage
                      className="order-image br-10px mr-15px w-70px h-70px"
                      alt={item.name}
                      title="Product Image"
                      effect="blur"
                      border={item.color_code}
                      src={item.display_image && item.display_image}
                    />
                  )}
                  {item.secondary_image && (
                    <div className={` double-image-cart${item.name && item.name.split("-")[1] === "2 Tone" ? "-vertical" : " row"}`}>
                      <LazyImage
                        id="expandedImg"
                        alt={item.name}
                        title={item.name}
                        border={item.color_code}
                        className={`details-image-cart-${item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"} m-0px`}
                        src={item.display_image}
                      />
                      <LazyImage
                        id="expandedSecondaryImg"
                        alt={item.name}
                        title={item.name}
                        border={item.color_code}
                        className={`details-image-cart-${item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"} mr-15px`}
                        src={item.secondary_image}
                      />
                    </div>
                  )}
                </div>
              </Link>
              {item.qty > 1 && (
                <div
                  className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c bottom-0px right-5px"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid #ccc"
                  }}
                >
                  <div className="mt-3px ml-2px">{item.qty}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
    //   </TableCell>
    // </TableRow>
  );
};

export default OrderItemsDisplay;
