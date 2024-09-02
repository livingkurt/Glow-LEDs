import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { openRefundModal, open_edit_order_modal, setRemoteVersionRequirement } from "../../slices/orderSlice";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Box, List } from "@mui/material";
import { duplicateOrder, sinceOrdered, socket } from "./ordersPageHelpers";
import { fullName } from "../UsersPage/usersHelpers";
import { format_date } from "../../utils/helper_functions";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FileCopy from "@mui/icons-material/FileCopy";
import Landscape from "@mui/icons-material/Landscape";
import Money from "@mui/icons-material/Money";
import { showConfirm, showSuccess } from "../../slices/snackbarSlice";
import { ShoppingCart } from "@mui/icons-material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLCartItem from "../../shared/GlowLEDsComponents/GLCartItem/GLCartItem";

const useOrdersPage = ({ userProfile }) => {
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
  }, [dispatch]);

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
              <List>
                {row.orderItems?.map((item, index) => (
                  <GLCartItem key={index} item={item} index={index} isOrderItem={true} />
                ))}
              </List>
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
        title: "",
        nonSelectable: true,
        display: row =>
          current_user.isAdmin ? (
            <Box display="flex" justifyContent={"flex-end"}>
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
                  dispatch(
                    showConfirm({
                      title: "Are you sure you want to DELETE this Order?",
                      inputLabel: "Describe the why you made this change to the order",
                      onConfirm: inputText => {
                        dispatch(API.deleteOrder(row._id));
                        dispatch(
                          API.saveOrder({
                            ...order,
                            isUpdated: true,
                            change_log: [
                              ...order.change_log,
                              {
                                change: inputText,
                                changedAt: new Date(),
                                changedBy: current_user,
                              },
                            ],
                          })
                        );
                      },
                    })
                  );
                }}
                tooltip="Delete"
              >
                <Delete color="white" />
              </GLIconButton>
            </Box>
          ) : null,
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getOrders(options), []);
  const ordersRemoteApi = useCallback(options => API.getMyOrders(options, current_user._id), [current_user._id]);
  const remoteFiltersApi = useCallback(() => API.getOrderFilters(), []);
  return {
    columnDefs,
    remoteApi: userProfile ? ordersRemoteApi : remoteApi,
    remoteFiltersApi,
    loading,
    remoteVersionRequirement,
    selectedRows,
    order,
  };
};

export default useOrdersPage;
