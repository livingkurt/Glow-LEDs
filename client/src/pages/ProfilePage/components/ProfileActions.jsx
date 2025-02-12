import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openChangePasswordModal, open_edit_user_modal } from "../../../slices/userSlice";
import { open_edit_affiliate_modal } from "../../../slices/affiliateSlice";
import { open_edit_wholesaler_modal } from "../../../slices/wholesalerSlice";
import * as API from "../../../api";

import { EditAffiliateModal } from "../../AffiliatesPage/components";
import { EditWholesalerModal } from "../../WholesalersPage/components";
import ChangePasswordModal from "./ChangePasswordModal";
import { open_edit_team_modal } from "../../../slices/teamSlice";
import EditTeamModal from "../../TeamsPage/EditTeamModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const ProfileActions = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliate } = affiliatePage;
  const teamPage = useSelector(state => state.teams.teamPage);
  const { team } = teamPage;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(open_edit_user_modal(user));
        }}
      >
        {"Edit Profile"}
      </Button>

      <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(openChangePasswordModal())}>
        {"Change Password"}
      </Button>

      {user.is_affiliated && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (user?.affiliate?._id) {
              dispatch(API.detailsAffiliate(user?.affiliate?._id));
            }
            dispatch(open_edit_affiliate_modal(affiliate));
          }}
        >
          {"Edit Affiliate Profile"}
        </Button>
      )}
      {user.is_affiliated && user?.affiliate?.teamCaptain && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(open_edit_team_modal(team));
          }}
        >
          {"Edit Team Profile"}
        </Button>
      )}

      {user.isWholesaler && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(open_edit_wholesaler_modal(user.wholesaler));
          }}
        >
          {"Edit Wholesaler Profile"}
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
          {"Sign In as User"}
        </Button>
      )}
      {current_user?.isAdmin && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(API.saveStripeAccount(id || current_user._id));
          }}
        >
          {"Link User to Stripe Account"}
        </Button>
      )}

      <EditAffiliateModal />
      <EditTeamModal />
      <EditWholesalerModal />
      <ChangePasswordModal />
    </Box>
  );
};
