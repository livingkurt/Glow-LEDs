import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { useParams } from "react-router-dom";
import "./ProfilePage.scss";
import { format_date } from "../../utils/helper_functions";
import { set_success } from "../../slices/userSlice";
import { determineOrderColors } from "../OrdersPage/ordersPageHelpers";
import OrderItemsDisplay from "../OrdersPage/components/OrderItemsDisplay";
import { determine_product_name_string } from "../../utils/react_helper_functions";
import { Link } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";
import { this_month_date_range, this_year_date_range } from "./profileHelpers";

const useProfilePage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { monthlyCheckinSuccess } = affiliatePage;

  const teamPage = useSelector(state => state.teams.teamPage);
  const { team } = teamPage;

  const { start_date: month_start_date, end_date: month_end_date } = this_month_date_range();
  const { start_date: year_start_date, end_date: year_end_date } = this_year_date_range();

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(set_success(false));
      dispatch(API.detailsUser(id || current_user._id));
      dispatch(API.listMyOrders(id || current_user._id));
      if (user.is_employee) {
        dispatch(API.listPaychecks({ user: id || current_user._id }));
      }
    }
    return () => {
      cleanup = false;
    };
  }, []);

  const [hasFetchedTeam, setHasFetchedTeam] = useState(false);

  useEffect(() => {
    // Fetch initial data
    if (user.is_affiliated && user?.affiliate) {
      dispatch(API.listPaychecks({ affiliate: user?.affiliate._id || current_user.affiliate }));
      if (user?.affiliate?.sponsor) {
        dispatch(API.listSponsorCodes(user?.affiliate._id));
      }
      // dispatch(API.detailsTeam({ affiliateId: user?.affiliate._id || current_user.affiliate }))
      //   .then(() => setHasFetchedTeam(true))
      //   .catch(console.error);
    }
  }, [user.is_affiliated, user?.affiliate, current_user.affiliate, dispatch]);

  useEffect(() => {
    // Dispatch affiliateEarnings once team details are fetched
    // if (hasFetchedTeam) {
    const public_code_source = team && team?.team_name?.length > 0 ? team : user?.affiliate?.public_code;

    dispatch(
      API.affiliateEarnings({
        promo_code: public_code_source?.promo_code,
        start_date: month_start_date,
        end_date: month_end_date,
        sponsor: user?.affiliate?.sponsor,
        sponsorTeamCaptain: user?.affiliate?.sponsorTeamCaptain,
        type: "month",
      })
    );
    dispatch(
      API.affiliateEarnings({
        promo_code: public_code_source?.promo_code,
        start_date: year_start_date,
        end_date: year_end_date,
        sponsor: user?.affiliate?.sponsor,
        sponsorTeamCaptain: user?.affiliate?.sponsorTeamCaptain,
        type: "year",
      })
    );

    // Reset the flag if needed
    // setHasFetchedTeam(false);
    // }
  }, [
    dispatch,
    month_start_date,
    month_end_date,
    year_start_date,
    year_end_date,
    team,
    user?.affiliate?.public_code,
    user?.affiliate?.sponsor,
    user?.affiliate?.sponsorTeamCaptain,
  ]);

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(API.detailsUser(id || current_user._id));
    }
    return () => {
      cleanup = false;
    };
  }, [current_user._id, dispatch, id, monthlyCheckinSuccess]);

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(API.listPaychecks({ team: team._id }));

      dispatch(
        API.affiliateEarnings({
          promo_code: team?.public_code?.promo_code,
          start_date: month_start_date,
          end_date: month_end_date,
          sponsor: true,
          sponsorTeamCaptain: false,
          type: "month",
        })
      );
      dispatch(
        API.affiliateEarnings({
          promo_code: team?.public_code?.promo_code,
          start_date: year_start_date,
          end_date: year_end_date,
          sponsor: true,
          sponsorTeamCaptain: false,
          type: "year",
        })
      );
    }
    return () => {
      cleanup = false;
    };
  }, [
    dispatch,
    month_end_date,
    month_start_date,
    team._id,
    team?.public_code?.promo_code,
    year_end_date,
    year_start_date,
  ]);

  const paycheckColumnDefs = useMemo(
    () => [
      { title: "Date Created", display: paycheck => paycheck.createdAt && format_date(paycheck.createdAt) },
      { title: "Date Paid", display: paycheck => paycheck.paid_at && format_date(paycheck.paid_at) },
      {
        title: "Affiliate",
        display: paycheck =>
          paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name,
      },
      {
        title: "Paid",
        display: paycheck =>
          paycheck.paid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />,
      },
      { title: "Amount", display: paycheck => `$${paycheck.amount?.toFixed(2)}` },
    ],
    []
  );

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

  const paychecksRemoteApi = useCallback(
    options => API.getMyPaychecks(options, { affiliateId: user?.affiliate?._id, teamId: team._id }),
    [team._id, user?.affiliate?._id]
  );
  const ordersRemoteApi = useCallback(options => API.getMyOrders(options, user._id), [user._id]);
  return {
    paychecksRemoteApi,
    ordersRemoteApi,
    orderColumnDefs,
    paycheckColumnDefs,
  };
};

export default useProfilePage;
