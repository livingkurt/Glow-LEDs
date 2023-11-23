import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { openRefundModal, open_create_order_modal, open_edit_order_modal } from "../../slices/orderSlice";
import { EditOrderModal, OrderDropdown } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { determineOrderColors, duplicateOrder, orderColors, sinceOrdered } from "./ordersPageHelpers";
import OrderItemsDisplay from "./components/OrderItemsDisplay";
import { determine_product_name_string } from "../../utils/react_helper_functions";
import { fullName } from "../UsersPage/usersHelpers";
import ShippingModal from "./components/ShippingModal";
import { openCreateLabelModal, open_create_pickup_modal } from "../../slices/shippingSlice";
import CreatePickupModal from "./components/CreatePickupModal";
import RefundOrderModal from "./components/RefundOrderModal";
import CreateLabelModal from "./components/CreateLabelModal";
import { format_date } from "../../utils/helper_functions";
import LinkLabelModal from "./components/LinkLabelModal";
import { Delete, Edit, FileCopy, Landscape, Money } from "@mui/icons-material";

const OrdersPage = () => {
  const orderPage = useSelector(state => state.orders.orderPage);
  const { message, loading, loading_order, remoteVersionRequirement, order } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const orderTable = useSelector(state => state.orders.orderTable);
  const { selectedRows } = orderTable;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Order Placed", display: row => format_date(row.createdAt) },
      {
        title: "Name",
        display: row => (
          <Link to={current_user.isAdmin && `/secure/glow/userprofile/${row?.user?._id}`}>
            {fullName(row.shipping)}
          </Link>
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
      // { title: "Total", display: row => `$${row.totalPrice.toFixed(2)}` },
      // display: row => (
      //   <div className="w-200px">
      //     <div className="jc-b w-100per">
      //       Subtotal: ${row.orderItems?.reduce((a, c) => parseInt(a) + parseInt(c.price) * parseInt(c.qty), 0).toFixed(2)}
      //     </div>
      //     <div className="jc-b w-100per">Tax: ${row.taxPrice.toFixed(2)}</div>
      //     <div className="jc-b w-100per">Shipping: ${row.shippingPrice.toFixed(2)}</div>
      //     <div className="jc-b w-100per">Total: ${row.totalPrice.toFixed(2)}</div>
      //   </div>
      // )
      {
        title: "Actions",
        display: row => (
          <div>
            <IconButton
              aria-label="Edit"
              onClick={() => {
                dispatch(API.detailsOrder(row._id));
                dispatch(open_edit_order_modal(order));
              }}
            >
              <Edit color="white" />
            </IconButton>
            <IconButton
              aria-label="Duplicate"
              onClick={() => {
                const newDuplicateOrder = duplicateOrder(row);
                dispatch(API.saveOrder(newDuplicateOrder));
              }}
            >
              <FileCopy color="white" />
            </IconButton>
            <Link to={`/secure/account/order/${row._id}`}>
              <IconButton aria-label="View Product Page">
                <Landscape color="white" />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => {
                dispatch(openRefundModal(row));
              }}
              aria-label="Refund"
            >
              <Money color="white" />
            </IconButton>
            <IconButton
              onClick={() => {
                const confirm = window.confirm("Are you sure you want DELETE this order?");
                if (confirm) {
                  dispatch(API.deleteOrder(row._id));
                }
              }}
              aria-label="Delete"
            >
              <Delete color="white" />
            </IconButton>
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
        colors={orderColors}
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
          <div className="row g-10px">
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
