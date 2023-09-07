import { Link } from "react-router-dom";
import { LazyImage } from "../../../SharedComponents";
import { GLButton } from "../../../GlowLEDsComponents";
import * as API from "../../../../api";
import { determine_product_name, sale_price_switch } from "../../../../utils/react_helper_functions";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const CartItem = ({ item, index, dispatch, current_user }) => {
  const cartPage = useSelector(state => state.carts.cartPage);

  const { my_cart } = cartPage;
  return (
    <li key={index} className="ph-1rem">
      <div className="ai-c">
        <Link to={"/collections/all/products/" + item.pathname}>
          <div className="mb-10px">
            {!item.secondary_image && (
              <LazyImage
                src={item.display_image}
                alt={item.name}
                className="br-10px w-70px h-70px"
                title="Product Image"
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
                  className={`details-image-cart-${
                    item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"
                  } m-0px`}
                  src={item.display_image}
                />
                <LazyImage
                  id="expandedSecondaryImg"
                  alt={item.name}
                  title={item.name}
                  className={`details-image-cart-${
                    item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"
                  } `}
                  src={item.secondary_image}
                />
              </div>
            )}
          </div>
        </Link>
      </div>
      <div className="w-100per">
        <div className="cart_sidebar-name jc-b ai-c">
          <div className="mb-10px w-100per">
            <Link to={`/collections/all/products/${item.pathname}`}>{determine_product_name(item, true)}</Link>
          </div>
          <div className="mb-10px">
            <IconButton
              variant="contained"
              onClick={() => dispatch(API.deleteCartItem({ item_index: index, type: "add_to_cart" }))}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <div className="jc-b mb-10px ai-c">
          <label className="mv-0px mr-10px title_font">Qty:</label>
          <div className="custom-select">
            <select
              defaultValue={item.qty}
              value={item.qty}
              className="qty_select_dropdown w-100per"
              onChange={e => {
                // Create a copy of the cart items
                const updatedCartItems = [...my_cart.cartItems];

                // Find the index of the item in the cart
                const itemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

                // Update the quantity of the item
                updatedCartItems[itemIndex] = {
                  ...updatedCartItems[itemIndex],
                  qty: parseInt(e.target.value),
                };

                // Save the updated cart
                dispatch(API.updateQuantity({ ...my_cart, cartItems: updatedCartItems }));
              }}
            >
              {[...Array(30).keys()].map((x, index) => (
                <option key={index} defaultValue={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <span className="custom-arrow" />
          </div>
          {/* <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem">
            Qty:
          </label>
          <label>{item.qty}</label> */}
          <div className="cart_sidebar-price fs-16px">
            {sale_price_switch({
              product: item,
              cartItem: true,
              background: "light",
              isWholesaler: current_user?.isWholesaler,
            })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
