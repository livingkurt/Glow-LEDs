import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_order_modal, open_edit_order_modal } from "../../slices/orderSlice";
import { EditOrderModal, OrderDropdown } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { fullName } from "../UsersPage/usersHelpers";
import { humanDate } from "../../helpers/dateHelpers";
import { determine_color, sinceOrdered } from "./ordersPageHelpers";
import ShippingDisplay from "./components/ShippingDisplay";
import MetaDataDisplay from "./components/MetaDataDisplay";
import OrderActionButtons from "./components/OrderActionButtons";
import { OrderStatusButtons } from "../OrderPage/components";
import OrderItemsDisplay from "./components/OrderItemsDisplay";
import { determine_product_name_string } from "../../utils/react_helper_functions";

const OrdersPage = () => {
  const orderPage = useSelector(state => state.orders.orderPage);
  const { message, loading, remoteVersionRequirement, order } = orderPage;

  const dispatch = useDispatch();

  useEffect(() => {
    if (order.name) {
      dispatch(open_edit_order_modal(order));
    }
  }, [dispatch, order]);

  const column_defs = useMemo(
    () => [
      // { title: "Order #", display: "_id" },
      { title: "Order Placed", display: row => humanDate(row.createdAt) },
      { title: "Name", display: row => fullName(row.shipping) },
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
              <OrderItemsDisplay order={row} determine_color={determine_color} colspan={column_defs.length + 1} />
            </div>
          </div>
        )
      },

      { title: "Total", display: row => `$${row.totalPrice.toFixed(2)}` },
      {
        title: "Actions",
        display: row => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(API.detailsOrder(row._id));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <Link to={`/secure/account/order/${row._id}`}>
              <GLButton variant="icon" aria-label="view">
                <i className="fas fa-mountain" />
              </GLButton>
            </Link>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteOrder(row.pathname))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    [dispatch]
  );
  const dropdown_column_defs = useMemo(
    () => [
      {
        title: "Shipping",
        display: row => <ShippingDisplay shipping={row.shipping} />,
        colSpan: 1
      },
      {
        title: "Promo Code",
        display: row => <MetaDataDisplay row={row} />,
        colSpan: 2
      },
      { title: "Name", display: row => <OrderActionButtons order={row} />, colSpan: 1 },
      { title: "Since Ordered", display: row => <OrderStatusButtons order={row} />, colSpan: 2 }
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getOrders(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Orders | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"orders/setRemoteVersionRequirement"}
        tableName={"Orders"}
        determine_color={determine_color}
        namespaceScope="orders"
        namespace="orderTable"
        columnDefs={column_defs}
        enableDropdownRow
        rowName={"_id"}
        // dropdownColumnDefs={dropdown_column_defs}
        // dropdownRows={row => [row]}
        dropdownComponent={row => <OrderDropdown row={row} determine_color={determine_color} colspan={column_defs.length + 1} />}
        extendedRowComponent={row => <OrderItemsDisplay order={row} determine_color={determine_color} colspan={column_defs.length + 1} />}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_order_modal())}>
            Create Order
          </Button>
        }
      />
      {/* <EditOrderModal /> */}
    </div>
  );
};
export default OrdersPage;
