import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_cart_modal, open_edit_cart_modal } from "../../slices/cartSlice";
import { EditCartModal } from "./components";
import * as API from "../../api";
import { Box, Button } from "@mui/material";
import { getCarts } from "../../api";
import { determineColor } from "./cartsPageHelpers";
import { format_date } from "../../utils/helper_functions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const CartsPage = () => {
  const cartPage = useSelector(state => state.carts.cartPage);
  const { remoteVersionRequirement } = cartPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: cart => (
          <GLIconButton
            variant="contained"
            onClick={() => {
              dispatch(
                API.saveCart({
                  ...cart,
                  active: cart.active ? false : true,
                })
              );
            }}
            tooltip={cart.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={cart.active} />
          </GLIconButton>
        ),
      },
      { title: "Date Updated", display: row => format_date(row.updatedAt) },
      { title: "User", display: row => (row?.user ? `${row?.user.first_name} ${row?.user.last_name}` : "Guest") },
      { title: "Cart Items", display: row => row.cartItems.map(item => item.name).join(", ") },
      {
        title: "Actions",
        display: cart => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_cart_modal(cart))}>
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteCart(cart._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
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
        determineColor={determineColor}
        columnDefs={columnDefs}
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
