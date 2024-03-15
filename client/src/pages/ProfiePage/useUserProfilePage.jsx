import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { GLButton } from "../../shared/GlowLEDsComponents";
import "./ProfilePage.scss";
import { format_date } from "../../utils/helper_functions";
import { determineOrderColors } from "../OrdersPage/ordersPageHelpers";
import OrderItemsDisplay from "../OrdersPage/components/OrderItemsDisplay";
import { determine_product_name_string } from "../../utils/react_helper_functions";
import { Link, useParams } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";

const useUserProfilePage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { monthlyCheckinSuccess } = affiliatePage;

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(API.detailsUser(id || current_user._id));
    }
    return () => {
      cleanup = false;
    };
  }, [current_user._id, dispatch, id, monthlyCheckinSuccess]);

  const orderColumnDefs = useMemo(
    () => [
      { title: "Order #", display: "_id" },
      { title: "Order Placed", display: row => format_date(row.createdAt) },
      {
        title: "Name",
        display: row => <Link to={`/secure/account/profile/${row?.user?._id}`}>{fullName(row.shipping)}</Link>,
      },
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
              <OrderItemsDisplay
                order={row}
                determineColor={determineOrderColors}
                colspan={orderColumnDefs.length + 1}
              />
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

      { title: "Total", display: row => `$${row.totalPrice?.toFixed(2)}` },
      {
        title: "Actions",
        nonSelectable: true,
        display: row => (
          <div className="jc-b">
            <Link to={`/secure/account/order/${row._id}`}>
              <GLButton variant="icon" aria-label="view">
                <i className="fas fa-mountain" />
              </GLButton>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const ordersRemoteApi = useCallback(options => API.getMyOrders(options, user._id), [user._id]);
  return {
    ordersRemoteApi,
    orderColumnDefs,
  };
};

export default useUserProfilePage;
