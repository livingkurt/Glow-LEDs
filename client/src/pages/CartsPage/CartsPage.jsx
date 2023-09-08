import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_cart_modal, open_edit_cart_modal } from "../../slices/cartSlice";
import { EditCartModal } from "./components";
import * as API from "../../api";
import { Button, IconButton } from "@mui/material";
import { getCarts } from "../../api";
import { determine_color } from "./cartsPageHelpers";
import { format_date } from "../../utils/helper_functions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CartsPage = () => {
  const cartPage = useSelector(state => state.carts.cartPage);
  const { remoteVersionRequirement } = cartPage;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      {
        title: "Active",
        display: cart => (
          <IconButton
            variant="contained"
            onClick={() => {
              dispatch(
                API.saveCart({
                  ...cart,
                  active: cart.active ? false : true,
                })
              );
            }}
            aria-label={cart.active ? "deactivate" : "activate"}
          >
            {cart.active ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />}
          </IconButton>
        ),
      },
      { title: "Date Updated", display: row => format_date(row.updatedAt) },
      { title: "User", display: row => (row?.user ? `${row?.user.first_name} ${row?.user.last_name}` : "Guest") },
      { title: "Cart Items", display: row => row.cartItems.map(item => item.name).join(", ") },
      {
        title: "Actions",
        display: cart => (
          <div className="jc-b">
            <IconButton variant="contained" aria-label="Edit" onClick={() => dispatch(open_edit_cart_modal(cart))}>
              <EditIcon color="white" />
            </IconButton>

            <IconButton variant="contained" onClick={() => dispatch(API.deleteCart(cart._id))} aria-label="Delete">
              <DeleteIcon color="white" />
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getCarts(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Carts | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName={"Carts"}
        namespaceScope="carts"
        namespace="cartTable"
        determine_color={determine_color}
        columnDefs={column_defs}
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
