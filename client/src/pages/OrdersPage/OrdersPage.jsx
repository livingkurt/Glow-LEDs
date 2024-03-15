import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLAutocomplete } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import {
  openRefundModal,
  open_create_order_modal,
  open_edit_order_modal,
  setRemoteVersionRequirement,
} from "../../slices/orderSlice";
import { EditOrderModal, OrderDropdown } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {
  orderStatusColors,
  determineOrderColors,
  duplicateOrder,
  sinceOrdered,
  orderExceptionStatusColors,
  socket,
} from "./ordersPageHelpers";
import OrderItemsDisplay from "./components/OrderItemsDisplay";
import { determine_product_name_string } from "../../utils/react_helper_functions";
import { fullName } from "../UsersPage/usersHelpers";
import ShippingModal from "./components/ShippingModal";
import { openCreateLabelModal, open_create_pickup_modal } from "../../slices/shippingSlice";
import CreatePickupModal from "./components/CreatePickupModal";
import RefundOrderModal from "./components/RefundOrderModal";
import CreateLabelModal from "./components/CreateLabelModal";
import { format_date, toTitleCase } from "../../utils/helper_functions";
import LinkLabelModal from "./components/LinkLabelModal";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FileCopy from "@mui/icons-material/FileCopy";
import Landscape from "@mui/icons-material/Landscape";
import Money from "@mui/icons-material/Money";
import { showSuccess } from "../../slices/snackbarSlice";
import { ShoppingCart } from "@mui/icons-material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";

const OrdersPage = () => {
  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading, remoteVersionRequirement, order } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const orderTable = useSelector(state => state.orders.orderTable);
  const { selectedRows } = orderTable;
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;

  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect(); // Ensure connection on component mount

    const onConnect = reason => {
      console.log("Connected");
      console.log("Connected", reason);
      dispatch(showSuccess({ message: `Socket Connected` }));
    };

    const onDisconnect = reason => {
      console.log("Disconnected due to", reason);
      dispatch(showSuccess({ message: `Socket Disconnected` }));
    };

    const onOrdersChanged = () => {
      console.log("ordersChanged event received");
      dispatch(setRemoteVersionRequirement());
      dispatch(showSuccess({ message: `Orders Refreshed` }));
    };

    // Register event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("ordersChanged", onOrdersChanged);

    // Cleanup function to remove event listeners
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ordersChanged", onOrdersChanged);
      socket.disconnect(); // Consider if you need to disconnect when component unmounts
    };
  }, []);

  const columnDefs = useMemo(
    () => [
      { title: "Order Placed", display: row => format_date(row.createdAt) },
      {
        title: "Name",
        display: row => (
          <Link to={current_user.isAdmin && `/secure/glow/userprofile/${row?.user}`}>{fullName(row.shipping)}</Link>
        ),
      },
      { title: "Since Ordered", display: row => sinceOrdered(row.createdAt) },
      {
        title: "Order Items",
        display: row => (
          <div>
            <div>
              {row.orderItems.map(item => (
                <div>{determine_product_name_string(item, true, row.createdAt)}</div>
              ))}
            </div>
            <div>
              <OrderItemsDisplay order={row} determineColor={determineOrderColors} colspan={columnDefs.length + 1} />
            </div>
            <div className="mt-10px">
              {row.order_note && (
                <div className="ai-c">
                  <div className="title_font mr-10px">Order Note: </div>
                  <div>{row.order_note}</div>
                </div>
              )}
              {row.production_note && (
                <div className="ai-c">
                  <div className="title_font mr-10px">Production Note: </div>
                  <div>{row.production_note}</div>
                </div>
              )}
            </div>
          </div>
        ),
      },

      {
        title: "Total",
        display: row => (
          <div>
            {!row.isRefunded && (
              <div>
                <div>${row.totalPrice?.toFixed(2)}</div>
              </div>
            )}
            {row.isRefunded && (
              <div>
                <del style={{ color: "red" }}>
                  <label style={{ color: "white" }}>
                    <div>${row.totalPrice?.toFixed(2)}</div>
                  </label>
                </del>
              </div>
            )}
            {row.isRefunded && (
              <div>
                <div>-${(row.payment.refund.reduce((a, c) => a + c.amount, 0) / 100)?.toFixed(2)}</div>
              </div>
            )}
            {row.isRefunded && (
              <div>
                <div>${(row.totalPrice - row.payment.refund.reduce((a, c) => a + c.amount, 0) / 100)?.toFixed(2)}</div>
              </div>
            )}
          </div>
        ),
      },
      {
        title: "Actions",
        display: row => (
          <div className="jc-b">
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(API.detailsOrder(row._id));
                dispatch(open_edit_order_modal(order));
              }}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() => {
                const newDuplicateOrder = duplicateOrder(row);
                dispatch(API.saveOrder(newDuplicateOrder));
              }}
            >
              <FileCopy color="white" />
            </GLIconButton>
            <Link to={`/secure/account/order/${row._id}`}>
              <GLIconButton tooltip="View Order Page">
                <Landscape color="white" />
              </GLIconButton>
            </Link>
            <GLIconButton
              onClick={() => {
                dispatch(openRefundModal(row));
              }}
              tooltip="Refund"
            >
              <Money color="white" />
            </GLIconButton>
            <GLIconButton
              onClick={() => {
                row.orderItems.map(item =>
                  dispatch(API.addToCart({ cart: my_cart, cart_item: item, type: "add_to_cart" }))
                );
              }}
              tooltip="Add to Cart"
            >
              <ShoppingCart color="white" />
            </GLIconButton>
            <GLIconButton
              onClick={() => {
                const confirm = window.confirm("Are you sure you want DELETE this order?");
                if (confirm) {
                  dispatch(API.deleteOrder(row._id));
                }
              }}
              tooltip="Delete"
            >
              <Delete color="white" />
            </GLIconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getOrders(options), []);
  const remoteFiltersApi = useCallback(() => API.getOrderFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Orders | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"orders/setRemoteVersionRequirement"}
        tableName={"Orders"}
        searchPlaceholder={"Search by ID, Name, Email, #code"}
        colors={[...Object.values(orderExceptionStatusColors), ...Object.values(orderStatusColors)]}
        determineColor={determineOrderColors}
        namespaceScope="orders"
        namespace="orderTable"
        columnDefs={columnDefs}
        enableDropdownRow
        rowName={"_id"}
        dropdownComponent={row => (
          <OrderDropdown row={row} determineColor={determineOrderColors} colspan={columnDefs.length + 1} />
        )}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <div className="row g-10px ai-c">
            {selectedRows.length > 1 && (
              <GLAutocomplete
                value={order.status}
                variant={"outlined"}
                options={[
                  ...Object.keys(orderStatusColors),
                  "Set isPrioritized",
                  "Set isPaused",
                  "Set isUpdated",
                  "Set isRefunded",
                  "Set isReassured",
                  "Unset isPrioritized",
                  "Unset isPaused",
                  "Unset isUpdated",
                  "Unset isRefunded",
                  "Unset isReassured",
                ]}
                optionDisplay={option => toTitleCase(option)}
                getOptionLabel={option => toTitleCase(option)}
                fullWidth
                isOptionEqualToValue={(option, value) => option === value}
                name="status"
                label="Batch Set Status"
                onChange={(e, value) => {
                  const confirm = window.confirm(
                    `Are you sure you want to Update Status on ${selectedRows.length} Orders?`
                  );
                  if (confirm) {
                    dispatch(API.updateMultipleOrderStatus({ ids: selectedRows, status: value }));
                  }
                }}
              />
            )}
            <div className="row g-10px ai-c">
              {selectedRows.length > 1 && (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Orders?`);
                    if (confirm) {
                      dispatch(API.deleteMultipleOrders(selectedRows));
                    }
                  }}
                >
                  Delete Orders
                </Button>
              )}
              {selectedRows.length > 0 && (
                <Button color="secondary" variant="contained" onClick={() => dispatch(open_create_pickup_modal())}>
                  Create UPS Pickup
                </Button>
              )}
              <Button color="secondary" variant="contained" onClick={() => dispatch(openCreateLabelModal())}>
                Create Label
              </Button>
              <Button color="primary" variant="contained" onClick={() => dispatch(open_create_order_modal())}>
                Create Order
              </Button>
            </div>
          </div>
        }
      />
      <EditOrderModal />
      <ShippingModal />
      <CreatePickupModal />
      <RefundOrderModal />
      <CreateLabelModal />
      <LinkLabelModal />
    </div>
  );
};
export default OrdersPage;
