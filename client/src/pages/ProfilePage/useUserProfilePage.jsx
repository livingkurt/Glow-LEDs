import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import "./ProfilePage.scss";
import { useParams } from "react-router-dom";
import { useOrdersPage } from "../OrdersPage/useOrdersPage";

export const useUserProfilePage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(API.detailsUser(id || current_user._id));
    }
    return () => {
      cleanup = false;
    };
  }, [current_user._id, dispatch, id]);

  const { columnDefs: orderColumnDefs, myRemoteApi: ordersRemoteApi } = useOrdersPage({ userId: id });
  return {
    ordersRemoteApi,
    orderColumnDefs,
  };
};
