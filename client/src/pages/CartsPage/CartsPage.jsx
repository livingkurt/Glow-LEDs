import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_cart_modal, open_edit_cart_modal } from "../../slices/cartSlice";
import { EditCartModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getCarts } from "../../api";
import { humanDate } from "../../helpers/dateHelpers";
import { determine_color } from "./cartsPageHelpers";

const CartsPage = () => {
  const cartPage = useSelector(state => state.carts.cartPage);
  const { message, loading, remoteVersionRequirement } = cartPage;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      {
        title: "Active",
        display: cart => (
          <GLButton
            variant="icon"
            onClick={() => {
              dispatch(
                API.saveCart({
                  ...cart,
                  active: cart.active ? false : true
                })
              );
            }}
            aria-label={cart.active ? "deactivate" : "activate"}
          >
            {cart.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
          </GLButton>
        )
      },
      { title: "Date Updated", display: row => humanDate(row.updatedAt) },
      { title: "User", display: row => (row?.user ? `${row?.user.first_name} ${row?.user.last_name}` : "Guest") },
      { title: "Cart Items", display: row => row.cartItems.map(item => item.name).join(", ") },
      {
        title: "Actions",
        display: cart => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_cart_modal(cart));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteCart(cart._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getCarts(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Carts | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName={"Carts"}
        namespaceScope="carts"
        namespace="cartTable"
        determine_color={determine_color}
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_cart_modal())}>
            Create Cart
          </Button>
        }
      />
      <EditCartModal />
    </div>
  );
};
export default CartsPage;
