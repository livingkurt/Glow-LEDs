import { Link } from "react-router-dom";
import { determine_link } from "../../../utils/helper_functions";
import { LazyImage } from "../../../shared/SharedComponents";
import Grid from "@mui/material/Grid";
import { determine_product_name } from "../../../helpers/sharedHelpers";

const OrderItemsDisplay = ({ order, determineColor, colspan }) => {
  return (
    <Grid container>
      {order.orderItems.map((item, index) => {
        return (
          <Grid item xs={12} sm={2} key={index}>
            <div className="mt-15px">
              <div className="ai-c pos-rel" data-tip={determine_product_name(item)}>
                <Link to={determine_link(item)}>
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
                      <div
                        className={` double-image-cart${
                          item.name && item.name.split("-")[1] === "2 Tone" ? "-vertical" : " row"
                        }`}
                      >
                        <LazyImage
                          id="expandedImg"
                          alt={item.name}
                          title={item.name}
                          border={item.color_code}
                          className={`details-image-cart-${
                            item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"
                          } m-0px`}
                          src={item.display_image}
                        />
                        <LazyImage
                          id="expandedSecondaryImg"
                          alt={item.name}
                          title={item.name}
                          border={item.color_code}
                          className={`details-image-cart-${
                            item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"
                          } mr-15px`}
                          src={item.secondary_image}
                        />
                      </div>
                    )}
                  </div>
                </Link>
                {item.quantity > 1 && (
                  <div
                    className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c bottom-0px right-5px"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #ccc",
                    }}
                  >
                    <div className="mt-3px ml-2px">{item.quantity}</div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OrderItemsDisplay;
