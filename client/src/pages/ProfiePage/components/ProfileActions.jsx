import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { openChangePasswordModal, open_edit_user_modal } from "../../../slices/userSlice";
import { openMonthlyCheckinModal, open_edit_affiliate_modal } from "../../../slices/affiliateSlice";
import { open_edit_wholesaler_modal } from "../../../slices/wholesalerSlice";
import * as API from "../../../api";
import { Box, Button, Typography } from "@mui/material";
import { EditAffiliateModal } from "../../AffiliatesPage/components";
import { EditWholesalerModal } from "../../WholesalersPage/components";
import ChangePasswordModal from "./ChangePasswordModal";

export const ProfileActions = () => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliate, stripeAccountLink, stripeAccountLinkModal } = affiliatePage;

  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const previousMonth = date.toLocaleString("default", { month: "long" });
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();
  const checkinCompleted = user?.affiliate?.sponsorMonthlyCheckins?.find(
    checkin => checkin.month === currentMonth && checkin.year === currentYear
  );
  const previousCheckin = user?.affiliate?.sponsorMonthlyCheckins?.find(
    checkin => checkin.month === previousMonth && checkin.year === currentYear
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(open_edit_user_modal(user));
        }}
      >
        Edit Profile
      </Button>

      {/* <Link to={current_user?.isAdmin ? "/secure/glow/change_password/" + id : "/account/changepassword"} className="w-100per"> */}
      <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(openChangePasswordModal())}>
        Change Password
      </Button>
      {/* </Link> */}

      {user.is_affiliated && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (user?.affiliate?._id) {
              dispatch(API.detailsAffiliate({ id: user?.affiliate?._id }));
            }
            dispatch(open_edit_affiliate_modal(affiliate));
          }}
        >
          Edit Affiliate Profile
        </Button>
      )}
      {user.is_affiliated && user?.affiliate?.sponsor && (
        <>
          {!previousCheckin && (
            <Typography variant="body1" gutterBottom>
              You have not checked in for the month of {previousMonth}
            </Typography>
          )}
          {!previousCheckin && (
            <Button
              variant="contained"
              color={previousCheckin ? "secondary" : "primary"}
              onClick={() => {
                dispatch(openMonthlyCheckinModal({ month: previousMonth, year: currentYear }));
              }}
            >
              {previousCheckin ? "Edit" : "Start"} Sponsor Monthly Checkin for {previousMonth}
            </Button>
          )}
          {!checkinCompleted && (
            <Typography variant="body1" gutterBottom>
              You have not checked in for the month of {currentMonth}
            </Typography>
          )}
          <Button
            variant="contained"
            color={checkinCompleted ? "secondary" : "primary"}
            onClick={() => {
              dispatch(openMonthlyCheckinModal({ month: currentMonth, year: currentYear }));
            }}
          >
            {checkinCompleted ? "Edit" : "Start"} Sponsor Monthly Checkin for {currentMonth}
          </Button>
        </>
      )}

      {user.isWholesaler && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(open_edit_wholesaler_modal(user.wholesaler));
          }}
        >
          Edit Wholesaler Profile
        </Button>
      )}

      {current_user?.isAdmin && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(API.loginAsUser(user));
          }}
        >
          Sign In as User
        </Button>
      )}

      <EditAffiliateModal />
      <EditWholesalerModal />
      <ChangePasswordModal />
    </Box>
  );
};
