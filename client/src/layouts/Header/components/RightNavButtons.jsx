import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { determineDropdown, determineName, rightNav } from "../headerHelpers";
import { ShoppingCart } from "@mui/icons-material";
import { set_first_name } from "../../../slices/glowLedsSlice";
import { setCartDrawer } from "../../../slices/cartSlice";
import { getCartQuantity } from "../../../helpers/sharedHelpers";
import HeaderButton from "./CenterNavButtons/components/HeaderButton";
import ColumnItemButton from "./CenterNavButtons/components/ColumnItemButton";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const RightNavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

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
      <div className={`${isMobile ? "w-233px" : ""} jc-fe ai-c`}>
        <HeaderButton
          onClick={() => dispatch(setCartDrawer(true))}
          sx={{
            display: "flex",
            alignItems: "center",
            ...(cartItems.length > 0 && isMobile
              ? {
                  animation: "bob 2s infinite",
                  boxShadow: theme.shadows[4],
                  backgroundColor: theme.palette.primary.main,
                }
              : {}),
          }}
        >
          {isMobile && "Cart"}
          <ShoppingCart sx={{ marginTop: "-4px", marginLeft: isMobile ? "1px" : 0 }} />
          <Box component="span" sx={{ marginLeft: "1px" }}>
            {getCartQuantity(cartItems)}
          </Box>
        </HeaderButton>

        {isMobile &&
          rightNav(dispatch).map(
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
