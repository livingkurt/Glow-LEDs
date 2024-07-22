import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";
import * as API from "../../../api";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLSelect from "../../../shared/GlowLEDsComponents/GLSelect/GLSelect";

const CartItem = ({ item, index, dispatch, current_user }) => {
  const cartPage = useSelector(state => state.carts.cartPage);

  const { my_cart } = cartPage;

  const determine_product_name = item => {
    let name = item.name;
    item.selectedOptions.forEach(option => {
      if (option.name) {
        name += ` - ${option.name}`;
      }
    });
    return name;
  };

  return (
    <li
      key={index}
      style={{
        display: "flex",
        paddingBottom: "1rem",
        marginBottom: "1rem",
        borderBottom: "0.1rem #c0c0c0 solid",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div className="ai-c">
        <Link to={"/collections/all/products/" + item.pathname}>
          <div className="mb-10px">
            <LazyImage
              src={item?.display_image_object?.link}
              alt={item.name}
              className="br-10px w-70px h-70px"
              title="Product Image"
              size={{ maxWidth: "10rem", maxHeight: "10rem", borderRadius: "10px", marginRight: "10px" }}
            />
          </div>
        </Link>
      </div>
      <div className="w-100per">
        <div className="jc-b ai-c">
          <div className="w-100per">
            <Link to={`/collections/all/products/${item.pathname}`}>{determine_product_name(item)}</Link>
          </div>
          <div className="">
            <GLIconButton
              onClick={() => dispatch(API.deleteCartItem({ item_index: index, type: "add_to_cart" }))}
              tooltip="Delete"
            >
              <DeleteIcon color="white" />
            </GLIconButton>
          </div>
        </div>

        {/* <div className="jc-b mb-10px ai-c"> */}
        {/* <label className="mv-0px mr-10px title_font">Quantity:</label> */}
        <GLSelect
          value={item.quantity}
          // label={"Quantity"}
          onChange={e => {
            // Create a copy of the cart items
            const updatedCartItems = [...my_cart.cartItems];

            // Find the index of the item in the cart
            const itemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);

            // Update the quantity of the item
            updatedCartItems[itemIndex] = {
              ...updatedCartItems[itemIndex],
              quantity: parseInt(e.target.value),
            };

            // Save the updated cart
            dispatch(API.updateQuantity({ ...my_cart, cartItems: updatedCartItems }));
          }}
          size={"small"}
          options={[...Array(current_user?.isWholesaler ? 500 : item.max_quantity).keys()].map(value => ({
            name: value + 1,
          }))}
          width="100px"
          getOptionLabel={option => option.name}
          valueKey="name"
        />
        <div className="cart_sidebar-price fs-16px">
          {sale_price_switch({
            product: item,
            cartItem: true,
            background: "light",
            isWholesaler: current_user?.isWholesaler,
          })}
        </div>
      </div>
      {/* </div> */}
    </li>
  );
};

export default CartItem;
