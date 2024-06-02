import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import MountainIcon from "@mui/icons-material/Landscape";
import "./ProfilePage.scss";
import { format_date } from "../../utils/helper_functions";
import { determineOrderColors } from "../OrdersPage/ordersPageHelpers";
import OrderItemsDisplay from "../OrdersPage/components/OrderItemsDisplay";
import { Link, useParams } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { Box } from "@mui/material";
import { determine_product_name } from "../../helpers/sharedHelpers";

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
                <div>{determine_product_name(item)}</div>
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
        title: "",
        nonSelectable: true,
        display: row => (
          <Box display="flex" justifyContent={"flex-end"}>
            <Link to={`/secure/account/order/${row._id}`}>
              <GLIconButton tooltip="View">
                <MountainIcon color="white" />
              </GLIconButton>
            </Link>
          </Box>
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
