import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import "./ProfilePage.scss";
import { useParams } from "react-router-dom";
import { useOrdersPage } from "../OrdersPage/useOrdersPage";
import usePaychecksPage from "../PaychecksPage/usePaychecksPage";

export const useUserProfilePage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

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

  const { columnDefs: orderColumnDefs, remoteApi: ordersRemoteApi } = useOrdersPage({ userId: id });

  const { remoteApi: paychecksRemoteApi, columnDefs: paychecksColumnDefs } = usePaychecksPage();
  return {
    ordersRemoteApi,
    orderColumnDefs,
    paychecksRemoteApi,
    paychecksColumnDefs,
  };
};
