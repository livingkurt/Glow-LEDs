import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading, Notification } from "../../shared/SharedComponents";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./ProfilePage.scss";
import { Helmet } from "react-helmet";
import { EditUserModal } from "../UsersPage/components";
import { OrderListItem } from "../OrdersPage/components";
import { determine_order_color } from "./profileHelpers";
import { this_month_date_range, this_year_date_range } from "../DashboardPage/background/worker_helpers";
import ProfileDetails from "./components/ProfileDetails";
import { ProfileActions } from "./components/ProfileActions";
import ProfileAffiliateMetrics from "./components/ProfileAffiliateActions";
import ProfileAffiliateEarnings from "./components/ProfileAffiliateEarnings";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { format_date } from "../../utils/helper_functions";
import { determine_color } from "../PaychecksPage/paychecksHelpers";
import { set_success } from "../../slices/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user, success, message } = userPage;

  const { first_name } = user;

  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { loading, remoteVersionRequirement } = paycheckPage;

  const orderPage = useSelector(state => state.orders.orderPage);
  const { orders } = orderPage;

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(set_success(false));
      dispatch(API.detailsUser(id || current_user._id));
      dispatch(API.listMyOrders(id || current_user._id));
      if (user.is_affiliate && user?.affiliate) {
        dispatch(API.listPromos({ affiliate: user?.affiliate._id }));
        dispatch(API.listPaychecks({ affiliate: user?.affiliate._id || current_user.affiliate }));
      } else {
        dispatch(API.listPaychecks({ user: id || current_user._id }));
      }
    }
    return () => {
      cleanup = false;
    };
  }, []);

  useEffect(() => {
    let cleanup = true;
    const { start_date: month_start_date, end_date: month_end_date } = this_month_date_range();
    const { start_date: year_start_date, end_date: year_end_date } = this_year_date_range();
    if (cleanup) {
      if (user.is_affiliated && user?.affiliate) {
        dispatch(
          API.affiliateEarnings({
            promo_code: user?.affiliate?.public_code?.promo_code,
            start_date: month_start_date,
            end_date: month_end_date,
            sponsor: user?.affiliate?.sponsor,
            type: "month"
          })
        );
        dispatch(
          API.affiliateEarnings({
            promo_code: user?.affiliate?.public_code?.promo_code,
            start_date: year_start_date,
            end_date: year_end_date,
            sponsor: user?.affiliate?.sponsor,
            type: "year"
          })
        );
      }
    }
    return () => {
      cleanup = false;
    };
  }, [dispatch, user?.affiliate, user?.affiliate?.public_code, user?.affiliate?.sponsor, user.is_affiliated]);
  const column_defs = useMemo(
    () => [
      { title: "Date Created", display: paycheck => paycheck.createdAt && format_date(paycheck.createdAt) },
      { title: "Date Paid", display: paycheck => paycheck.paid_at && format_date(paycheck.paid_at) },
      {
        title: "Affiliate",
        display: paycheck => (paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name)
      },
      {
        title: "Paid",
        display: paycheck => (paycheck.paid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />)
      },
      { title: "Amount", display: paycheck => `$${paycheck.amount.toFixed(2)}` }
    ],
    []
  );

  // const remoteApi = useCallback(options => API.getPaychecks(options), []);
  const remoteApi = useCallback(
    options => API.getPaychecks({ ...options, filters: { ...options.filters, affiliate: [user.affiliate._id] } }),
    [user?.affiliate?._id]
  );

  return (
    <div className="p-20px inner_content">
      <Helmet>
        <title>Admin User Profile | Glow LEDs</title>
      </Helmet>
      <EditUserModal />
      <Notification message={message} />
      {current_user?.isAdmin && (
        <GLButton variant="icon" onClick={() => history.goBack()}>
          <i class="fas fa-chevron-left"></i>
        </GLButton>
      )}

      <div className="row">
        <h1 style={{ textAlign: "center", width: "100%" }}>
          {current_user.first_name === first_name ? "My Profile" : `${first_name}'s Profile`}
        </h1>
      </div>
      <Loading loading={loading}>
        <div>
          <div className="jc-b wrap">
            <ProfileDetails />
            <div>
              <ProfileActions />
              <ProfileAffiliateMetrics />
            </div>
          </div>
          <ProfileAffiliateEarnings />
        </div>
      </Loading>
      {user && user?.affiliate?._id && (
        <div className="mt-20px">
          <GLTableV2
            remoteApi={remoteApi}
            remoteVersionRequirement={remoteVersionRequirement}
            determine_color={determine_color}
            tableName={"Paychecks"}
            namespaceScope="paychecks"
            namespace="paycheckTable"
            columnDefs={column_defs}
            loading={loading}
            enableRowSelect={false}
          />
        </div>
      )}
      <h1
        style={{
          textAlign: "center",
          width: "100%",
          justifyContent: "center"
        }}
      >
        {current_user.first_name === first_name ? "My Orders" : `${first_name}'s Orders`}
      </h1>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderListItem key={index} determine_color={determine_order_color} order={order} admin={current_user?.isAdmin} />
        ))
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>No Orders</h3>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
