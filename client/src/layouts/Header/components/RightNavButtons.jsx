import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determineDropdown, determineName, rightNav } from "../headerHelpers";
import { ShoppingCart } from "@mui/icons-material";
import { set_first_name } from "../../../slices/glowLedsSlice";
import { setCartDrawer } from "../../../slices/cartSlice";
import HeaderButton from "./CenterNavButtons/components/HeaderButton";
import ColumnItemButton from "./CenterNavButtons/components/ColumnItemButton";

const RightNavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user) {
        dispatch(set_first_name(current_user.first_name));
      }
    }
    return () => (clean = false);
  }, [current_user, dispatch]);

  return (
    <div>
      <HeaderButton onClick={() => dispatch(setCartDrawer(true))} className="cart_icon none">
        <ShoppingCart /> {cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
      </HeaderButton>

      <div className="nav_bar w-233px jc-fe ai-c">
        <HeaderButton
          onClick={() => dispatch(setCartDrawer(true))}
          className={`cart_text w-110px title_font ai-c ${cartItems.length > 0 ? "bob box-s-d bg-primary" : ""}`}
        >
          Cart <ShoppingCart className="ml-5px mb-5px" />
          <div className="ml-5px">{cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} </div>
        </HeaderButton>
        <HeaderButton
          className={`cart_icon title_font none ${cartItems.length > 0 ? "bob box-s-d bg-primary" : ""}`}
          onClick={() => dispatch(setCartDrawer(true))}
        >
          <ShoppingCart /> {cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
        </HeaderButton>
        {rightNav(dispatch).map(
          (item, index) =>
            item.permissions(current_user) && (
              <div key={index} className="dropdown">
                <HeaderButton ariaLabel={item.ariaLabel} onClick={() => item.onClick && item.onClick(current_user)}>
                  {determineName(item, current_user)}
                </HeaderButton>
                {determineDropdown(item, current_user) && (
                  <ul className="dropdown-content hover_fade_in w-175px">
                    {item.columns.map((column, colIndex) => (
                      <div key={colIndex}>
                        {column.rows.map((row, rowIndex) => (
                          <ColumnItemButton
                            key={rowIndex}
                            ariaLabel={row.ariaLabel}
                            fullWidth
                            to={row.path}
                            align={"left"}
                            onClick={() => row.onClick && row.onClick(dispatch, navigate, location)}
                          >
                            {determineName(row, current_user)}
                          </ColumnItemButton>
                        ))}
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RightNavButtons;
